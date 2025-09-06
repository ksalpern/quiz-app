"use client";

import { useState } from "react";
import Image from "next/image";

import { useGameData } from "@/features/game-flow/hooks/useGameData";
import { useGameLogic } from "@/features/game-flow/hooks/useGameLogic";
import StepList from "@/features/game-flow/components/step-list/step-list";
import GameContent from "@/features/game-flow/components/game-content/game-content";

import Error from "@/app/error";
import Loading from "@/app/loading";

import styles from "./page.module.css";

export default function GamePage() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { questions, loading, error } = useGameData();
  const { currentQuestion } = useGameLogic();

  if (loading) return <Loading />;
  if (error) return <Error error={{ message: error } as Error} />;
  if (questions.length === 0)
    return (
      <Error
        error={
          {
            message: "No questions for game, please check your configuration",
          } as Error
        }
      />
    );

  return (
    <div className={styles.gamePage}>
      <button
        className={styles.menuButton}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <Image
          className={styles.menuIcon}
          src={isOpenMenu ? "/close.svg" : "/menu.svg"}
          alt="menu"
          fill
        />
      </button>
      <div className={styles.pageContent}>
        <GameContent
          question={questions[currentQuestion]}
          totalQuestions={questions.length}
        />
        <StepList isOpenMenu={isOpenMenu} />
      </div>
    </div>
  );
}
