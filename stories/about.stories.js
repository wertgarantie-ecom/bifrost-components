import {storiesOf} from '@storybook/html';

import handbook from './documentation/about/handbook.md';
import handbookInitializer from './documentation/about/handbookInitializer.md';
import about from './documentation/about/about.md';
import email from './documentation/about/email.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('About|About', module)
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
storiesOf('About|Content', module)
    .add("Email", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(email) +
        `</div>`
    );
