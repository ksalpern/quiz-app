import React from "react";
import styles from "./thumbs-up.module.css";
import Image from "next/image";

export default function ThumbsUp({ className }: { className?: string }) {
  return (
    <div className={`${styles.thumbsUp} thumbsUp ${className}`}>
      <Image src="/hand.svg" alt="thumbs up" fill priority />
    </div>
  );
}
