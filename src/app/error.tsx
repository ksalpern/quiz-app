"use client";

import { useEffect } from "react";
import Link from "next/link";

import Button from "@/components/ui/button/button";
import { useGameStore } from "./stores/useGameStore";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { resetGame } = useGameStore();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      {error.message && <h2>{error.message}</h2>}
      <Link href="/">
        <Button onClick={resetGame}>Try again</Button>
      </Link>
    </div>
  );
}
