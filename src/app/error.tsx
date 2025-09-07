"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useGameStore } from "./stores/useGameStore";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

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
    <div className="mainLayout gradientBackground notFount">
      <ThumbsUp />
      <div className="contentContainer">
        <div>
          <h1>Something went wrong!</h1>
          {error.message && <p>{error.message}</p>}
        </div>
        <Link href="/">
          <Button onClick={resetGame}>Try again</Button>
        </Link>
      </div>
    </div>
  );
}
