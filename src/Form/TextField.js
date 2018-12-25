import React, { useContext } from 'react';
import { FormGroup, Label, FormFeedback, FormText, Col } from 'reactstrap';
import { Field as KField, FormikConsumer } from 'formik';

function useFormik() {
  return useContext(FormikConsumer._context);
}

export default function TextField({
  name,
  label,
  rows,
  help,
  validate,
  ...rest
}) {
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
