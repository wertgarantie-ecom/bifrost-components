import {storiesOf} from '@storybook/html';
import '../packages/package-rating/dist/rating.min.js';
import 'wertgarantie-selection-embedded/dist/selection-embedded.min';
import selectionEmbedded from './documentation/selectionEmbedded/selectionEmbedded.md';

import showdown from 'showdown';
showdown.setFlavor('github');
var converter = new showdown.Converter();

storiesOf('Components|Embedded Selection', module)
.add('default styling', () => `
    <div class="markdown-body"> 
        ${converter.makeHtml(selectionEmbedded)}
    </div>`
);
