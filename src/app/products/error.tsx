"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Products Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
        Something went wrong!
      </h2>
      <p className="text-zinc-400 max-w-md mb-8">
        We couldn't load the products. This might be due to a temporary network issue or a problem with our servers.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
      >
        Try again
      </button>
    </div>
  );
}
