import React, { useState } from 'react';
import { usePagination } from '../hooks/usePagination';

const TOTAL_COUNT = 123;
const SAMPLE_ITEMS = Array.from({ length: TOTAL_COUNT }, (_, index) => `Item ${index + 1}`);

export const PaginationDemo: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const {
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
  } = usePagination({
    totalItems: SAMPLE_ITEMS.length,
    itemsPerPage,
    initialPage: 1,
  });

  const currentItems = SAMPLE_ITEMS.slice(startIndex, endIndex + 1);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Pagination Demo</h3>

      {/* Dropdown with 5, 10, 15, 20 and Total Items count */}
      <div style={styles.topRow}>
        <div style={styles.selectWrapper}>
          <label htmlFor="per-page-select" style={styles.label}>
            Items per page:{' '}
          </label>
          <select
            id="per-page-select"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            style={styles.select}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div style={styles.totalItemsText}>
          Total Items: {SAMPLE_ITEMS.length}
        </div>
      </div>

      {/* Ordered list */}
      <ol start={startIndex + 1} style={styles.orderedList}>
        {currentItems.map((item, idx) => (
          <li key={idx} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ol>

      {/* Navigation Controls: Previous, Page X of Y, Next */}
      <div style={styles.navRow}>
        <button
          type="button"
          onClick={prevPage}
          disabled={!canPrevPage}
          style={canPrevPage ? styles.textBtn : styles.textBtnDisabled}
        >
          Previous
        </button>

        <div style={styles.pageIndicator}>
          Page <span style={styles.pageNumber}>{currentPage}</span> of {totalPages}
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={!canNextPage}
          style={canNextPage ? styles.textBtn : styles.textBtnDisabled}
        >
          Next
        </button>
      </div>

      {/* Summary Range */}
      <div style={styles.summaryText}>
        Showing items {itemsOnCurrentPage === 0 ? '0 - 0' : `${startIndex + 1} - ${endIndex + 1}`} (Total on this page: {itemsOnCurrentPage})
      </div>

      {/* Page Number Pills */}
      <div style={styles.pillContainer}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => setPage(pageNum)}
            style={{
              ...styles.pill,
              ...(currentPage === pageNum ? styles.activePill : {}),
            }}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationDemo;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '1.75rem 2rem',
    maxWidth: '680px',
    margin: '0 auto 2rem',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#374151',
  },
  title: {
    textAlign: 'center',
    margin: '0 0 1.5rem',
    fontSize: '1.15rem',
    fontWeight: 500,
    color: '#1f2937',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
  },
  selectWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  label: {
    color: '#4b5563',
  },
  select: {
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  totalItemsText: {
    fontStyle: 'italic',
    color: '#4b5563',
  },
  orderedList: {
    paddingLeft: '1.25rem',
    margin: '0 0 2rem',
    lineHeight: 1.8,
    fontSize: '0.95rem',
  },
  listItem: {
    marginBottom: '0.25rem',
  },
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
  },
  pageIndicator: {
    color: '#374151',
  },
  pageNumber: {
    display: 'inline-block',
    minWidth: '1.5rem',
    textAlign: 'center',
  },
  textBtn: {
    background: 'none',
    border: 'none',
    color: '#1f2937',
    fontSize: '0.95rem',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
  },
  textBtnDisabled: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '0.95rem',
    cursor: 'not-allowed',
    padding: '0.25rem 0.5rem',
  },
  summaryText: {
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#4b5563',
    margin: '0.5rem 0 1rem',
  },
  pillContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.25rem',
  },
  pill: {
    minWidth: '28px',
    height: '28px',
    padding: '0 4px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: '#f9fafb',
    color: '#1f2937',
    fontSize: '0.8rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    backgroundColor: '#0070f3',
    borderColor: '#0070f3',
    color: '#ffffff',
    fontWeight: 600,
  },
};