import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">404</h1>
        <h2 className="text-xl font-medium text-muted-foreground">Page Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
