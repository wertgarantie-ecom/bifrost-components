import { storiesOf } from '@storybook/html';
import demoShopReadme from './_demoShop.md';
import showdown from 'showdown';

showdown.setFlavor('github');

const converter = new showdown.Converter();

// storiesOf('Demo Shop/Demo Shop', module)
//     .add("Shop Info", () =>
//         `<div class="markdown-body">` +
//         converter.makeHtml(demoShopReadme) +
//         `</div>`
//     );

export default {
    title: '3.Demo Shop/Readme'
}

export const Setup = () => `<div class="markdown-body">${converter.makeHtml(demoShopReadme)}</div>`