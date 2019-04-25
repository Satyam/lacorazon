import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

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
  asyncJest: true, // this is the option that activates the async behaviour
  test: ({
    story,
    context,
    done // --> callback passed to test method when asyncJest option is true
  }) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);
    const storyElement = story.render(context);

    const tree = mount(storyElement);
    const waitTime = 1;
    setTimeout(() => {
      if (snapshotFilename) {
        expect(toJson(tree.update())).toMatchSpecificSnapshot(snapshotFilename);
      }
      done();
    }, waitTime);
  }
  // other options here
});
