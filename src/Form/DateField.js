import React, { useContext, useEffect } from 'react';
import { FormGroup, Label, FormFeedback, FormText, Col } from 'reactstrap';
import { FormikConsumer, ErrorMessage } from 'formik';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';

function useFormik() {
  return useContext(FormikConsumer._context);
}

export default function DateField({
  name,
  label,
  help,
  validate,
  className,
  ...rest
}) {
  if (process.env.NODE_ENV !== 'production' && !name) {
    throw new Error('TextField: name argument is mandatory');
  }
  const {
    values,
    errors,
    touched,
    validationSchema,
    registerField,
    unregisterField,
    setTouched,
    setFieldValue,
    validateField,
    validateOnBlur,
    validateOnChange
  } = useFormik();

  useEffect(() => {
    registerField(name, this);
    return () => unregisterField(name, this);
  });

  const invalid = errors[name] && touched[name];
  return (
    <FormGroup row>
      <Label for={name} xs={12} lg={2}>
        {label}
      </Label>
      <Col xs={12} lg={8}>
        <DatePicker
          className={classNames('form-control', className, {
            'is-invalid': invalid
          })}
          name={name}
          id={name}
          onChange={value => {
            setFieldValue(name, value);
            if (validateOnChange) {
              validateField(name);
            }
          }}
          onBlur={() => {
            setTouched(name, true);
            if (validateOnBlur) {
              validateField(name);
            }
          }}
          selected={values[name]}
          validate={
            validate
              ? value =>
                  validate(
                    validationSchema
                      ? validationSchema.fields[name].cast(value)
                      : value
                  )
              : void 0
          }
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
