import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Summary() {
    const location = useLocation();
    const navigate = useNavigate();

    const { wordsWithInputs, correctIndices } = location.state || {};

    useEffect(() => {
        if (!wordsWithInputs || !correctIndices) {
            navigate('/missing');
        }
    }, [wordsWithInputs, correctIndices, navigate]);

    if (!wordsWithInputs || !correctIndices) return null;

    const totalTypedWords = wordsWithInputs.filter(w => w.type === 'input').length;
    const correctCount = correctIndices.size;
    const scorePercent = totalTypedWords === 0 ? 0 : Math.round((correctCount / totalTypedWords) * 100);

    const missedWords = wordsWithInputs
        .map((item, index) => ({ ...item, index }))
        .filter(item => item.type === 'input' && !correctIndices.has(item.index))
        .map(item => item.original);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Summary</h2>

            <p><strong>Correct Answers:</strong> {correctCount} / {totalTypedWords}</p>
            <p><strong>Score:</strong> {scorePercent}%</p>

            <div className="mt-4">
                <h4>Missed Words</h4>
                {missedWords.length > 0 ? (
                    <ul className="list-group">
                        {missedWords.map((word, i) => (
                            <li key={i} className="list-group-item">
                                {word}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No missed words!</p>
                )}
            </div>

            <Link to="/" className="btn btn-primary mt-4">
                Return to Home
            </Link>
        </div>
    );
}
