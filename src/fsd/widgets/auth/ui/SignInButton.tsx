"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { $authPending, connectWalletEvent } from "features/auth/signin";
import { useUnit } from "effector-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
declare var window: any;

export function SignInButton() {
  const isLoading = useUnit($authPending);
  const connectWallet = () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    connectWalletEvent();
  };

  return (
    <Button
      isLoading={isLoading}
      onClick={connectWallet}
      color="secondary"
      className="w-56 h-12 relative"
      spinner={
        <svg
          className="animate-spin h-5 w-5 text-current absolute left-16"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      }
    >
      Войти
    </Button>
  );
}
