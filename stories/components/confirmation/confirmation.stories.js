import {storiesOf} from '@storybook/html';
import '../../../packages/package-confirmation/dist/confirmation.min.js';
import bikeConfirmationReadme from './_bikeConfirmation.md';
import phoneConfirmationReadme from './_phoneConfirmation.md';
import confirmationStylingExamples from './_confirmationStylingExamples.md'
import styling from './_styling.md'
import showdown from 'showdown';

showdown.setFlavor('github');
const converter = new showdown.Converter();

// export default {
//     title: '2.Components/Confirmation'
// }

// export const Setup = () => `<div class="markdown-body">${converter.makeHtml(RatingReadme)}</div>`


storiesOf('2.Components/Confirmation', module)
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
