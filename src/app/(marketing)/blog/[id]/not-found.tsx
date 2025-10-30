import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link href="/blog">Go back to blog</Link>
    </div>
  );
}
