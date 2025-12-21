import { and, eq, ilike, or } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/db";
import { customers, products, sales } from "~/db/schema";
import { auth } from "~/lib/auth";

const PAGE_SIZE = 8;

export async function getSales({
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
    .from(sales)
    .innerJoin(customers, eq(sales.customerId, customers.id))
    .innerJoin(products, eq(sales.productId, products.id))
    .where(
      and(
        eq(sales.userId, session.user.id),
        or(
          ilike(customers.name, `%${query}%`),
          ilike(products.name, `%${query}%`)
        )
      )
    )
    .offset(offset)
    .limit(PAGE_SIZE);

  return data;
}
