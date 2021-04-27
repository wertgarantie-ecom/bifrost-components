import {storiesOf} from '@storybook/html';

import demoShopReadme from './documentation/demoShop/demoShop.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Demo Shop/Demo Shop', module)
.add("Shop Info", () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(demoShopReadme) + 
    `</div>`
);
