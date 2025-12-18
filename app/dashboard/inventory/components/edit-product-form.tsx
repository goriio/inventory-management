"use client";

import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Spinner } from "~/components/ui/spinner";
import { useForm } from "react-hook-form";
import { productFormSchema, ProductFormSchema } from "~/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProduct } from "~/actions/products";
import { toast } from "sonner";
import { useState } from "react";
import { Product } from "~/db/schema";

export function EditProductForm({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description || "",
      price: product.price,
      quantity: product.quantity,
      lowStockThreshold: product.lowStockThreshold,
    },
  });

  async function onSubmit(data: ProductFormSchema) {
    try {
      await editProduct(product.id, data);
      toast.success(`${product.name} is updated.`);
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Change details and get your product changed in the inventory.
          </DialogDescription>
        </DialogHeader>
        <form id="create-product-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="product-name">Product Name</FieldLabel>
              <Input
                type="text"
                id="product-name"
                placeholder="Enter the name of the product"
                {...register("name")}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="description">
                Description (Optional)
              </FieldLabel>
              <Textarea
                id="description"
                placeholder="Brief description of the product..."
                rows={4}
                {...register("description")}
              />
              <FieldError>{errors.description?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
              <Input
                type="number"
                id="quantity"
                placeholder="0"
                min={0}
                step={1}
                {...register("quantity")}
              />
              <FieldError>{errors.quantity?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                type="number"
                id="price"
                placeholder="0.0"
                min={0}
                step={0.01}
                {...register("price")}
              />
              <FieldError>{errors.price?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="low-stock-threshold">
                Low Stock Threshold
              </FieldLabel>
              <Input
                type="number"
                id="low-stock-threshold"
                placeholder="0"
                min={0}
                step={1}
                {...register("lowStockThreshold")}
              />
              <FieldError>{errors.lowStockThreshold?.message}</FieldError>
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="create-product-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner /> Editing...
              </>
            ) : (
              "Edit Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
