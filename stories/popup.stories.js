import {storiesOf} from '@storybook/html';
import '../packages/package-rating/src/rating.js';
import '../packages/package-selection-popup/src/selection-popup.js';
import './displayPopUp.js';

import PopupReadme from './documentation/popupComponent/popupComponent.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components|Pop-Up', module)
.add("Product Selection Popup", () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(PopupReadme) + 
    `</div>`
);
