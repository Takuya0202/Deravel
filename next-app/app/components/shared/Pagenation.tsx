import { Link } from "@/i18n/routing";
import { Icon } from "@/app/components/shared/lucide";

interface PagenationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // 例: `/${lang}/posts/${category}`
}

export function Pagenation({ currentPage, totalPages, basePath }: PagenationProps) {
  if (totalPages <= 1) {
    return null; // 1ページ以下の場合は表示しない
  }

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-4 mt-10 mb-15">
      {/* 前へボタン */}
      {hasPreviousPage ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="flex items-center justify-center w-10 h-10 border border-black rounded-sm bg-base hover:bg-black transition-colors hover:text-white"
          aria-label={`Go to page ${currentPage - 1}`}
        >
          <Icon.ArrowLeft className="w-5 h-5" strokeWidth={2} />
        </Link>
      ) : (
        <div
          className="flex items-center justify-center w-10 h-10 border opacity-50 border-black rounded-sm bg-base"
          aria-hidden="true"
        >
          <Icon.ArrowLeft className="w-5 h-5" strokeWidth={2} />
        </div>
      )}

      {/* ページ番号 */}
      <div className="flex items-center justify-center gap-4 px-4">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2" aria-hidden="true">
                ...
              </span>
            );
          }
          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;
          return (
            <Link
              key={pageNum}
              href={`${basePath}?page=${pageNum}`}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isCurrentPage ? "bg-black font-bold text-white" : "bg-base hover:bg-main"
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* 次へボタン */}
      {hasNextPage ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-sm bg-base hover:bg-black transition-colors hover:text-white"
          aria-label={`Go to page ${currentPage + 1}`}
        >
          <Icon.ArrowRight className="w-5 h-5" strokeWidth={2} />
        </Link>
      ) : (
        <div
          className="flex items-center justify-center w-10 h-10 border opacity-50 border-black rounded-sm bg-base"
          aria-hidden="true"
        >
          <Icon.ArrowRight className="w-5 h-5" strokeWidth={2} />
        </div>
      )}
    </div>
  );
}
