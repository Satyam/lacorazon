import React from 'react';
import { Form as BSForm, Alert } from 'reactstrap';
import { Formik, Form as KForm } from 'formik';

export default function Form({
  initialValues,
  schema,
  values,
  onSubmit,
  children,
  ...rest
}) {
  return (
    <Formik
      enableReinitialize={true}
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
      {...rest}
    >
      {({ errors }) => (
        <BSForm tag={KForm}>
          {errors['*'] && <Alert color="danger">{errors['*']}</Alert>}
          {children}
        </BSForm>
      )}
    </Formik>
  );
}
