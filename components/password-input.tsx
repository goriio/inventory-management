"use client";

import { Eye, EyeClosed, Lock } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { ComponentProps, useState } from "react";
import { cn } from "~/lib/utils";

export function PasswordInput({
  className,
  ...props
}: ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        className={cn(className)}
        {...props}
      />
      <InputGroupAddon>
        <Lock />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye /> : <EyeClosed />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
