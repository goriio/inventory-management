"use server";

import { db } from "~/db";
import { customers, products, sales } from "~/db/schema";
import { faker } from "@faker-js/faker";

export async function seed(userId: string) {
  const productsData = faker.helpers.multiple(
    () => ({
      userId,
      name: faker.commerce.productName(),
      price: Number(
        faker.commerce.price({
          min: 20,
          max: 500,
        })
      ),
      description: faker.commerce.productDescription(),
      quantity: faker.number.int({ min: 0, max: 70 }),
      lowStockThreshold: faker.number.int({ min: 0, max: 20 }),
      createdAt: faker.date.recent({ days: 60 }),
    }),
    {
      count: 57,
    }
  );

  const customersData = faker.helpers.multiple(
    () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return {
        userId,
        name: faker.person.fullName({
          firstName,
          lastName,
        }),
        email: faker.internet.email({
          firstName,
          lastName,
        }),
        phoneNumber: faker.datatype.boolean()
          ? faker.phone.number({ style: "national" })
          : undefined,
        createdAt: faker.date.recent({ days: 60 }),
      };
    },
    {
      count: 17,
    }
  );

  const insertedProducts = await db
    .insert(products)
    .values(productsData)
    .returning();

  const insertedCustomers = await db
    .insert(customers)
    .values(customersData)
    .returning();

  const salesData = faker.helpers.multiple(
    () => {
      const customer = faker.helpers.arrayElement(insertedCustomers);
      const product = faker.helpers.arrayElement(insertedProducts);

      const quantity = faker.number.int({ min: 1, max: 10 });

      return {
        userId,
        customerId: customer.id,
        productId: product.id,
        quantity,
        totalPrice: quantity * product.price,
        createdAt: faker.date.between({
          from: product.createdAt,
          to: new Date(),
        }),
      };
    },
    { count: 25 }
  );

  await db.insert(sales).values(salesData);
}
