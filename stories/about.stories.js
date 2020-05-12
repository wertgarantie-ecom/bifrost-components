import {storiesOf} from '@storybook/html';

import handbook from './documentation/about/handbook.md';
import about from './documentation/about/about.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('About|About', module)
    .add("Overview", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(about) +
        `</div>`
    )
    .add("Handbook", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(handbook) +
        `</div>`
);
