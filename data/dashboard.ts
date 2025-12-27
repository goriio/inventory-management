import { and, count, eq, lte, not, sql, sum } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/db";
import { customers, products } from "~/db/schema";
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

  const [quantityInHand, totalValue] = await Promise.all([
    db
      .select({
        quantityInHand: sum(products.quantity),
      })
      .from(products)
      .where(eq(products.userId, session.user.id))
      .then((result) => result[0].quantityInHand),
    db
      .select({
        totalValue: sql<number>`SUM(${products.quantity} * ${products.price})`,
      })
      .from(products)
      .where(eq(products.userId, session.user.id))
      .then((result) => result[0].totalValue),
    ,
  ]);
  return {
    quantityInHand,
    totalValue,
  };
}

export async function getProductDetails() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const [lowStockItems, outOfStockItems, noOfItems] = await Promise.all([
    db
      .select({
        lowStockItems: count(),
      })
      .from(products)
      .where(
        and(
          eq(products.userId, session.user.id),
          lte(products.quantity, products.lowStockThreshold),
          not(eq(products.quantity, 0))
        )
      )
      .then((result) => result[0].lowStockItems),
    db
      .select({
        outOfStockItems: count(),
      })
      .from(products)
      .where(
        and(eq(products.userId, session.user.id), eq(products.quantity, 0))
      )
      .then((result) => result[0].outOfStockItems),
    db
      .select({
        noOfItems: count(),
      })
      .from(products)
      .where(and(eq(products.userId, session.user.id)))
      .then((result) => result[0].noOfItems),
  ]);

  return {
    lowStockItems,
    outOfStockItems,
    noOfItems,
  };
}

export async function getNoOfUsers() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const [totalCustomers, newCustomers] = await Promise.all([
    db
      .select({ totalCustomers: count() })
      .from(customers)
      .where(and(eq(customers.userId, session.user.id)))
      .then((result) => result[0].totalCustomers),
    db
      .select({ totalCustomers: count() })
      .from(customers)
      .where(
        and(
          eq(customers.userId, session.user.id),
          sql`${customers.createdAt} >= now() - interval '7 days'`
        )
      )
      .then((result) => result[0].totalCustomers),
  ]);

  return {
    totalCustomers,
    newCustomers,
  };
}
