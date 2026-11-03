import React from 'react';
import { usePagination } from '../hooks/usePagination';

// Generate 100 sample items
const SAMPLE_ITEMS = Array.from({ length: 100 }, (_, index) => `Item #${index + 1}`);

export const PaginationDemo: React.FC = () => {
  const itemsPerPage = 8;
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

  // Slice items using 0-based indices from usePagination
  const currentItems = SAMPLE_ITEMS.slice(startIndex, endIndex + 1);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>usePagination Demo</h2>
      <p style={styles.subtext}>
        Managing <strong>{SAMPLE_ITEMS.length}</strong> total items at <strong>{itemsPerPage}</strong> items per page.
      </p>

      {/* Meta Stats Panel */}
      <div style={styles.statsGrid}>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Current Page</span>
          <strong>{currentPage} / {totalPages}</strong>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Index Range</span>
          <strong>{startIndex} – {endIndex}</strong>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Items On Page</span>
          <strong>{itemsOnCurrentPage}</strong>
        </div>
      </div>

      {/* Items Slice List */}
      <ul style={styles.list}>
        {currentItems.map((item, idx) => (
          <li key={idx} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>

      {/* Navigation Controls */}
      <div style={styles.controlRow}>
        <button
          type="button"
          onClick={prevPage}
          disabled={!canPrevPage}
          style={{ ...styles.btn, ...(!canPrevPage ? styles.btnDisabled : {}) }}
        >
          Previous
        </button>

        <div style={styles.pagePills}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setPage(pageNum)}
              style={{
                ...styles.pillBtn,
                ...(currentPage === pageNum ? styles.pillActive : {}),
              }}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={!canNextPage}
          style={{ ...styles.btn, ...(!canNextPage ? styles.btnDisabled : {}) }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationDemo;

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginBottom: '2rem',
  },
  heading: { margin: '0 0 0.5rem', color: '#1e293b', fontSize: '1.35rem' },
  subtext: { margin: '0 0 1rem', color: '#64748b', fontSize: '0.9rem' },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  statBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '0.6rem 0.8rem',
    borderRadius: '6px',
    textAlign: 'center',
    fontSize: '0.85rem',
  },
  statLabel: { display: 'block', color: '#64748b', marginBottom: '0.2rem', fontSize: '0.75rem' },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1.25rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
  },
  listItem: {
    backgroundColor: '#f1f5f9',
    padding: '0.55rem 0.8rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    color: '#334155',
    border: '1px solid #e2e8f0',
  },
  controlRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  btn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  btnDisabled: {
    backgroundColor: '#cbd5e1',
    cursor: 'not-allowed',
    color: '#94a3b8',
  },
  pagePills: { display: 'flex', gap: '0.3rem', flexWrap: 'wrap' },
  pillBtn: {
    padding: '0.35rem 0.65rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  pillActive: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderColor: '#2563eb',
    fontWeight: 600,
  },
};