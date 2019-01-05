import React, { useContext } from 'react';

import { storiesOf } from '@storybook/react';
import { decorate } from '@storybook/addon-actions';

import SubmitButton from '.';
import Form from '../Form';
import { FormikConsumer } from 'formik';

// next one cannot be execute in batch mode test
/* istanbul ignore next */
const firstArg = decorate([args => args.slice(0, 1)]);

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

function ChangeField({ name, value }) {
  const { setFieldValue, setFieldTouched, values, touched } = useFormik();
  if (values[name] !== value) {
    setFieldValue(name, value, false);
  }
  if (!touched[name]) {
    setFieldTouched(name, true, false);
  }
  return null;
}

function SetSubmitting() {
  const { setSubmitting, isSubmitting } = useFormik();
  if (!isSubmitting) {
    setSubmitting(true);
  }
  return null;
}

storiesOf('Form/SubmitButton', module)
  .add('no props, nothing dirty to submit', () => (
    <Form onSubmit={firstArg.action('submit')}>
      <SubmitButton />
    </Form>
  ))
  .add('with label, nothing dirty to submit', () => (
    <Form onSubmit={firstArg.action('submit')}>
      <SubmitButton>Submit</SubmitButton>
    </Form>
  ))
  .add('with label, something dirty to submit', () => (
    <Form
      values={{ one: 1 }}
      isInitialValid={true}
      onSubmit={firstArg.action('submit')}
    >
      <ChangeField name="one" value={2} />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  ))
  .add('with label, something dirty to submit, isSubmitting true', () => (
    <Form
      values={{ one: 1 }}
      isInitialValid={true}
      onSubmit={firstArg.action('submit')}
    >
      <ChangeField name="one" value={2} />
      <SetSubmitting />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  ))
  .add('with label, with error', () => (
    <Form
      values={{ one: 1 }}
      isInitialValid={true}
      onSubmit={firstArg.action('submit')}
    >
      <ChangeField name="one" value={2} />
      <SetFieldError name="one" message="it won't show" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  ));
