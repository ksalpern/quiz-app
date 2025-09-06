import Link from "next/link";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <ThumbsUp />
      <div className={styles.contentContainer}>
        <h1>Who wants to be a millionaire?</h1>
        <Link href="/game">
          <Button className={styles.startButton}>Start</Button>
        </Link>
      </div>
    </div>
  );
}
