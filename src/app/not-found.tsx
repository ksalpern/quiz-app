import Button from "@/components/ui/button/button";
import ThumbsUp from "@/components/ui/thumbs-up/thumbs-up";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mainLayout gradientBackground notFount">
      <ThumbsUp />
      <div className="contentContainer">
        <div>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
}
