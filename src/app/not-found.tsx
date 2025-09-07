"use client";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

import { useGameNavigation } from "@/features/game-flow/hooks/useGameNavigation";

export default function NotFound() {
  const { navigateToStart } = useGameNavigation();

  return (
    <div className="mainLayout gradientBackground">
      <ThumbsUp className="rotate180" />
      <div className="contentContainer">
        <div>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
        <Button onClick={navigateToStart}>Go home</Button>
      </div>
    </div>
  );
}
