import {storiesOf} from '@storybook/html';
import '../packages/package-confirmation/src/confirmation.js';

// import PopupReadme from './documentation/popupComponent/popupComponent.md';

// import showdown from 'showdown';

// showdown.setFlavor('github');

// var converter = new showdown.Converter();

storiesOf('Components|Confirmation', module)
.add("Confirmation component with static data", () => 
    `<wertgarantie-confirmation></wertgarantie-confirmation>`
);
