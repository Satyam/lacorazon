import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';
// jest.mock('rc-util/lib/Portal');
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

initStoryshots({
  /* configuration options */
  test: renderWithOptions({
    // Overwrite the default react test renderer, as it does not support
    // refs and portals, both of which are heavily used by antd
    renderer: mount,
    snapshotSerializers: [createSerializer()]
  })
});
