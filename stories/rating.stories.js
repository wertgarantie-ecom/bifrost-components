import {storiesOf} from '@storybook/html';

import RatingReadme from '../packages/package-rating/README.md';

import showdown from 'showdown';
showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components|Rating', module)
.add('Google Rating Component', () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(RatingReadme) + 
    `</div>`
);
