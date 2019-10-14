import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';
import ratingComponentWithDefaultValues from './documentation/ratingComponent/ratingComponentWithDefaultValues.md';
import ratingComponentWithoutRatingNumber from './documentation/ratingComponent/ratingComponentWithoutRatingNumber.md';
import ratingComponentWithFetchedValues from './documentation/ratingComponent/ratingComponentWithFetchedValues.md';
import ratingComponentWithExternalStyling from './documentation/ratingComponent/ratingComponentWithExternalStyling.md';

storiesOf('Components|Rating', module)
.add('base component with default values', () => 
    `<wertgarantie-rating    
                        data-text="9999 Google Rezensionen"
                        data-uri="http://example.com" 
                        data-rating="4.7">
    </wertgarantie-rating>`, { 
        notes: { markdown: ratingComponentWithDefaultValues },
    })
.add('base component without rating number', () => 
    `<wertgarantie-rating data-show-rating-number="false" 
                          data-text="9999 Google Rezensionen"
                          data-uri="http://example.com" 
                          data-rating="4.7">
    </wertgarantie-rating>`, { 
        notes: { markdown: ratingComponentWithoutRatingNumber },
    })
.add('with fetched values', () => 
    `<wertgarantie-rating data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating">
    </wertgarantie-rating>`, { 
        notes: { markdown: ratingComponentWithFetchedValues },
    })
.add('with external styling', () => 
    `<wertgarantie-rating   data-text="9999 Google Rezensionen"
                            data-uri="http://example.com"
                            data-rating="4.5"
                            class="mobilcom-wg-rating-theme">
    </wertgarantie-rating>`, { 
        notes: { markdown: ratingComponentWithExternalStyling },
    });