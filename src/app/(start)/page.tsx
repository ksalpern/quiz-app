"use client";

import { useGameNavigation } from "@/features/game-flow/hooks/useGameNavigation";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

export default function Home() {
  const { navigateToGame } = useGameNavigation();

  return (
    <div className="mainLayout gradientBackground">
      <ThumbsUp />
      <div className="contentContainer">
        <h1>Who wants to be a millionaire?</h1>
        <Button onClick={navigateToGame}>Start</Button>
      </div>
    </div>
  );
}
