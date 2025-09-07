"use client";

import { useEffect } from "react";

import { useGameNavigation } from "@/features/game-flow/hooks/useGameNavigation";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { navigateToStart } = useGameNavigation();

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
        <Button onClick={navigateToStart}>Try again</Button>
      </div>
    </div>
  );
}
