import { SignInButton } from "widgets/auth";
import background from "@/public/background/auth.svg";
import React from "react";
import { Container } from "shared/ui";

export function AuthPage() {
  return (
    <Container background={background} className="flex-col">
      <h1 className="text-6xl font-black">MyAchievements</h1>
      <div className="w-full h-full flex items-center justify-center">
        <SignInButton />
      </div>
    </Container>
  );
}
