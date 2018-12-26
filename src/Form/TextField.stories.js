import React, { useContext, useState } from 'react';

import { storiesOf } from '@storybook/react';

import TextField from './TextField';
import Form from './Form';
import { FormikConsumer } from 'formik';

function useFormik() {
  return useContext(FormikConsumer._context);
}

function SetFieldError({ name, message }) {
  const [done, setDone] = useState(false);
  if (done) return null;
  const { setFieldError } = useFormik();
  setFieldError(name, message);
  setDone(true);
  return null;
}

function TouchField({ name }) {
  const [done, setDone] = useState(false);
  if (done) return null;
  const { setFieldTouched, touched } = useFormik();
  setFieldTouched(name, true, false);
  setDone(true);
  console.log(name, touched);
  return null;
}

storiesOf('Form/TextField', module)
  .addDecorator(story => (
    <div
      style={{
        border: 'solid thin silver',
        padding: '1em',
        margin: '1em',
        borderRadius: '0.5em',
        backgroundColor: '#eee'
      }}
    >
      {story()}
    </div>
  ))
  .add('no props', () => (
    <Form values="{no values}">
      <TextField />
    </Form>
  ))
  .add('label, no name', () => (
    <Form values="{no values}">
      <TextField label="Some label" />
    </Form>
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
    <Form values="nothing">
      <TextField label="Raw value" value="Some value" />
    </Form>
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
      <SetFieldError name="three" message="some error message" />
      <TextField
        label="Field 3"
        name="three"
        help="A little help from my friends"
      />
    </Form>
  ));
