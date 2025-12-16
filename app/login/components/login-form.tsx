"use client";

import { AtSign } from "lucide-react";
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
import { signIn } from "~/lib/auth-client";
import { useState } from "react";
import { Spinner } from "~/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Logo } from "~/components/logo";

const formSchema = z.object({
  email: z
    .email("Email must be valid.")
    .max(100, "Description must be at most 100 characters."),
  password: z.string("Password is required."),
});

export function LoginForm() {
  const [signingUp, setSigningUp] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setSigningUp(true);

    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          toast.success("Successfully logged in.");
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
    <Card className="w-full sm:max-w-md sm:px-4 sm:py-12">
      <CardHeader>
        <Logo />
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
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
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account yet?{" "}
          <Link href="/sign-up" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
