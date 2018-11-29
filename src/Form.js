import React from 'react';
import {
  Form as BSForm,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Alert,
  Col
} from 'reactstrap';
import { Formik, Form as KForm, Field as KField, connect } from 'formik';

export function Form({
  initialValues,
  schema,
  values,
  onSubmit,
  children,
  ...rest
}) {
  console.log('------------------');
  return (
    <Formik
      enableReinitialize={true}
      isInitialValid={true}
      validationSchema={schema}
      initialValues={Object.assign(schema.default(), values)}
      onSubmit={(values, formik) => {
        debugger;
        return onSubmit(schema.cast(values), formik);
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

function MyTextField({
  formik: { errors, touched, validationSchema },
  name,
  label,
  rows,
  help,
  validate,
  ...rest
}) {
  const error = errors[name];
  return (
    <FormGroup row>
      <Label for={name} xs={12} lg={2}>
        {label}
      </Label>
      <Col xs={12} lg={8}>
        <Input
          tag={KField}
          type={rows ? 'textarea' : 'text'}
          rows={rows}
          name={name}
          id={name}
          invalid={error && touched[name]}
          validate={
            validate
              ? value => validate(validationSchema.fields[name].cast(value))
              : void 0
          }
          {...rest}
        />
        <FormFeedback>{error}</FormFeedback>
        {help && <FormText>{help}</FormText>}
      </Col>
    </FormGroup>
  );
}

export const TextField = connect(MyTextField);
