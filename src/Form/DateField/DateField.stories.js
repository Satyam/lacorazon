import React, { useContext } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DateField from './';
import Form from '../Form';
import SubmitButton from '../SubmitButton';
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
        one: new Date(2019, 2, 3)
      }}
    >
      <DateField name="one" />
    </Form>
  ))
  .add('label and name', () => (
    <Form
      values={{
        two: new Date(2019, 2, 3)
      }}
    >
      <DateField label="field two" name="two" />
    </Form>
  ))
  .add('label, name and help', () => (
    <Form
      values={{
        three: new Date(2019, 2, 3)
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
        three: new Date(2019, 2, 3)
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
        three: new Date(2019, 2, 3)
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
        three: new Date(2019, 2, 3)
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
        three: new Date(2019, 2, 3)
      }}
      schema={schema}
      onSubmit={action('Whatever the format, always a date')}
    >
      <DateField
        label="Field 3"
        name="three"
        help="A little help from my friends"
        dateFormat="yyyy/MM/dd"
      />
      <SubmitButton>Accept</SubmitButton>
    </Form>
  ))
  .add('validation schema with min date', () => {
    const schema = Yup.object().shape({
      three: Yup.date().min(new Date(2019, 5, 10))
    });
    return (
      <Form
        values={{
          three: new Date(2019, 5, 15)
        }}
        schema={schema}
        onSubmit={action('Only enabled dates')}
      >
        <DateField
          label="Field 3"
          name="three"
          help="should disable dates prior to may 10th"
        />
        <SubmitButton>Accept</SubmitButton>
      </Form>
    );
  })
  .add('validation schema with max date', () => {
    const schema = Yup.object().shape({
      three: Yup.date().max(new Date(2019, 5, 20))
    });
    return (
      <Form
        values={{
          three: new Date(2019, 5, 15)
        }}
        schema={schema}
        onSubmit={action('Only enabled dates')}
      >
        <DateField
          label="Field 3"
          name="three"
          help="should disable dates after may 20th"
        />
        <SubmitButton>Accept</SubmitButton>
      </Form>
    );
  })
  .add('validation schema with min and max date', () => {
    const schema = Yup.object().shape({
      three: Yup.date()
        .min(new Date(2019, 5, 10))
        .max(new Date(2019, 5, 20))
    });
    return (
      <Form
        values={{
          three: new Date(2019, 5, 15)
        }}
        schema={schema}
        onSubmit={action('Only enabled dates')}
      >
        <DateField
          label="Field 3"
          name="three"
          help="should disable dates prior to may 10th or  after may 20th"
        />
        <SubmitButton>Accept</SubmitButton>
      </Form>
    );
  })
  .add('explicit minDate and maxDate properties should override schema', () => {
    const schema = Yup.object().shape({
      three: Yup.date()
        .min(new Date(2019, 5, 10))
        .max(new Date(2019, 5, 20))
    });
    return (
      <Form
        values={{
          three: new Date(2019, 5, 15)
        }}
        schema={schema}
        onSubmit={action('Only enabled dates')}
      >
        <DateField
          label="Field 3"
          name="three"
          minDate={new Date(2019, 5, 13)}
          maxDate={new Date(2019, 5, 17)}
          help="should disable dates prior to may 13th or  after may 17th"
        />
        <SubmitButton>Accept</SubmitButton>
      </Form>
    );
  });
