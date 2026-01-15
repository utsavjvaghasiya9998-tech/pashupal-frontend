import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export const Pagination = ({ page, totalPages, onPageChange }) => {
    if (!totalPages || totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 mt-6">
            {/* Prev */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="flex items-center gap-1 px-3 py-1.5 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
            >
                <MdChevronLeft className="text-xl" />
                Prev
            </button>

            {/* Page Info */}
            <span className="font-semibold text-gray-700">
                Page {page} of {totalPages}
            </span>

            {/* Next */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="flex items-center gap-1 px-3 py-1.5 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
            >
                Next
                <MdChevronRight className="text-xl" />
            </button>
        </div>
    );
};
