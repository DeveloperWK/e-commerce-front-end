import { PaginationProps } from "../types/types";

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  handlePageChange,
  currentPage,
}) => {
  return (
    <section className="w-full flex flex-wrap justify-center mt-4 space-x-2">
      {totalPages > 1 && (
        <div className="w-full flex flex-wrap justify-center mt-4 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Pagination;
