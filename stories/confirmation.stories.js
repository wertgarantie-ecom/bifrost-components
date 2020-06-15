import {storiesOf} from '@storybook/html';
import '../packages/package-confirmation/dist/confirmation.min.js';

import bikeConfirmationReadme from './documentation/confirmationComponent/bikeConfirmation.md';
import phoneConfirmationReadme from './documentation/confirmationComponent/phoneConfirmation.md';
import confirmationStylingExamples from './documentation/confirmationComponent/confirmationStylingExamples.md'

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components|Confirmation', module)
    .add("Confirmation component phone shop", () =>
        `<div class="markdown-body">` +
        converter.makeHtml(phoneConfirmationReadme) +
        `</div>`
    )
    .add("Confirmation component bike shop", () =>
        `<div class="markdown-body">` +
        converter.makeHtml(bikeConfirmationReadme) +
        `</div>`
    )
    .add("Confirmation styling examples", () =>
        `<div class="markdown-body">` +
        converter.makeHtml(confirmationStylingExamples) +
        `</div>`
    );
