import React, { useContext } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DateField from './DateField';
import Form from './Form';
import SubmitButton from './SubmitButton';
import { FormikConsumer } from 'formik';
import * as Yup from 'yup';

function useFormik() {
  return useContext(FormikConsumer._context);
}

function SetFieldError({ name, message }) {
  const { setFieldError, errors } = useFormik();
  if (errors[name] !== message) {
    setFieldError(name, message);
  }
  return null;
}

function TouchField({ name }) {
  const { setFieldTouched, touched } = useFormik();
  if (!touched[name]) {
    setFieldTouched(name, true, false);
  }
  return null;
}

const schema = Yup.object().shape({
  three: Yup.date()
});

storiesOf('Form/DateField', module)
  .add('name, no label', () => (
    <Form
      values={{
        one: new Date()
      }}
    >
      <DateField name="one" />
    </Form>
  ))
  .add('label and name', () => (
    <Form
      values={{
        two: new Date()
      }}
    >
      <DateField label="field two" name="two" />
    </Form>
  ))
  .add('label, name and help', () => (
    <Form
      values={{
        three: new Date()
      }}
    >
      <DateField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
    </Form>
  ))
  .add('label, name, help plus touched', () => (
    <Form
      values={{
        three: new Date()
      }}
    >
      <TouchField name="three" />
      <DateField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
    </Form>
  ))
  .add('label, name, help plus error', () => (
    <Form
      values={{
        three: new Date()
      }}
    >
      <TouchField name="three" />
      <SetFieldError name="three" message="some error message" />
      <DateField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
    </Form>
  ))
  .add('validate via schema', () => (
    <Form
      values={{
        three: new Date()
      }}
      schema={schema}
      onSubmit={action('validate via schema')}
    >
      <DateField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
      <SubmitButton>Accept</SubmitButton>
    </Form>
  ))
  .add('Passing a format for dates', () => (
    <Form
      values={{
        three: new Date()
      }}
      schema={schema}
      onSubmit={action('validate via schema')}
    >
      <DateField
        label="Field 3"
        name="three"
        help="A little help from my friends"
        dateFormat="yyyy/MM/dd"
      />
      <SubmitButton>Accept</SubmitButton>
    </Form>
  ));
