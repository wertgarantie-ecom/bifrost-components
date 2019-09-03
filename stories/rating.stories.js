import {storiesOf} from '@storybook/html';
import '../public/rating.js';

storiesOf('Components|Rating')
    .add('dummy-values', () => '<wg-rating data-text="9999 Google Rezensionen" data-url="http://example.com" data-rating="3.5" -></wg-rating>')
    .add('fetched-values', () => '<wg-rating></wg-rating>')
    .add('external-stylesheet', () => '<wg-rating styling="./rating.css"></wg-rating>');
