import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  ButtonIconAdd,
  ButtonIconDelete,
  ButtonIconCalendar,
  ButtonIconCheck,
  ButtonIconEdit,
  ButtonIconNotCheck,
  ButtonSet,
  IconAdd,
  IconDelete,
  IconCalendar,
  IconCheck,
  IconEdit,
  IconNotCheck,
  IconStop,
  IconWarning
} from './';

storiesOf('Icons/ButtonIconAdd', module)
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
  ))
  .add('no Text', () => <ButtonIconAdd />);

storiesOf('Icons/IconAdd', module)
  .add('Plain', () => <IconAdd onClick={action('clicked')} />)
  .add('Button', () => <IconAdd button onClick={action('clicked')} />)
  .add('Button disabled', () => (
    <IconAdd button disabled onClick={action('clicked')} />
  ));

storiesOf('Icons/ButtonSet', module)
  .add('buttons', () => (
    <ButtonSet>
      <ButtonIconAdd onClick={action('add')}>Add</ButtonIconAdd>
      <ButtonIconDelete onClick={action('delete')}>Delete</ButtonIconDelete>
      <ButtonIconEdit onClick={action('Edit')}>Edit</ButtonIconEdit>
      <ButtonIconCalendar onClick={action('calendar')}>
        Calendar
      </ButtonIconCalendar>
      <ButtonIconCheck onClick={action('check')}>Check</ButtonIconCheck>
      <ButtonIconNotCheck onClick={action('not check')}>
        NotCheck
      </ButtonIconNotCheck>
    </ButtonSet>
  ))
  .add('small buttons', () => (
    <ButtonSet size="sm">
      <ButtonIconAdd onClick={action('add')}>Add</ButtonIconAdd>
      <ButtonIconDelete onClick={action('delete')}>Delete</ButtonIconDelete>
      <ButtonIconEdit onClick={action('Edit')}>Edit</ButtonIconEdit>
      <ButtonIconCalendar onClick={action('calendar')}>
        Calendar
      </ButtonIconCalendar>
      <ButtonIconCheck onClick={action('check')}>Check</ButtonIconCheck>
      <ButtonIconNotCheck onClick={action('not check')}>
        NotCheck
      </ButtonIconNotCheck>
    </ButtonSet>
  ))
  .add('icons', () => (
    <div>
      <IconAdd style={{ margin: '1em' }} />
      <IconDelete style={{ margin: '1em' }} />
      <IconEdit style={{ margin: '1em' }} />
      <IconCalendar style={{ margin: '1em' }} />
      <IconCheck style={{ margin: '1em' }} />
      <IconNotCheck style={{ margin: '1em' }} />
      <IconWarning style={{ margin: '1em' }} />
      <IconStop style={{ margin: '1em' }} />
    </div>
  ));
