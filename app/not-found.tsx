import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
      <h1 className="display-serif text-5xl mb-4">404</h1>
      <p className="text-sm font-light text-stone mb-8">
        The page you&apos;re looking for has slipped into something more
        comfortable.
      </p>
      <Link href="/" className="btn btn-dark">Back To Home</Link>
    </div>
  );
}
