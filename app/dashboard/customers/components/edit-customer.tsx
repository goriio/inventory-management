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
import { Spinner } from "~/components/ui/spinner";
import { useForm } from "react-hook-form";
import { customerFormSchema, CustomerFormSchema } from "~/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { editCustomer } from "~/actions/customers";
import { Customer } from "~/db/schema";

export function EditCustomer({ customer }: { customer: Customer }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber || "",
    },
  });

  async function onSubmit(data: CustomerFormSchema) {
    try {
      await editCustomer(customer.id, data);
      toast.success("Product created.");
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
          <DialogTitle>Edit a customer</DialogTitle>
          <DialogDescription>
            Get your customer&apos;s details changed.
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
                <Spinner /> Editing...
              </>
            ) : (
              "Edit Customer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
