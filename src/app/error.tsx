"use client";

import { useEffect } from "react";

import { useGameLogic } from "@/features/game-flow/hooks/useGameLogic";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { resetGameToStart } = useGameLogic();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mainLayout gradientBackground">
      <ThumbsUp className="rotate180" />
      <div className="contentContainer">
        <div>
          <h1>Something went wrong!</h1>
          {error.message && <p>{error.message}</p>}
        </div>
        <Button onClick={resetGameToStart}>Try again</Button>
      </div>
    </div>
  );
}
