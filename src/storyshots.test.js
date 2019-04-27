import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';

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
  faCalendarAlt,
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
  storyKindRegex: /^((?!.*?Loading).)*$/,
  test: multiSnapshotWithOptions({}),
});
