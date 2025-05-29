interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  
  let visiblePages = pages;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    visiblePages = pages.slice(start - 1, end);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
      >
        Anterior
      </button>

      <div className="flex gap-2">
        {currentPage > 2 && totalPages > maxVisiblePages && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="btn btn-secondary min-w-[40px]"
            >
              1
            </button>
            {currentPage > 3 && <span className="text-gray-400">...</span>}
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn min-w-[40px] ${
              page === currentPage
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 1 && totalPages > maxVisiblePages && (
          <>
            {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="btn btn-secondary min-w-[40px]"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
      >
        Próxima
      </button>
    </div>
  );
} 