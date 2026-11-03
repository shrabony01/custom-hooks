import { useState } from "react";
import { useState, useEffect } from 'react';
// export {};

export interface UsePaginationOptions {
    totalItems: number;
    itemsPerPage?: number;
    initialPage?: number;
}

export interface UsePaginationReturn {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    itemsOnCurrentPage: number;
    setPage: (pageNumber: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    canNextPage: boolean;
    canPrevPage: boolean;
}

export function usePagination({
    totalItems,
    itemsPerPage = 10,
    initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn {

    // Safe itemsPerPage enforcement (must be at least 1)
    const safeItemsPerPage = Math.max(1, itemsPerPage);

    // Edge case: when totalItems is 0, totalPages should still be at least 1
    const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));

    const [currentPage, setCurrentPageState] = useState<number>(() => {
        return Math.min(Math.max(1, initialPage), totalPages);
    });
    // Clamps currentPage if totalPages drops below current page dynamically
    useEffect(()=>{
        if(currentPage > totalPages){
            setCurrentPageState(totalPages);
        }
    },[currentPage,totalPages]);

    // Calculate indices (0-based)
    const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * safeItemsPerPage;
    const endIndex = totalItems === 0 ? 0 : Math.min(startIndex + safeItemsPerPage - 1, totalItems - 1);
    const itemsOnCurrentPage = totalItems === 0 ? 0 : endIndex - startIndex + 1;

    const canNextPage = currentPage < totalPages;
    const canPrevPage = currentPage > 1;

    const setPage = (pageNumber: number) => {
        const clampedPage = Math.min(Math.max(1, pageNumber), totalPages);
        setCurrentPageState(clampedPage);
    };

    const nextPage = () => {
        if (canNextPage) {
            setCurrentPageState((prev) => Math.min(prev + 1, totalPages));
        }
    };

    const prevPage = () => {
        if (canPrevPage) {
            setCurrentPageState((prev) => Math.max(prev - 1, 1));
        }
    };

    return {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        itemsOnCurrentPage,
        setPage,
        nextPage,
        prevPage,
        canNextPage,
        canPrevPage,
    };
}
export default usePagination;

