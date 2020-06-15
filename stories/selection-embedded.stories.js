import {storiesOf} from '@storybook/html';
import '../packages/package-rating/dist/rating.min.js';
import 'wertgarantie-selection-embedded/dist/selection-embedded.min';
import selectionEmbeddedPhone from './documentation/selectionEmbedded/selectionEmbeddedPhone.md';
import selectionEmbeddedBike from './documentation/selectionEmbedded/selectionEmbeddedBike.md';

import showdown from 'showdown';
showdown.setFlavor('github');
var converter = new showdown.Converter();

storiesOf('Components|Embedded Selection', module)
.add('Embedded Selection Phone', () => `
    <div class="markdown-body"> 
        ${converter.makeHtml(selectionEmbeddedPhone)}
    </div>`
)
.add('Embedded Selection Bike/E-Bike', () => `
    <div class="markdown-body"> 
        ${converter.makeHtml(selectionEmbeddedBike)}
    </div>`
);
