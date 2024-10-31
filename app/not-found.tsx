import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen px-4 py-32 bg-background">
      <div className="w-full max-w-md">
        <p className="mt-5 mb-3 text-3xl font-bold text-foreground">404</p>
        <p className="mb-3 text-xl font-semibold text-foreground">
          Page not found
        </p>
        <p className="mb-6 text-base text-muted-foreground">
          We can't seem to find the page you're looking for. You can return to
          our{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            main page
          </Link>{" "}
          to continue browsing.
        </p>
      </div>
    </section>
  );
}
