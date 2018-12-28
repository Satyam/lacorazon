import React, { useContext } from 'react';
import { FormGroup, Label, FormFeedback, FormText, Col } from 'reactstrap';
import { Field as KField, FormikConsumer, ErrorMessage } from 'formik';
import classNames from 'classnames';

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
  if (process.env.NODE_ENV !== 'production' && !name) {
    throw new Error('TextField: name argument is mandatory');
  }
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
          className={classNames('form-control', {
            'is-invalid': error && touched[name]
          })}
          rows={rows}
          name={name}
          id={name}
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
