import { storiesOf } from '@storybook/html';
import '../components/rating/rating.js';

const rating = '<wg-rating></wg-rating>';

storiesOf('Components|Rating', module)
    .add('dummy-values', () => '<wg-rating dummy-text="9999 Google Rezensionen" dummy-uri="example.com" dummy-rating="3.5"></wg-rating>')
    .add('fetched-values', () => '<wg-rating></wg-rating>');