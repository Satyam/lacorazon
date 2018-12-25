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
      initialValues={Object.assign(schema.default(), values)}
      onSubmit={(values, formik) => onSubmit(schema.cast(values), formik)}
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
