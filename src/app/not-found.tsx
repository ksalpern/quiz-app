"use client";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

import { useGameLogic } from "@/features/game-flow/hooks/useGameLogic";

export default function NotFound() {
  const { resetGameToStart } = useGameLogic();

  return (
    <div className="mainLayout gradientBackground">
      <ThumbsUp className="rotate180" />
      <div className="contentContainer">
        <div>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
        <Button onClick={resetGameToStart}>Go home</Button>
      </div>
    </div>
  );
}
