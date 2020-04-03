import {storiesOf} from '@storybook/html';
import '../packages/package-landing-page/dist/landing-page.min.js';

import landingPageReadme from './documentation/landingPage/landingPage.md';
import landingPageStylingExample from './documentation/landingPage/landingPageStylingExample.md';
import landingPageRaw from './documentation/landingPage/landingPageRaw.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components|Landing-Page', module)
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
    .add("Landing Page raw", () =>
        `<div class="markdown-body">` +
        converter.makeHtml(landingPageRaw) +
        `</div>`
    );
