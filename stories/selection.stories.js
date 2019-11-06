import {storiesOf} from '@storybook/html';
import '../packages/package-rating/src/rating.js';
import '../packages/package-selection-embedded/src/selection-embedded.js';
import selectionComponent from './documentation/selectionComponent/selectionComponent.md';

/* Selection Component */

storiesOf('Components|Selection', module)
    .add('default styling', () => ` 
        <wertgarantie-policy-selection
            data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponent },
        })
    .add('external styling 1', () => ` 
        <wertgarantie-policy-selection
            class="example-theme1"
            data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
            <wertgarantie-rating slot="wertgarantie-rating-component" 
                                 data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
                                 class="wg-rating-theme1"
            >
            </wertgarantie-rating>
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponent },
        })
    .add('external styling 2', () => ` 
        <wertgarantie-policy-selection
            class="example-theme2"
            data-title="Unser <strong>Komplettschutz</strong> für den Schadensfall"
            data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
            <wertgarantie-rating slot="wertgarantie-rating-component" 
                                 data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
                                 data-show-rating-number="false"
                                 class="wg-rating-theme2"
            >
            </wertgarantie-rating>
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponent },
        });
        