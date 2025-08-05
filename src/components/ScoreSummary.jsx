import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default function ScoreSummary({ correctCount, totalTypedWords }) {
    const scorePercent = totalTypedWords === 0 ? 0 : Math.round((correctCount / totalTypedWords) * 100);

    return (
        <div className="mb-4 text-center">
            <h5>Score: {scorePercent}% ({correctCount} / {totalTypedWords})</h5>
            <ProgressBar
                now={scorePercent}
                label={`${scorePercent}%`}
                visuallyHidden={false}
                variant={scorePercent >= 70 ? 'success' : scorePercent >= 40 ? 'warning' : 'danger'}
                aria-label="Score progress"
            />
        </div>
    );
}
