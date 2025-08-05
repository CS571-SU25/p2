import React from 'react';
import { Link } from 'react-router-dom';
import { presets } from '../constants/presets';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

export default function Home() {
    const featuredTexts = presets.filter(p => p.label !== 'Custom');

    return (
        <Container className="py-5">
            <Row className="mb-5">
                <Col>
                    <h1 className="mb-3">Welcome to Context Clues</h1>
                    <p className="lead">
                        Context Clues is an interactive reading tool that removes select words from foreign language texts. Your task is to infer the correct word based on grammar and context.
                    </p>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>How it Works</Card.Title>
                            <ListGroup variant="flush" className="mt-3">
                                <ListGroup.Item>
                                    Words are removed at intervals based on adjustable difficulty settings.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    You fill in the blanks using your understanding of the text.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    After submitting, review your performance and self-assess your answers.
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Featured Texts</Card.Title>
                            <ListGroup variant="flush" className="mt-3">
                                {featuredTexts.map((preset, index) => (
                                    <ListGroup.Item key={index}>{preset.label}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="text-center">
                <Col>
                    <Button as={Link} to="/practice" variant="primary" size="lg">
                        Start Practicing
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
