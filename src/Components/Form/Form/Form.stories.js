import React, { useContext, useState } from 'react';

import { storiesOf } from '@storybook/react';

import { FormikConsumer } from 'formik';

import Form from '.';
import styles from './styles.module.css';

function useFormik() {
  return useContext(FormikConsumer._context);
}

function ForceValidate() {
  const [done, setDone] = useState(false);
  const { validateForm } = useFormik();
  if (done) return null;
  validateForm();
  setDone(true);
  return null;
}

function ForceSubmit() {
  const [done, setDone] = useState(false);
  const { submitForm } = useFormik();
  if (done) return null;
  submitForm();
  setDone(true);
  return null;
}

storiesOf('Form/Form', module)
  .add('no attributes', () => <Form />)
  .add('with some child', () => <Form>Hello</Form>)
  .add('with some border and child', () => (
    <Form className={styles['form-border']}>Hello</Form>
  ))
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
