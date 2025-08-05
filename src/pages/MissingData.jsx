import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

export default function MissingData() {
    return (
        <Container className="mt-5 text-center">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Alert variant="warning">
                        <Alert.Heading>No data available</Alert.Heading>
                        <p>You visited the Summary page directly or your session expired.</p>
                        <hr />
                        <Button as={Link} to="/" variant="primary">
                            Return to Home
                        </Button>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}
