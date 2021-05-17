import showdown from 'showdown';
import email from './_email.md';

showdown.setFlavor('github');
const converter = new showdown.Converter();

export default {
    title: '1.Intro/Content'
}

export const EMail = () => `<div class="markdown-body">${converter.makeHtml(email)}</div>`;

EMail.storyName = "E-Mail"