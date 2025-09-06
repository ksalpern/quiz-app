"use client";

import Link from "next/link";

import { useGameStore } from "@/app/stores/useGameStore";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

import { formatPrize } from "@/utils/formatPrize";

export default function ResultPage() {
  const { currentPrize, resetGame } = useGameStore();

  return (
    <div className="mainLayout">
      <ThumbsUp />
      <div className="contentContainer">
        <div>
          <h2 className="grayText">Total score:</h2>
          <h1>{formatPrize(currentPrize)} earned</h1>
        </div>
        <Link href="/">
          <Button onClick={resetGame}>Try again</Button>
        </Link>
      </div>
    </div>
  );
}
