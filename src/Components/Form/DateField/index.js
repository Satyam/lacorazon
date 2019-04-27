import React, { useContext, useEffect, useState } from 'react';
import { FormGroup, Label, FormFeedback, FormText, Col } from 'reactstrap';
import { FormikConsumer, ErrorMessage } from 'formik';
import invariant from 'invariant';
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
  invariant(name, 'DateField: name argument is mandatory');

  const {
    values,
    errors,
    touched,
    registerField,
    unregisterField,
    setFieldTouched,
    setFieldValue,
    validationSchema,
  } = useFormik();

  useEffect(() => {
    registerField(name, {
      props: {
        name,
        label,
        help,
        className,
        id,
        ...rest,
      },
    });
    return () =>
      unregisterField(name, {
        props: {
          name,
          label,
          help,
          className,
          id,
          ...rest,
        },
      });
  });

  const [actualId] = useState(id || `F_DF_${counter}`);

  counter = (counter + 1) % Number.MAX_SAFE_INTEGER;

  const invalid = errors[name] && touched[name];

  let actualMin = rest.minDate;
  let actualMax = rest.maxDate;

  if (validationSchema) {
    const tests = validationSchema.fields[name].tests;
    if (!actualMin) {
      const minTest = tests.filter(t => t.TEST_NAME === 'min')[0];
      if (minTest) {
        actualMin = minTest.TEST.params.min;
      }
    }
    if (!actualMax) {
      const maxTest = tests.filter(t => t.TEST_NAME === 'max')[0];
      if (maxTest) {
        actualMax = maxTest.TEST.params.max;
      }
    }
  }
  return (
    <FormGroup row>
      <Label for={actualId} xs={12} lg={2}>
        {label}
      </Label>
      <Col xs={12} lg={8}>
        <DatePicker
          className={classNames('form-control', className, {
            'is-invalid': invalid,
          })}
          name={name}
          id={actualId}
          minDate={actualMin}
          maxDate={actualMax}
          onChange={value => setFieldValue(name, value)}
          onBlur={() => setFieldTouched(name, true)}
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
