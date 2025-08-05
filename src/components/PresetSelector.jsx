import React from 'react';
import { Form } from 'react-bootstrap';

export default function PresetSelector({ presets, selectedPreset, onChange }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Select a Text</Form.Label>
            <Form.Select value={selectedPreset} onChange={e => onChange(e.target.value)}>
                {presets.map((preset, i) => (
                    <option key={i} value={preset.value}>
                        {preset.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}
