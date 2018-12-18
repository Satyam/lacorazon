import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import { ButtonIconAdd, IconAdd } from '../Icons';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('ButtonIconAdd', module)
  .add('Plain', () => (
    <ButtonIconAdd onClick={action('clicked')}>Agregar</ButtonIconAdd>
  ))
  .add('Outlined', () => (
    <ButtonIconAdd outline onClick={action('clicked')}>
      Agregar
    </ButtonIconAdd>
  ))
  .add('Plain disabled', () => (
    <ButtonIconAdd disabled onClick={action('clicked')}>
      Agregar
    </ButtonIconAdd>
  ))
  .add('Outlined disabled', () => (
    <ButtonIconAdd outline disabled onClick={action('clicked')}>
      Agregar
    </ButtonIconAdd>
  ));

storiesOf('IconAdd', module)
  .add('Plain', () => <IconAdd onClick={action('clicked')} />)
  .add('Button', () => <IconAdd button onClick={action('clicked')} />)
  .add('Button disabled', () => (
    <IconAdd button disabled onClick={action('clicked')} />
  ));
