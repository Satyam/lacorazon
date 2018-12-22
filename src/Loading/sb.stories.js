import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Loading from './';

storiesOf('Loading', module)
  .add('no title', () => <Loading />)
  .add('With Title', () => <Loading title="With Title" />)
  .add('title and body', () => <Loading title="With Title">Body</Loading>)
  .add('title and body, no icon', () => (
    <Loading title="With Title" noIcon>
      Body
    </Loading>
  ))
  .add('not open', () => (
    <Loading title="With Title" isOpen={false}>
      Body
    </Loading>
  ));
