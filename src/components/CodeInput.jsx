import React from 'react';

const CodeInput = ({ code, setCode, language, setLanguage, analyzeCode, loading }) => {
    return (
        <div className="glass-card input-card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>✍️</span> Input Code
            </h3>

            <div className="form-group">
                <label>Language</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option>Python</option>
                    <option>Java</option>
                    <option>C++</option>
                    <option>JavaScript</option>
                    <option>Go</option>
                    <option>Rust</option>
                    <option>TypeScript</option>
                </select>
            </div>

            <div className="form-group">
                <label>Source Code</label>
                <textarea
                    placeholder={`Paste your ${language} code here...`}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    className="btn-primary"
                    onClick={analyzeCode}
                    disabled={loading || !code.trim()}
                >
                    {loading ? (
                        <>
                            <div className="loading-spinner"></div>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <span>✨</span> Analyze & Refine
                        </>
                    )}
                </button>

                <button
                    className="btn-primary"
                    style={{ background: 'rgba(255,255,255,0.1)', width: 'auto' }}
                    onClick={() => setCode('')}
                    disabled={!code}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default CodeInput;
