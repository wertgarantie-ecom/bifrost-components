import {storiesOf} from '@storybook/html';
import '../packages/package-confirmation/src/confirmation.js';

import bikeConfirmationReadme from './documentation/confirmationComponent/bikeConfirmation.md';
import phoneConfirmationReadme from './documentation/confirmationComponent/phoneConfirmation.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components|Confirmation', module)
.add("Confirmation component bike shop", () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(bikeConfirmationReadme) + 
    `</div>`
)
.add("Confirmation component phone shop", () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(phoneConfirmationReadme) + 
    `</div>`
);
