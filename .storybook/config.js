import { configure } from '@storybook/html';

// automatically import all files ending in *.stories.js
const loaderFn = () => [
  require('../stories/about.stories'),
  require('../stories/popup.stories'),
  require('../stories/confirmation.stories'),
  require('../stories/after-sales.stories'),
  require('../stories/rating.stories'),
  require('../stories/landing-page.stories'),
  require('../stories/demoshop.stories')
];

configure(loaderFn, module);
