interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Função para gerar as páginas visíveis com reticências
  function getVisiblePages() {
    const pagesArr = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pagesArr.push(i);
      return pagesArr;
    }
    if (currentPage <= 4) {
      pagesArr.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pagesArr.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pagesArr.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pagesArr;
  }
  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-green-500 transition-all duration-300"
      >
        Anterior
      </button>
      {visiblePages.map((page, idx) =>
        page === '...'
          ? (
            <span key={idx} className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                page === currentPage
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : 'bg-gray-800/50 border-gray-700 text-white hover:border-green-500'
              }`}
            >
              {page}
            </button>
          )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-green-500 transition-all duration-300"
      >
        Próxima
      </button>
    </div>
  );
} 