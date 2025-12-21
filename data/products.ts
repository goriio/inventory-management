import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/db";
import { products } from "~/db/schema";
import { auth } from "~/lib/auth";

const PAGE_SIZE = 8;

export async function getProducts({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const offset = (page - 1) * PAGE_SIZE;

  const data = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.userId, session.user.id),
        or(
          ilike(products.name, `%${query}%`),
          ilike(products.description, `%${query}%`)
        )
      )
    )
    .orderBy(desc(products.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return data;
}

export async function getAllProducts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const data = await db
    .select()
    .from(products)
    .where(eq(products.userId, session.user.id));

  return data;
}

export async function getProductById(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const data = await db
    .select()
    .from(products)
    .where(and(eq(products.userId, session.user.id), eq(products.id, id)));

  return data[0];
}

export async function getProductsPages(query: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const data = await db
    .select({ count: count() })
    .from(products)
    .where(
      and(
        eq(products.userId, session.user.id),
        or(
          ilike(products.name, `%${query}%`),
          ilike(products.description, `%${query}%`)
        )
      )
    );

  const totalPages = Math.ceil(data[0].count / PAGE_SIZE);

  return totalPages;
}
