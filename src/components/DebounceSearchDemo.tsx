import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export const DebounceSearchDemo: React.FC = () =>{
    const [searchTerm,setSearchTerm] = useState<string>('');
    const DebounceSearchTerm = useDebounce<string>(searchTerm,500);

    // Simulate API trigger when debounced term changes

    useEffect(()=>{
        if(debounceSearchTerm){
            console.log(`Searching for: ${debouncedSearchTerm}`);
        }
    },[debounceSearchTerm]);

    return(
        <div style={demoStyles.card}>
            <h2 style={demoStyles.heading}>useDebounce Demo</h2>
            <p style={demoStyle.subtext}> 
               Type rapidly below. The debounced value only updates after 500ms of inactivity. 
            </p>

            <div style={demoStyles.inputGroup}>
                <label htmlFor="search-input" style={demoStyles.label}>
                    Live Search Input:
                </label>

                <input
                    id="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type search query here..."
                    style={demoStyles.input}
                 />

            </div>
            <div style={demoStyles.resultBox}>
                <p>
                    <strong>Immediate Value:</strong> {searchTerm || <em>(empty)</em>}
                </p>

                <p>
                    <strong>Debounced Value (500ms):</strong>{' '}
                    <span style={demoStyles.highlight}>{debouncedSearchTerm || <em>(empty)</em>}</span>
                </p>
            </div>
        </div>

    )
}
export default DebounceSearchDemo;

const demoStyles: { [key: string]: React.CSSProperties } = {
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
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' },
  label: { fontSize: '0.875rem', fontWeight: 600, color: '#334155' },
  input: {
    padding: '0.6rem 0.8rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    outline: 'none',
  },
  resultBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.8rem 1rem',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: '#334155',
  },
  highlight: { color: '#2563eb', fontWeight: 600 },
};