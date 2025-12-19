import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/db";
import { customers } from "~/db/schema";
import { auth } from "~/lib/auth";

const PAGE_SIZE = 8;

export async function getCustomers({
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
    .from(customers)
    .where(
      and(
        eq(customers.userId, session.user.id),
        or(
          ilike(customers.name, `%${query}%`),
          ilike(customers.email, `%${query}%`),
          ilike(customers.phoneNumber, `%${query}%`)
        )
      )
    )
    .orderBy(desc(customers.createdAt))
    .offset(offset)
    .limit(PAGE_SIZE);

  return data;
}

export async function getCustomersPages(query: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const data = await db
    .select({
      count: count(),
    })
    .from(customers)
    .where(
      and(
        eq(customers.userId, session.user.id),
        or(
          ilike(customers.name, `%${query}%`),
          ilike(customers.email, `%${query}%`),
          ilike(customers.phoneNumber, `%${query}%`)
        )
      )
    );

  const totalPages = Math.ceil(data[0].count / PAGE_SIZE);

  return totalPages;
}
