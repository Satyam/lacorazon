import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ButtonIconAdd, IconAdd } from './';

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
