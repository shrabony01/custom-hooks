import React from 'react';
import PaginationDemo from './components/PaginationDemo';
import DebounceSearchDemo from './components/DebounceSearchDemo';

function App() {
  return (
    <main style={appStyles.container}>
      <header style={appStyles.header}>
        <h1 style={appStyles.title}>Lab 2: Custom Hooks Implementation</h1>
        <p style={appStyles.subtitle}>
          Showcasing <code>usePagination</code> and <code>useDebounce</code> custom React hooks.
        </p>
      </header>

      <div style={appStyles.contentWrapper}>
        <PaginationDemo />
        <DebounceSearchDemo />
      </div>
    </main>
  );
}

export default App;

const appStyles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    padding: '2.5rem 1rem',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    maxWidth: '720px',
    margin: '0 auto 2rem',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 0.5rem',
    color: '#0f172a',
    fontSize: '2rem',
    fontWeight: 700,
  },
  subtitle: {
    margin: 0,
    color: '#64748b',
    fontSize: '1rem',
  },
  contentWrapper: {
    maxWidth: '720px',
    margin: '0 auto',
  },
};