import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-brand)]">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
      <p className="mt-4 text-base text-gray-700">
        The page you were looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-dark)]"
      >
        Return home
      </Link>
    </main>
  );
}
