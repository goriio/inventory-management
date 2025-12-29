import { Metadata } from "next";
import { SignUpForm } from "./components/sign-up-form";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");

  return (
    <div className="grid place-items-center min-h-screen">
      <SignUpForm />
    </div>
  );
}
