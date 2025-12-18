"use server";

import { and, DrizzleError, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "~/db";
import { products } from "~/db/schema";
import { auth } from "~/lib/auth";
import { ProductFormSchema, productFormSchema } from "~/lib/zod-schema";

export async function createProduct(data: ProductFormSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized.");

  const parsed = productFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Validation Error: Failed to create product.");
  }

  const { name, description, quantity, price, lowStockThreshold } = parsed.data;

  try {
    await db.insert(products).values({
      userId: session.user.id,
      name,
      description,
      quantity,
      price,
      lowStockThreshold,
    });
  } catch (error) {
    if (error instanceof DrizzleError)
      throw new Error("Database Error: Failed to create product.");
    throw error;
  }

  revalidatePath("/dashboard/inventory");
}

export async function editProduct(id: string, data: ProductFormSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized.");

  const parsed = productFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Validation Error: Failed to edit product.");
  }

  try {
    await db.update(products).set(parsed.data).where(eq(products.id, id));
  } catch (error) {
    if (error instanceof DrizzleError)
      throw new Error("Database Error: Failed to edit product.");
    throw error;
  }

  revalidatePath("/dashboard/inventory");
}

export async function deleteProduct(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized.");

  await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.userId, session.user.id)));

  revalidatePath("/dashboard/inventory");
}
