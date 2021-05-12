import {storiesOf} from '@storybook/html';
// import '../packages/package-rating/dist/rating.min.js';
// import '../packages/package-selection-embedded/dist/selection-embedded.min';
import selectionEmbeddedPhone from './_selectionEmbeddedPhone.md';
import selectionEmbeddedBike from './_selectionEmbeddedBike.md';

import showdown from 'showdown';

showdown.setFlavor('github');
var converter = new showdown.Converter();

storiesOf('2.Components/Embedded Selection', module)
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
