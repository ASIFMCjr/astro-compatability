import React from "react";
import Link from "next/link";

export function HomePage() {
  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Переходите сначала на Auth страницу для корректной работы</h1>
      <h2>Доступные страницы</h2>
      <Link href="/auth">Auth</Link>
      <Link href="/profile/1">profile</Link>
      <Link href="/profile/change">profile update</Link>
      <Link href="/profile/create">profile create</Link>
    </div>
  );
}
