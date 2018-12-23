import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';
// jest.mock('rc-util/lib/Portal');
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faExclamationTriangle,
  faMinusCircle,
  faPlusCircle,
  faExclamationCircle,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTrashAlt,
  faTimesCircle,
  faCheckCircle,
  faEdit,
  faExclamationTriangle,
  faMinusCircle,
  faPlusCircle,
  faExclamationCircle,
  faCalendarAlt
);

initStoryshots({
  /* configuration options */
  test: renderWithOptions({
    // Overwrite the default react test renderer, as it does not support
    // refs and portals, both of which are heavily used by antd
    renderer: mount,
    snapshotSerializers: [createSerializer()]
  })
});
