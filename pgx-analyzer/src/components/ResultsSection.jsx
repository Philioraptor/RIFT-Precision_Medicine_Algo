import React, { useState } from 'react';
import RiskCard from './RiskCard';

const ResultsSection = ({ results }) => {
    const [copied, setCopied] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(results, null, 2))}`;
        link.download = 'pgx_results.json';
        link.click();
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(results, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!results?.length) return null;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="pgx-results">
            {/* Header */}
            <div className="results-header">
                <div>
                    <div className="results-eyebrow">Analysis Complete</div>
                    <div className="results-title">Risk Assessment Results</div>
                </div>
                <div className="results-meta">
                    {results.length} drug{results.length > 1 ? 's' : ''} analyzed · {date}
                </div>
            </div>

            {/* Cards Grid */}
            <div className="results-grid">
                {results.map((r, i) => (
                    <RiskCard key={i} result={r} index={i} />
                ))}
            </div>

            {/* Export Bar */}
            <div className="export-bar">
                <div>
                    <div className="export-bar-label">Report Ready</div>
                    <div className="export-bar-title">Export for EHR Integration</div>
                </div>
                <div className="export-bar-btns">
                    <button className="btn-export btn-export-ghost" onClick={handleCopy}>
                        {copied ? (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                Copy JSON
                            </>
                        )}
                    </button>
                    <button className="btn-export btn-export-primary" onClick={handleDownload}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download .json
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsSection;
