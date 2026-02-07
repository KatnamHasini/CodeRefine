import React from 'react';

const ResultDisplay = ({ result }) => {
    if (!result) return null;

    const getScoreColor = (score) => {
        if (score >= 80) return "var(--success)";
        if (score >= 60) return "var(--warning)";
        return "var(--danger)";
    };

    const scoreColor = getScoreColor(result.score);

    // Fallback for issues if it's not an array
    const issuesList = Array.isArray(result.issues) ? result.issues : [];

    return (
        <div className="glass-card result-card" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🎯</span> Analysis Results
            </h3>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div
                    className="score-badge"
                    style={{ borderColor: scoreColor, boxShadow: `0 0 20px ${scoreColor}40` }}
                >
                    <span className="score-value" style={{ color: scoreColor }}>{result.score}</span>
                    <span className="score-label">Score</span>
                </div>
            </div>

            <div className="form-group">
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🔍 Analysis</h4>
                <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{result.explanation}</p>
            </div>

            <div className="form-group">
                <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>⚠️ Issues Detected</h4>
                {issuesList.length > 0 ? (
                    <ul style={{ paddingLeft: '1.5rem', color: '#cbd5e1' }}>
                        {issuesList.map((issue, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem' }}>{issue}</li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: 'var(--success)' }}>No major issues found. Great job!</p>
                )}
            </div>

            <div className="form-group">
                <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>✨ Optimized Code</h4>
                <div style={{ position: 'relative' }}>
                    <pre style={{ margin: 0, maxHeight: '400px', overflowY: 'auto' }}>
                        <code>{result.optimized_code || result.suggestion}</code>
                    </pre>
                </div>
                {result.optimized_code_explanation && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' }}>
                        💡 {result.optimized_code_explanation}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;
