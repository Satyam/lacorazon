import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback, FormText, Col } from 'reactstrap';
import { Field as KField, FormikConsumer, ErrorMessage } from 'formik';
import classNames from 'classnames';
import invariant from 'invariant';

function useFormik() {
  return useContext(FormikConsumer._context);
}

let counter = 0;
/**
 * Produces a labeled input box within form
 */
export default function TextField({
  name,
  label,
  id,
  rows,
  help,
  validate,
  ...rest
}) {
  invariant(name, 'TextField: name argument is mandatory');

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
            'is-invalid': invalid,
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

TextField.propTypes = {
  /**
   * Name of the field this component is to show or edit.
   * It should match the key of one of the values in the
   * enclosing [`Form`](#form) `values` property.
   */
  name: PropTypes.string.isRequired,
  /**
   * The label to be shown to the user along the input box
   */
  label: PropTypes.string,
  /**
   * An optional `id` attribute.
   * If none is provided, the component will generate a unique one
   * so the `<label for="inputId">` element can match it
   */
  id: PropTypes.string,
  /**
   * If provided, a `<textarea>` will be produced with as many rows
   * as given, instead of a regular `<input>`box
   */
  rows: PropTypes.number,
  /**
   * An optional help text to be shown below the input field
   */
  help: PropTypes.string,
  /**
   * A validation function.
   * It will be called with the value of the field and
   * it should return a text with an error message, if any,
   * or nothing if Ok.
   */
  validate: PropTypes.func,
  /**
   * Any other properties will be passed on to the `<input>` or `<textarea>` elements
   */
  '...rest': PropTypes.object,
};
