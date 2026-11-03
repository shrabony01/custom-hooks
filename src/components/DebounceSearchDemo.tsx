import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export const DebounceSearchDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debounceDelay = 500;
  const debouncedValue = useDebounce<string>(inputValue, debounceDelay);

  // Simulated search logging
  useEffect(() => {
    if (debouncedValue.trim()) {
      console.log(`Searching for: ${debouncedValue}`);
    }
  }, [debouncedValue]);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Debounce Search Demo</h3>

      <div style={styles.delayText}>
        Debounce Delay (ms): {debounceDelay}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type to search..."
        style={styles.input}
      />

      <div style={styles.infoSection}>
        <div>
          <strong>Current Input:</strong>
          <div style={styles.valueText}>{inputValue}</div>
        </div>

        <div style={{ marginTop: '0.75rem' }}>
          <em><strong>Debounced Value (after {debounceDelay}ms):</strong></em>
          <div style={{ ...styles.valueText, fontStyle: 'italic' }}>
            {debouncedValue}
          </div>
        </div>
      </div>

      <div style={styles.resultsSection}>
        <div style={styles.resultsHeading}>Simulated Search Results:</div>
        {debouncedValue.trim() ? (
          <ul style={styles.resultList}>
            <li>Result for &quot;{debouncedValue}&quot;: Item 1</li>
            <li>Result for &quot;{debouncedValue}&quot;: Item 2</li>
            <li>Result for &quot;{debouncedValue}&quot;: Item 3</li>
          </ul>
        ) : (
          <p style={styles.emptyText}>Type to see results.</p>
        )}
      </div>
    </div>
  );
};

export default DebounceSearchDemo;

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
  delayText: {
    fontSize: '0.95rem',
    color: '#374151',
    marginBottom: '1.25rem',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.55rem 0.75rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.95rem',
    outline: 'none',
    marginBottom: '1.5rem',
    color: '#1f2937',
  },
  infoSection: {
    marginBottom: '1.25rem',
    fontSize: '0.95rem',
    lineHeight: 1.5,
  },
  valueText: {
    marginTop: '0.2rem',
    wordBreak: 'break-all',
    color: '#1f2937',
  },
  resultsSection: {
    fontSize: '0.95rem',
    color: '#374151',
  },
  resultsHeading: {
    color: '#374151',
    marginBottom: '0.5rem',
  },
  resultList: {
    margin: 0,
    paddingLeft: '1.25rem',
    lineHeight: 1.8,
    wordBreak: 'break-all',
    color: '#374151',
  },
  emptyText: {
    margin: 0,
    color: '#4b5563',
  },
};