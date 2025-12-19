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
import { useForm } from "react-hook-form";
import { customerFormSchema, CustomerFormSchema } from "~/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { createCustomer } from "~/actions/customers";

export function AddCustomer() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(customerFormSchema),
  });

  async function onSubmit(data: CustomerFormSchema) {
    try {
      await createCustomer(data);
      toast.success("Product created.");
      reset();
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
        <Button type="button" className="w-full sm:w-auto">
          <Plus /> Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a customer</DialogTitle>
          <DialogDescription>
            Enter details and get your customer listed.
          </DialogDescription>
        </DialogHeader>
        <form id="create-customer-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="customer-name">Customer Name</FieldLabel>
              <Input
                type="text"
                id="customer-name"
                placeholder="Enter the name of your customer"
                {...register("name")}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                id="quantity"
                placeholder="customer@email.com"
                {...register("email")}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="phone-number">
                Phone Number (Optional)
              </FieldLabel>
              <Input
                type="text"
                id="phone-number"
                placeholder="09123456789"
                {...register("phoneNumber")}
              />
              <FieldError>{errors.phoneNumber?.message}</FieldError>
            </Field>
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
              "Add Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
