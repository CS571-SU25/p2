import React from 'react';
import { Alert, ListGroup } from 'react-bootstrap';

export default function MissedWordsList({ missedWords }) {
    if (!missedWords.length) return null;

    return (
        <Alert variant="warning" className="mt-4">
            <Alert.Heading>Missed words:</Alert.Heading>
            <ListGroup as="ul" variant="flush">
                {missedWords.map((word, i) => (
                    <ListGroup.Item as="li" key={i}>
                        {word}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Alert>
    );
}
