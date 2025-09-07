"use client";

import { useGameLogic } from "@/features/game-flow/hooks/useGameLogic";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

export default function Home() {
  const { startGame } = useGameLogic();

  return (
    <div className="mainLayout gradientBackground">
      <ThumbsUp />
      <div className="contentContainer">
        <h1>Who wants to be a millionaire?</h1>
        <Button onClick={startGame}>Start</Button>
      </div>
    </div>
  );
}
