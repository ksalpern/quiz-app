"use client";

import { useGameStore } from "@/app/stores/useGameStore";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

import { formatPrize } from "@/utils/formatPrize";
import { useGameLogic } from "@/features/game-flow/hooks/useGameLogic";

export default function ResultPage() {
  const { currentPrize } = useGameStore();
  const { resetGameToStart } = useGameLogic();

  return (
    <div className="mainLayout">
      <ThumbsUp className={`${currentPrize === 0 && "rotate180"}`} />
      <div className="contentContainer">
        <div>
          <h2 className="grayText">Total score:</h2>
          <h1>{formatPrize(currentPrize)} earned</h1>
        </div>
        <Button onClick={resetGameToStart}>Try again</Button>
      </div>
    </div>
  );
}
