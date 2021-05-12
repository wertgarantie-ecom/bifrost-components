import {storiesOf} from '@storybook/html';
// import '../packages/package-landing-page/dist/landing-page.min.js';

import landingPageReadme from './_landingPage.md';
import landingPageStylingExample from './_landingPageStylingExample.md';
import landingPageRaw from './_landingPageRaw.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('2.Components/Landing-Page', module)
    .add("Landing Page general", () =>
        `<div class="markdown-body">` +
        converter.makeHtml(landingPageReadme) +
        `</div>`
    )
    .add("Landing Page Styling Example", () =>
        `<div class="markdown-body">` +
        converter.makeHtml(landingPageStylingExample) +
        `</div>`
    )
    .add("Example", () =>
        `<div class="markdown-body">` +
        converter.makeHtml(landingPageRaw) +
        `</div>`
    );
