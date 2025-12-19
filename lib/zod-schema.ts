import z from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required.")
    .max(50, "Product name is too long."),
  description: z.string().max(225, "Description is too long.").optional(),
  quantity: z.coerce.number().int().min(0, "Quantity must be positive."),
  price: z.coerce.number().min(0.01, "Price is required."),
  lowStockThreshold: z.coerce
    .number()
    .int()
    .min(1, "Low stock threshold must be greater than 0."),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
