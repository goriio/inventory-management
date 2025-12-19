import { and, count, eq, sql, sum } from "drizzle-orm";
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

export async function getInventorySummary() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const [quantity, value] = await Promise.all([
    db
      .select({
        quantityInHand: sum(products.quantity),
      })
      .from(products)
      .where(eq(products.userId, session.user.id)),
    db
      .select({
        totalValue: sql<number>`SUM(${products.quantity} * ${products.price})`,
      })
      .from(products)
      .where(eq(products.userId, session.user.id)),
  ]);
  return {
    quantityInHand: quantity[0].quantityInHand,
    totalValue: value[0].totalValue,
  };
}
