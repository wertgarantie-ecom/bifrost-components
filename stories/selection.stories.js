import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';
import '../src/policy-selection/policy-selection.js';
import selectionComponent from './documentation/selectionComponent/selectionComponent.md';

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
        