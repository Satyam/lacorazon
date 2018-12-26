import React from 'react';

import { storiesOf } from '@storybook/react';

import TextField from './TextField';
import Form from './Form';

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
      <Form
        values={{
          one: 1,
          two: 2,
          multi: "I'm a child\nspread over\na few lines"
        }}
        style={{ backgroundColor: 'white' }}
      >
        {story()}
      </Form>
    </div>
  ))
  .add('no props', () => <TextField />)
  .add('label, no name', () => <TextField label="Some label" />)
  .add('name, no label', () => <TextField name="one" />)
  .add('label and name', () => <TextField label="Some label" name="two" />)
  .add('label and value', () => (
    <TextField label="Some label" value="Some value" />
  ))
  .add('label and pre-formated value in multi-row field', () => (
    <TextField label="Some label" rows={5} name="multi" />
  ))
  .add('label, name and help', () => (
    <TextField
      label="Some label"
      name="two"
      help="A little help from my friends"
    />
  ));
