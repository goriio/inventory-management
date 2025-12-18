import { and, count, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/db";
import { products } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function getTotalProductsPerWeek() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const week = sql<string>`date_trunc('week', ${products.createdAt})`;

  const totalProductsPerWeek = await db
    .select({
      week: week.as("week"),
      total: count(),
    })
    .from(products)
    .where(
      and(
        eq(products.userId, session.user.id),
        sql`${products.createdAt} >= now() - interval '4 months'`
      )
    )
    .groupBy(week)
    .orderBy(week);

  return totalProductsPerWeek;
}
