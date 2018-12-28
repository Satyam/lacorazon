import React, { useContext, Component } from 'react';

import { storiesOf } from '@storybook/react';

import TextField from './TextField';
import Form from './Form';
import { FormikConsumer } from 'formik';

function useFormik() {
  return useContext(FormikConsumer._context);
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Property `name` is mandatory for TextField .</h1>;
    }

    return this.props.children;
  }
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

storiesOf('Form/TextField', module)
  .add('no props', () => (
    <ErrorBoundary>
      <Form values="{no values}">
        <TextField />
      </Form>
    </ErrorBoundary>
  ))
  .add('label, no name', () => (
    <ErrorBoundary>
      <Form values="{no values}">
        <TextField label="Some label" />
      </Form>
    </ErrorBoundary>
  ))
  .add('name, no label', () => (
    <Form
      values={{
        one: 1
      }}
    >
      <TextField name="one" />
    </Form>
  ))
  .add('label and name', () => (
    <Form
      values={{
        two: 2
      }}
    >
      <TextField label="field two" name="two" />
    </Form>
  ))
  .add('label and value', () => (
    <ErrorBoundary>
      <Form values="nothing">
        <TextField label="Raw value" value="Some value" />
      </Form>
    </ErrorBoundary>
  ))
  .add('label and pre-formated value in multi-row field', () => (
    <Form
      values={{
        multi: "I'm a child\nspread over\na few lines"
      }}
    >
      <TextField label="multi-line field" rows={5} name="multi" />
    </Form>
  ))
  .add('label, name and help', () => (
    <Form
      values={{
        three: 3
      }}
    >
      <TextField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
    </Form>
  ))
  .add('label, name, help plus touched', () => (
    <Form
      values={{
        three: 3
      }}
    >
      <TouchField name="three" />
      <TextField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
    </Form>
  ))
  .add('label, name, help plus error', () => (
    <Form
      values={{
        three: 3
      }}
    >
      <TouchField name="three" />
      <SetFieldError name="three" message="some error message" />
      <TextField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
    </Form>
  ));
