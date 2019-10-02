import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';
import '../src/policy-selection/policy-selection.js';
import ratingComponentWithDefaultValues from './documentation/ratingComponent/ratingComponentWithDefaultValues.md';
import ratingComponentWithoutRatingNumber from './documentation/ratingComponent/ratingComponentWithoutRatingNumber.md';
import ratingComponentWithFetchedValues from './documentation/ratingComponent/ratingComponentWithFetchedValues.md';
import ratingComponentWithExternalStyling from './documentation/ratingComponent/ratingComponentWithExternalStyling.md';
import selectionComponent from './documentation/selectionComponent/selectionComponent.md';


/* Rating Component */

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
        `<wertgarantie-rating data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/rating">
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


/* Selection Component */

storiesOf('Components|Selection', module)
    .add('default styling', () => ` 
        <wertgarantie-policy-selection
            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponent },
        })
    .add('external styling 1', () => ` 
        <wertgarantie-policy-selection
            class="mobilcom-theme"
            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
            <wertgarantie-rating slot="wertgarantie-rating-component" 
                                 data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/rating"
                                 class="mobilcom-wg-rating-theme"
            >
            </wertgarantie-rating>
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponent },
        })
    .add('external styling 2', () => ` 
        <wertgarantie-policy-selection
            class="jura-theme"
            data-title="Unser <strong>Komplettschutz</strong> für den Schadensfall"
            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
            <wertgarantie-rating slot="wertgarantie-rating-component" 
                                 data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/rating"
                                 data-show-rating-number="false"
                                 class="jura-wg-rating-theme"
            >
            </wertgarantie-rating>
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponent },
        });
        