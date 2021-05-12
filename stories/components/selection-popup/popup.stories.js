import {storiesOf} from '@storybook/html';
// import '../packages/package-selection-popup/dist/selection-popup.min.js';

import PopupReadme from './_popupComponent.md';
import BikePopUp from './_bikePopUp.md';
import PhonePopUp from './_phonePopUp.md';
import PopUpStylingExample from './_popUpStylingExample.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('2.Components/Pop-Up', module)
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
