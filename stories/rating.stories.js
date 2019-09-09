import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';

storiesOf('Components|Rating', module)
    .add('dummy-values', () => '<wertgarantie-rating data-text="9999 Google Rezensionen" data-url="http://example.com" data-rating="3.5"></wertgarantie-rating>')
    .add('fetched-values', () => '<wertgarantie-rating></wertgarantie-rating>')
    .add('with-imported-css', () => '<wertgarantie-rating data-text="9999 Google Rezensionen" data-url="http://example.com" data-rating="3.5" data-wg-rating-style="rating.css"></wertgarantie-rating>');