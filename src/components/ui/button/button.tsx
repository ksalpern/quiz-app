import React from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button className={`${styles.button} ${className}`}>{children}</button>
  );
}
