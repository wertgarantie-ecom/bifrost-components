import {storiesOf} from '@storybook/html';
import '../packages/package-rating/src/rating.js';
import '../packages/package-selection-popup/src/selection-popup.js';
import './displayPopUp.js';

// data-fetch-uri="http://localhost:3000/wertgarantie/dummyPolicies"
// data-fetch-uri="http://localhost:3000/wertgarantie/rating"
storiesOf('Components|Pop-Up', module)
.add("Popup default", () => `
<wertgarantie-selection-pop-up id="selection"
        data-fetch-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie/dummyPolicies"
        data-device-class="1dfd4549-9bdc-4285-9047-e5088272dade"
        data-device-price="800">
    </wertgarantie-selection-pop-up>
    `);