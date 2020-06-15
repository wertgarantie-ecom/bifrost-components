import {storiesOf} from '@storybook/html';
import '../packages/package-selection-popup/dist/selection-popup.min.js';

import PopupReadme from './documentation/popupComponent/popupComponent.md';
import BikePopUp from './documentation/popupComponent/bikePopUp.md';
import PhonePopUp from './documentation/popupComponent/phonePopUp.md';
import PopUpStylingExample from './documentation/popupComponent/popUpStylingExample.md';

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
)
.add("Popup Styling Example", () =>
    `<div class="markdown-body">` +
        converter.makeHtml(PopUpStylingExample) +
    `</div>`
);
