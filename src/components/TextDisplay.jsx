import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export default function TextDisplay({ wordsWithInputs = [], onInputChange, correctIndices = new Set(), toggleCorrect, showFilled }) {
    return (
        <div className="flex flex-wrap gap-2 mb-4 text-lg">
            {wordsWithInputs.map((item, index) =>
                item.type === 'text' ? (
                    <span key={index}>{item.value}</span>
                ) : !showFilled ? (
                    <input
                        key={index}
                        type="text"
                        value={item.value}
                        onChange={(e) => onInputChange(index, e.target.value)}
                        className="border border-gray-300 p-1 rounded"
                    />
                ) : (
                    <span
                        key={index}
                        data-tooltip-id={`tooltip-${index}`}
                        data-tooltip-content={item.original}
                        onClick={() => toggleCorrect(index)}
                        style={{
                            color: correctIndices.has(index) ? 'green' : 'blue',
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                    >
                        {item.value || <i>(empty)</i>}{' '}
                        <ReactTooltip id={`tooltip-${index}`} place="top" type="dark" effect="solid" />
                    </span>
                )
            )}
        </div>
    );
}
