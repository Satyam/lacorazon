import React from 'react';

import { storiesOf } from '@storybook/react';

import Loading from './';

storiesOf('Loading', module)
  .add('no title', () => (<Loading fade={false} />))
  .add('With Title', () => (<Loading fade={false} title="With Title" />))
  .add('title and body', () => (
    <Loading fade={false} title="With Title">
      Body
    </Loading>
  ))
  .add('title and body, no icon', () => (
    <Loading fade={false} title="With Title" noIcon>
      Body
    </Loading>
  ))
  .add('not open', () => (
    <Loading fade={false} title="With Title" isOpen={false}>
      Body
    </Loading>
  ));
