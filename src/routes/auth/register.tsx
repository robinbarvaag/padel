import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@/components/auth/sign-up";

export const Route = createFileRoute("/auth/register")({
  component: SignUp,
});
