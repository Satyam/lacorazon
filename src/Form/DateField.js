import React, { useContext, useEffect, useState } from 'react';
import { FormGroup, Label, FormFeedback, FormText, Col } from 'reactstrap';
import { FormikConsumer, ErrorMessage } from 'formik';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';

function useFormik() {
  return useContext(FormikConsumer._context);
}

let counter = 0;

export default function DateField({
  name,
  label,
  help,
  className,
  id,
  ...rest
}) {
  if (process.env.NODE_ENV !== 'production' && !name) {
    throw new Error('TextField: name argument is mandatory');
  }
  const {
    values,
    errors,
    touched,
    registerField,
    unregisterField,
    setFieldTouched,
    setFieldValue
  } = useFormik();

  useEffect(() => {
    registerField(name, {
      props: {
        name,
        label,
        help,
        className,
        id,
        ...rest
      }
    });
    return () =>
      unregisterField(name, {
        props: {
          name,
          label,
          help,
          className,
          id,
          ...rest
        }
      });
  });

  const [actualId] = useState(id || `F_DF_${counter}`);

  counter = (counter + 1) % Number.MAX_SAFE_INTEGER;

  const invalid = errors[name] && touched[name];
  return (
    <FormGroup row>
      <Label for={actualId} xs={12} lg={2}>
        {label}
      </Label>
      <Col xs={12} lg={8}>
        <DatePicker
          className={classNames('form-control', className, {
            'is-invalid': invalid
          })}
          name={name}
          id={actualId}
          onChange={value => {
            debugger;
            setFieldValue(name, value);
          }}
          onBlur={() => {
            debugger;
            setFieldTouched(name, true);
          }}
          selected={values[name]}
          {...rest}
        />
        {help && <FormText>{help}</FormText>}
        <ErrorMessage
          name={name}
          component={FormFeedback}
          style={{ display: invalid ? 'block' : 'none' }}
        />
      </Col>
    </FormGroup>
  );
}
