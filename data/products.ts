import { count, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/db";
import { products } from "~/db/schema";
import { auth } from "~/lib/auth";

const PAGE_SIZE = 8;

export async function getProducts({ page }: { page: number }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const offset = (page - 1) * PAGE_SIZE;

  const data = await db
    .select()
    .from(products)
    .where(eq(products.userId, session.user.id))
    .orderBy(desc(products.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return data;
}

export async function getProductsPages() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const data = await db
    .select({ count: count() })
    .from(products)
    .where(eq(products.userId, session.user.id));

  const totalPages = Math.ceil(data[0].count / PAGE_SIZE);

  return totalPages;
}
