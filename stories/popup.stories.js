import {storiesOf} from '@storybook/html';
import '../packages/package-selection-popup/src/selection-popup.js';

import PopupReadme from './documentation/popupComponent/popupComponent.md';
import BikePopUp from './documentation/popupComponent/bikePopUp.md';
import PhonePopUp from './documentation/popupComponent/phonePopUp.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components|Pop-Up', module)
.add("Product Selection Popup", () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(PopupReadme) + 
    `</div>`
)
.add("Bike Product Popup", () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(BikePopUp) + 
    `</div>`
)
.add("phone Product Popup", () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(PhonePopUp) + 
    `</div>`
);
