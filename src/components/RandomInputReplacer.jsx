import React, { useState } from 'react';
import PresetSelector from './PresetSelector';
import DifficultySelector from './DifficultySelector';
import TextDisplay from './TextDisplay';
import ScoreSummary from './ScoreSummary';
import MissedWordsList from './MissedWordsList';
import { presets } from '../constants/presets';
import { DIFFICULTY_PRESETS } from '../constants/difficultyPresets';
import { tokenizeJapanese } from '../utils/tokenizeJapanese';
import { selectBlankIndices } from '../utils/blankWordSelector';

export default function RandomInputReplacer() {
    const [submitted, setSubmitted] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(presets[0].value);
    const [originalText, setOriginalText] = useState(presets[0].value);
    const [wordsWithInputs, setWordsWithInputs] = useState([]);
    const [showFilledText, setShowFilledText] = useState(false);
    const [correctIndices, setCorrectIndices] = useState(new Set());
    const [difficulty, setDifficulty] = useState('medium');

    const handlePresetChange = (e) => {
        const val = e.target.value;
        setSelectedPreset(val);
        setOriginalText(val === 'custom' ? '' : val);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!originalText.trim()) return alert('テキストを入力してください。');

        const words = tokenizeJapanese(originalText);
        const { minBlanks, maxBlanks, minSpacing } = DIFFICULTY_PRESETS[difficulty];
        const blankIndices = selectBlankIndices(words, minBlanks, maxBlanks, minSpacing);

        const newWords = words.map((word, idx) =>
            blankIndices.has(idx)
                ? { type: 'input', value: '', original: word }
                : { type: 'text', value: word, original: word }
        );

        setWordsWithInputs(newWords);
        setSubmitted(true);
        setShowFilledText(false);
        setCorrectIndices(new Set());
    };

    const handleInputChange = (index, newValue) => {
        setWordsWithInputs((prev) =>
            prev.map((item, i) => (i === index ? { ...item, value: newValue } : item))
        );
    };

    const handleShowFilledText = () => {
        const initialCorrect = new Set();
        wordsWithInputs.forEach((item, index) => {
            if (item.type === 'input' && item.value === item.original) {
                initialCorrect.add(index);
            }
        });
        setCorrectIndices(initialCorrect);
        setShowFilledText(true);
    };

    const toggleCorrect = (index) => {
        setCorrectIndices((prev) => {
            const newSet = new Set(prev);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    };

    const handleReset = () => {
        setSubmitted(false);
        setShowFilledText(false);
        setWordsWithInputs([]);
        setCorrectIndices(new Set());
        setSelectedPreset(presets[0].value);
        setOriginalText(presets[0].value);
    };

    const totalTypedWords = wordsWithInputs.filter(w => w.type === 'input').length;
    const correctCount = correctIndices.size;
    const scorePercent = totalTypedWords === 0 ? 0 : Math.round((correctCount / totalTypedWords) * 100);

    const missedWords = wordsWithInputs
        .map((item, index) => ({ ...item, index }))
        .filter(item => item.type === 'input' && !correctIndices.has(item.index))
        .map(item => item.original);

    return (
        <div className="p-4 max-w-xl mx-auto">
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <PresetSelector presets={presets} selectedPreset={selectedPreset} onChange={handlePresetChange} />

                    {selectedPreset === 'custom' && (
                        <textarea
                            rows={10}
                            value={originalText}
                            onChange={(e) => setOriginalText(e.target.value)}
                            className="border border-gray-300 rounded p-3 mb-4 w-full text-lg"
                            placeholder="テキストを入力してください"
                        />
                    )}

                    <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                        Submit
                    </button>
                </form>
            ) : !showFilledText ? (
                <>
                    <TextDisplay
                        wordsWithInputs={wordsWithInputs}
                        onInputChange={handleInputChange}
                        showFilled={false}
                    />
                    <button
                        onClick={handleShowFilledText}
                        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                    >
                        Show Filled Text
                    </button>
                </>
            ) : (
                <>
                    <TextDisplay
                        wordsWithInputs={wordsWithInputs}
                        correctIndices={correctIndices}
                        toggleCorrect={toggleCorrect}
                        showFilled={true}
                    />
                    <ScoreSummary scorePercent={scorePercent} correctCount={correctCount} totalTypedWords={totalTypedWords} />
                            <MissedWordsList missedWords={missedWords} />
                            <button
                                onClick={handleReset}
                                className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                            >
                                Return to Main Menu
                            </button>

                </>
            )}
        </div>
    );
}
