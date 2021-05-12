import {storiesOf} from '@storybook/html';

import handbook from './_handbook.md';
import handbookInitializer from './_handbookInitializer.md';
import about from './_about.md';
import email from './_email.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('1.About/About', module)
    .add("Overview", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(about) +
        `</div>`
    )
    .add("Handbuch zur manuelle Einbindung der Komponenten", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(handbook) +
        `</div>`
    )
    .add("Handbuch zur dynamischen Einbindung der Komponenten mit dem Wertgarantie-Initializer", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(handbookInitializer) +
        `</div>`
    );
storiesOf('1.About/Content', module)
    .add("Email", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(email) +
        `</div>`
    );
