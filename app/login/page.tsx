import { Metadata } from "next";
import { LoginForm } from "./components/login-form";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");

  return (
    <div className="grid place-items-center min-h-screen">
      <LoginForm />
    </div>
  );
}
