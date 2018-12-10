import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default function Page({ wide, children, title, heading }) {
  document.title = `La Corazón - ${title}`;
  return (
    <Container fluid>
      <Row>
        <Col sm="12" md={{ size: wide ? 12 : 8, offset: wide ? 0 : 2 }}>
          <h1>{heading}</h1>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
