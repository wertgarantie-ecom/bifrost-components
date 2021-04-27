import {storiesOf} from '@storybook/html';
// import '../packages/package-after-sales/dist/after-sales.min';

import afterSalesDocumentation from './documentation/after-sales/afterSalesDoc.md';
import afterSalesStylingExample from './documentation/after-sales/afterSalesStylingExample.md';

import showdown from 'showdown';

showdown.setFlavor('github');

var converter = new showdown.Converter();

storiesOf('Components/After Sales', module)
    .add("After Sales general", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(afterSalesDocumentation) +
        `</div>`
    )
    .add("After Sales Styling Example", () =>
        `<div class="markdown-body">` +
            converter.makeHtml(afterSalesStylingExample) +
        `</div>`
    );
