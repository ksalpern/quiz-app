import Link from "next/link";

import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";

export default function Home() {
  return (
    <div className="main-layout gradient-background">
      <ThumbsUp />
      <div className="contentContainer">
        <h1>Who wants to be a millionaire?</h1>
        <Link href="/game">
          <Button>Start</Button>
        </Link>
      </div>
    </div>
  );
}
