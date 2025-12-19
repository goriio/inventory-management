"use client";

import { AtSign, User } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { PasswordInput } from "~/components/password-input";
import { Button } from "~/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { signUp } from "~/lib/auth-client";
import { useState } from "react";
import { Spinner } from "~/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Logo } from "~/components/logo";

const formSchema = z.object({
  name: z
    .string("Name is required.")
    .min(2, "Name must be at least 2 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z
    .email("Email must be valid.")
    .max(100, "Email must be at most 100 characters."),
  password: z
    .string("Password is required.")
    .min(8, "Password must be at least 8 characters"),
});

export function SignUpForm() {
  const [signingUp, setSigningUp] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setSigningUp(true);

    await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          toast.success("Successfully created an account.");
          router.push("/dashboard");
        },
        onError(context) {
          toast.error(context.error.message);
        },
      }
    );

    setSigningUp(false);
  }

  return (
    <Card className="w-full sm:max-w-md  sm:px-4 sm:py-12">
      <CardHeader>
        <Logo />
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your name, email, and password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="Enter your name"
                    />
                    <InputGroupAddon>
                      <User />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="user@email.com"
                    />
                    <InputGroupAddon>
                      <AtSign />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <PasswordInput {...field} id={field.name} />

                  {fieldState.error ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>
                      Password must be at least 8 characters.
                    </FieldDescription>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="sign-up-form"
          className="w-full"
          disabled={signingUp}
        >
          {signingUp ? (
            <>
              <Spinner />
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
