import React, { useState } from 'react';

const RiskCard = ({ result, index }) => {
    const [open, setOpen] = useState(false);

    const badgeClass =
        result.risk === 'safe' ? 'risk-safe' :
            result.risk === 'warn' ? 'risk-warn' : 'risk-danger';

    const riskLabel =
        result.risk === 'safe' ? 'Safe' :
            result.risk === 'warn' ? 'Dose Adjust' : 'High Risk';

    return (
        <div
            className="result-card fade-in"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Header */}
            <div className="result-card-header" onClick={() => setOpen(o => !o)}>
                <div className="result-drug-info">
                    <div className="drug-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--mint-dark)' }}>
                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                            <path d="M3 21h18" /><path d="M9 10h6" /><path d="M12 7v6" />
                        </svg>
                    </div>
                    <div>
                        <div className="result-drug-label">{result.drug}</div>
                        <div className="result-drug-class">{result.drugClass}</div>
                    </div>
                </div>
                <div className="result-header-right">
                    <span className={`risk-badge ${badgeClass}`}>{result.label || riskLabel}</span>
                    <div className={`expand-icon${open ? ' open' : ''}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Expandable Body */}
            <div className={`result-body${open ? ' open' : ''}`}>
                <div className="result-body-inner">
                    <div className="detail-row">
                        <span className="detail-label">Gene(s)</span>
                        <span className="detail-value mono">{result.gene || '—'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Diplotype</span>
                        <span className="detail-value mono">{result.diplotype || '—'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Phenotype</span>
                        <span className="detail-value">{result.phenotype || '—'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Activity</span>
                        <span className="detail-value mono">{result.activity || '—'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">CPIC Level</span>
                        <span className="detail-value">{result.cpicLevel || '—'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Note</span>
                        <span className="detail-value" style={{ fontSize: 12.5 }}>{result.note || '—'}</span>
                    </div>
                    <div className="rec-box">
                        <strong>Clinical Recommendation</strong>
                        {result.recommendation}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskCard;
