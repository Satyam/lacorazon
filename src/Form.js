import React, { useContext } from 'react';
import {
  Form as BSForm,
  FormGroup,
  Label,
  FormFeedback,
  FormText,
  Alert,
  Col,
  Button
} from 'reactstrap';
import { Formik, Form as KForm, Field as KField, FormikConsumer } from 'formik';

function useFormik() {
  return useContext(FormikConsumer._context);
}

export function Form({
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

export function TextField({ name, label, rows, help, validate, ...rest }) {
  const { errors, touched, validationSchema } = useFormik();
  const error = errors[name];

  return (
    <FormGroup row>
      <Label for={name} xs={12} lg={2}>
        {label}
      </Label>
      <Col xs={12} lg={8}>
        <KField
          component={rows ? 'textarea' : 'input'}
          className="form-control"
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

export function SubmitButton({ component: Component = Button, ...rest }) {
  const { isSubmitting, isValid, dirty } = useFormik();
  return (
    <Component
      type="submit"
      disabled={isSubmitting || !isValid || !dirty}
      {...rest}
    />
  );
}
