"use server";

import { and, DrizzleError, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "~/db";
import { customers } from "~/db/schema";
import { auth } from "~/lib/auth";
import { customerFormSchema, CustomerFormSchema } from "~/lib/zod-schema";

export async function createCustomer(data: CustomerFormSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized.");

  const parsed = customerFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Validation Error: Failed to create customer.");
  }

  const { name, email, phoneNumber } = parsed.data;

  try {
    await db.insert(customers).values({
      userId: session.user.id,
      name,
      email,
      phoneNumber,
    });
  } catch (error) {
    if (error instanceof DrizzleError)
      throw new Error("Database Error: Failed to create customer.");
    throw error;
  }

  revalidatePath("/dashboard/customers");
}

export async function editCustomer(id: string, data: CustomerFormSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized.");

  const parsed = customerFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Validation Error: Failed to edit customer.");
  }

  try {
    await db
      .update(customers)
      .set(parsed.data)
      .where(and(eq(customers.id, id), eq(customers.userId, session.user.id)));
  } catch (error) {
    if (error instanceof DrizzleError)
      throw new Error("Database Error: Failed to edit customer.");
    throw error;
  }

  revalidatePath("/dashboard/inventory");
}

export async function deleteCustomer(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized.");

  await db
    .delete(customers)
    .where(and(eq(customers.id, id), eq(customers.userId, session.user.id)));

  revalidatePath("/dashboard/customers");
}
