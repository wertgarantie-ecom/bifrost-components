import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';
import '../src/selection-pop-up/selection-pop-up.js';

storiesOf('Components|Pop-Up', module)
.add("Popup default", () => `
    <wertgarantie-selection-pop-up id="selection"
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/dummyPolicies"
        data-device-id="1234"
        data-device-price="12">

        <wertgarantie-rating class="default"
            data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/rating"
            data-show-rating-number="false"
            slot="wertgarantie-rating-component">
        </wertgarantie-rating>
    </wertgarantie-selection-pop-up>
    `);