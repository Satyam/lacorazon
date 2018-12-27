import React from 'react';

import { storiesOf } from '@storybook/react';

import LabeledText from './LabeledText';

storiesOf('Form/LabeledText', module)
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
