import React, { useContext, useState } from 'react';

import { storiesOf } from '@storybook/react';

import { FormikConsumer } from 'formik';

import Form from './Form';

function useFormik() {
  return useContext(FormikConsumer._context);
}

function ForceValidate() {
  const [done, setDone] = useState(false);
  if (done) return null;
  const { validateForm } = useFormik();
  validateForm();
  setDone(true);
  return null;
}

function ForceSubmit() {
  const [done, setDone] = useState(false);
  if (done) return null;
  const { submitForm } = useFormik();
  submitForm();
  setDone(true);
  return null;
}

storiesOf('Form/Form', module)
  .add('no attributes', () => <Form />)
  .add('with some child', () => <Form>Hello</Form>)
  .add('with error', () => (
    <Form
      isInitialValid={false}
      validate={() => ({ '*': 'some made-up error' })}
      values={{}}
    >
      <ForceValidate />
    </Form>
  ))
  .add('with rejected promise validation', () => (
    <Form
      isInitialValid={false}
      onSubmit={() => Promise.reject('some made-up error')}
      values={{}}
    >
      <ForceSubmit />
    </Form>
  ));
