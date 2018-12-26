import React from 'react';

import { storiesOf } from '@storybook/react';

import LabeledText from './LabeledText';

storiesOf('Form/LabeledText', module)
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
      <div style={{ backgroundColor: 'white' }}>{story()}</div>
    </div>
  ))
  .add('no props', () => <LabeledText />)
  .add('label, no value', () => <LabeledText label="Some label" />)
  .add('value, no label', () => <LabeledText value="some value" />)
  .add('label and value', () => (
    <LabeledText label="Some label" value="Some value" />
  ))
  .add('label and children', () => (
    <LabeledText label="Some label">I'm a child</LabeledText>
  ))
  .add('label and pre-formated children', () => (
    <LabeledText label="Some label" pre>
      {"I'm a child\nspread over\na few lines"}
    </LabeledText>
  ));
