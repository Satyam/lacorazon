import React from 'react';
import { FormGroup, Label, Col } from 'reactstrap';

export default function LabeledText({ label, value, pre }) {
  return (
    <FormGroup row>
      <Label xs={12} lg={2}>
        {label}
      </Label>
      <Col
        xs={12}
        lg={8}
        style={{
          whiteSpace: pre ? 'pre-line' : 'inherit',
          border: 'thin solid silver',
          borderRadius: '0.3em'
        }}
      >
        {value}
      </Col>
    </FormGroup>
  );
}
