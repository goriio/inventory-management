"use server";

import { DrizzleError, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "~/db";
import { products, sales } from "~/db/schema";
import { auth } from "~/lib/auth";
import { saleFormSchema, SaleFormSchema } from "~/lib/zod-schema";

export async function createSale(data: SaleFormSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized.");

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, data.productId))
    .then((response) => response[0]);

  if (data.quantity > product.quantity)
    throw new Error(`Insufficient Stock: Only ${product.quantity} left.`);

  const parsed = saleFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Validation Error: Failed to create product.");
  }

  const { productId, customer, quantity } = parsed.data;

  const totalPrice = product.price * quantity;

  try {
    await db.transaction(async (tx) => {
      await tx.insert(sales).values({
        userId: session.user.id,
        productId,
        customerId: customer,
        quantity,
        totalPrice: totalPrice,
      });
      await tx
        .update(products)
        .set({ quantity: product.quantity - quantity })
        .where(eq(products.id, productId));
    });
  } catch (error) {
    if (error instanceof DrizzleError)
      throw new Error("Database Error: Failed to create product.");
    throw error;
  }

  revalidatePath("/dashboard/sales");
}
