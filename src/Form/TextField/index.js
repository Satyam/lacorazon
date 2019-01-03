import React, { useContext, useState } from 'react';
import { FormGroup, Label, FormFeedback, FormText, Col } from 'reactstrap';
import { Field as KField, FormikConsumer, ErrorMessage } from 'formik';
import classNames from 'classnames';

function useFormik() {
  return useContext(FormikConsumer._context);
}

let counter = 0;

export default function TextField({
  name,
  label,
  id,
  rows,
  help,
  validate,
  ...rest
}) {
  if (process.env.NODE_ENV !== 'production' && !name) {
    throw new Error('TextField: name argument is mandatory');
  }
  const { errors, touched, validationSchema } = useFormik();
  const invalid = errors[name] && touched[name];
  const [actualId] = useState(id || `F_TF_${counter}`);
  counter = (counter + 1) % Number.MAX_SAFE_INTEGER;

  return (
    <FormGroup row>
      <Label for={actualId} xs={12} lg={2}>
        {label}
      </Label>
      <Col xs={12} lg={8}>
        <KField
          component={rows ? 'textarea' : 'input'}
          className={classNames('form-control', {
            'is-invalid': invalid
          })}
          rows={rows}
          name={name}
          id={actualId}
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
        <ErrorMessage name={name} component={FormFeedback} />
      </Col>
    </FormGroup>
  );
}
