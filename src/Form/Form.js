import React from 'react';
import { Form as BSForm, Alert } from 'reactstrap';
import { Formik, Form as KForm } from 'formik';

export default function Form({
  schema,
  values,
  onSubmit,
  children,
  enableReinitialize = true,
  isInitialValid = false,
  onReset,
  validate,
  validateOnBlur = true,
  validateOnChange = true,
  ...rest
}) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={schema ? Object.assign(schema.default(), values) : values}
      onSubmit={(values, formik) => {
        const result = onSubmit(schema ? schema.cast(values) : values, formik);
        if (result && typeof result.then === 'function') {
          result.then(
            () => {
              formik.setSubmitting(false);
            },
            err => {
              formik.setFieldError('*', err);
            }
          );
        }
      }}
      enableReinitialize={enableReinitialize}
      isInitialValid={isInitialValid}
      onReset={onReset}
      validate={validate}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
    >
      {({ errors }) => (
        <BSForm tag={KForm} {...rest}>
          {errors['*'] && <Alert color="danger">{errors['*']}</Alert>}
          {children}
        </BSForm>
      )}
    </Formik>
  );
}
