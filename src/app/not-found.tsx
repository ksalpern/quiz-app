import Button from "@/components/ui/button/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
