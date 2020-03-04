import {storiesOf} from '@storybook/html';
import '../packages/package-rating/dist/rating.min.js';

import RatingReadme from './documentation/ratingComponent/ratingComponent.md';

import showdown from 'showdown';
showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components|Rating', module)
.add('Google Rating Component', () => 
    `<div class="markdown-body">` + 
        converter.makeHtml(RatingReadme) + 
    `</div>`
);
