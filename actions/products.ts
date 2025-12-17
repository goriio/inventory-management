"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "~/db";
import { products } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function deleteProduct(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.userId, session.user.id)));

  revalidatePath("/dashboard/inventory");
}
