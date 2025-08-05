import React from 'react';
import { Form } from 'react-bootstrap';

export default function DifficultySelector({ difficulty, setDifficulty }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Select Difficulty</Form.Label>
            {['easy', 'medium', 'hard'].map(level => (
                <Form.Check
                    key={level}
                    type="radio"
                    label={level.charAt(0).toUpperCase() + level.slice(1)}
                    name="difficulty"
                    id={`difficulty-${level}`}
                    value={level}
                    checked={difficulty === level}
                    onChange={() => setDifficulty(level)}
                    className="mb-2"
                />
            ))}
        </Form.Group>
    );
}
