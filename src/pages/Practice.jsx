import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PresetSelector from '../components/PresetSelector';
import DifficultySelector from '../components/DifficultySelector';
import TextDisplay from '../components/TextDisplay';
import ScoreSummary from '../components/ScoreSummary';
import MissedWordsList from '../components/MissedWordsList';
import { presets } from '../constants/presets';
import { DIFFICULTY_PRESETS } from '../constants/difficultyPresets';
import { tokenizeJapanese } from '../utils/tokenizeJapanese';
import { selectBlankIndices } from '../utils/blankWordSelector';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

export default function Practice() {
    const navigate = useNavigate();
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

    const handleGoToSummary = () => {
        navigate('/summary', { state: { wordsWithInputs, correctIndices } });
    };

    const toggleCorrect = (index) => {
        setCorrectIndices((prev) => {
            const newSet = new Set(prev);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    };

    const totalTypedWords = wordsWithInputs.filter(w => w.type === 'input').length;
    const correctCount = correctIndices.size;
    const scorePercent = totalTypedWords === 0 ? 0 : Math.round((correctCount / totalTypedWords) * 100);

    const missedWords = wordsWithInputs
        .map((item, index) => ({ ...item, index }))
        .filter(item => item.type === 'input' && !correctIndices.has(item.index))
        .map(item => item.original);

    return (
        <Container className="py-4">
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    <PresetSelector presets={presets} selectedPreset={selectedPreset} onChange={handlePresetChange} />

                    {selectedPreset === 'custom' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Custom Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                value={originalText}
                                onChange={(e) => setOriginalText(e.target.value)}
                                placeholder="テキストを入力してください"
                            />
                        </Form.Group>
                    )}

                    <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />

                    <Button type="submit" className="w-100 mt-3" variant="primary">
                        Submit
                    </Button>
                </Form>
            ) : !showFilledText ? (
                <>
                    <TextDisplay
                        wordsWithInputs={wordsWithInputs}
                        onInputChange={handleInputChange}
                        showFilled={false}
                    />
                    <Button onClick={handleShowFilledText} className="mt-4" variant="success">
                        Show Filled Text
                    </Button>
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
                    <Button onClick={handleGoToSummary} className="mt-4" variant="secondary">
                        Go to Summary
                    </Button>
                </>
            )}
        </Container>
    );
}
