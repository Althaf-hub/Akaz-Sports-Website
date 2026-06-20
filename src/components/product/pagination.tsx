"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `/products?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-16 mb-8">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <span className="sr-only">Previous Page</span>
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/50 text-zinc-700 cursor-not-allowed">
          <ChevronLeft className="h-5 w-5" />
        </div>
      )}

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;
          
          // Basic logic to show limited pages if there are many
          if (
            totalPages > 5 &&
            page !== 1 &&
            page !== totalPages &&
            Math.abs(page - currentPage) > 1
          ) {
            if (page === 2 || page === totalPages - 1) {
              return <span key={page} className="text-zinc-600">...</span>;
            }
            return null;
          }

          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                isCurrent
                  ? "bg-primary text-white"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <span className="sr-only">Next Page</span>
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/50 text-zinc-700 cursor-not-allowed">
          <ChevronRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
