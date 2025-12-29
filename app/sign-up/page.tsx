import { Metadata } from "next";
import { SignUpForm } from "./components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <div className="grid place-items-center min-h-screen">
      <SignUpForm />
    </div>
  );
}
