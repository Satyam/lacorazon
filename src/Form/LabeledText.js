import React from 'react';
import { FormGroup, Label, Col } from 'reactstrap';
import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

export default function LabeledText({ label, value, children, pre }) {
  return (
    <FormGroup row>
      <Label xs={12} lg={2}>
        {label}
      </Label>
      <Col xs={12} lg={8}>
        <div className={cx('form-control', { 'labeled-pre': pre })}>
          {value}
          {children}
        </div>
      </Col>
    </FormGroup>
  );
}
