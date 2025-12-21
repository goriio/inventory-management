"use client";

import { Plus } from "lucide-react";
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
import { Spinner } from "~/components/ui/spinner";
import { Controller, useForm, useWatch } from "react-hook-form";
import { SaleFormSchema, saleFormSchema } from "~/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Customer, Product } from "~/db/schema";
import { ProductCombobox } from "./product-combobox";
import { CustomerCombobox } from "./customer-combobox";
import { Separator } from "~/components/ui/separator";
import { createSale } from "~/actions/sales";

export function AddSale({
  customers,
  products,
}: {
  customers: Customer[];
  products: Product[];
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(saleFormSchema),
  });

  async function onSubmit(data: SaleFormSchema) {
    try {
      await createSale(data);
      toast.success("Sale created.");
      reset();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else {
        toast.error("Something went wrong.");
      }
    }
  }

  const productId = useWatch({
    control,
    name: "productId",
  });

  const quantity = useWatch({
    control,
    name: "quantity",
  });

  const totalPrice = useMemo(() => {
    const product = products.find((p) => p.id === productId);

    if (!product || !quantity) return;

    return product.price * Number(quantity);
  }, [productId, quantity, products]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="w-full sm:w-auto">
          <Plus /> Add Sale
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add sale</DialogTitle>
          <DialogDescription>
            Enter details and get your sale listed.
          </DialogDescription>
        </DialogHeader>
        <form id="create-customer-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={control}
              name="productId"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Product</FieldLabel>
                  <ProductCombobox
                    products={products}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FieldError>{errors.productId?.message}</FieldError>
                </Field>
              )}
            />
            <Controller
              control={control}
              name="customer"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Customer</FieldLabel>
                  <CustomerCombobox
                    customers={customers}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FieldError>{errors.customer?.message}</FieldError>
                </Field>
              )}
            />
            <Field>
              <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
              <Input
                type="number"
                id="quantity"
                placeholder="0"
                {...register("quantity")}
              />
              <FieldError>{errors.quantity?.message}</FieldError>
            </Field>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Total Price</span>
              <span className="font-semibold text-gray-900">
                PHP {totalPrice?.toFixed(2) || 0}
              </span>
            </div>
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="create-customer-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner /> Adding...
              </>
            ) : (
              "Add Sale"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
