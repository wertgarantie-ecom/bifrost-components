import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';
import '../src/policy-selection/policy-selection.js';
import ratingBaseComponentWithDefaultValues from './documentation/ratingBaseComponentWithDefaultValues.md';
import ratingBaseComponentWithoutRatingNumber from './documentation/ratingBaseComponentWithoutRatingNumber.md';
import ratingComponentWithFetchedValues from './documentation/ratingComponentWithFetchedValues.md';
import ratingComponentWithExternalStyling from './documentation/ratingComponentWithExternalStyling.md';


storiesOf('Components|Rating', module)
    .add('base component with default values', () => 
        `<wertgarantie-rating   data-text="9999 Google Rezensionen"
                                data-uri="http://example.com" 
                                data-rating="4.7">
        </wertgarantie-rating>`, { 
            notes: { markdown: ratingBaseComponentWithDefaultValues },
        })
    .add('base component without rating number', () => 
        `<wertgarantie-rating data-show-rating-number="false" 
                              data-text="9999 Google Rezensionen"
                              data-uri="http://example.com" 
                              data-rating="4.7">
        </wertgarantie-rating>`, { 
            notes: { markdown: ratingBaseComponentWithoutRatingNumber },
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

storiesOf('Components|Selection', module)
    .add('base component', () => `
    <wertgarantie-policy-selection
        data-title="title"
        data-checkbox-label="order checkbox label"
        data-details-text="details link text"
        data-details-uri="http://www.example.com"
        data-information-sheet-text="product information"
        data-information-sheet-uri="http://www.example.com"
        data-advantages="advantage1;advantage2"
        data-device-id="1234"
        data-device-price="12"
    >
    </wertgarantie-policy-selection>
     `)
    .add('with default values', () => ` 
    <wertgarantie-policy-selection
        data-title="Vergessen Sie nicht Ihren Rundumschutz"
        data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
        data-details-text="Alle Details zum Tarif"
        data-details-uri="http://www.example.com"
        data-information-sheet-text="Produktinformationsblatt"
        data-information-sheet-uri="http://www.example.com"
        data-advantages="Schutz bei Displaybrüchen;Schutz bei Wasserschaden;Schutz bei Akku-Defekten"
        data-device-id="1234"
        data-device-price="12"
    >
    </wertgarantie-policy-selection> `)
    .add('with embedded rating component', () => ` 
    <wertgarantie-policy-selection
        data-title="Vergessen Sie nicht Ihren Rundumschutz"
        data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
        data-details-text="Alle Details zum Tarif"
        data-details-uri="http://www.example.com"
        data-information-sheet-text="Produktinformationsblatt"
        data-information-sheet-uri="http://www.example.com"
        data-advantages="Schutz bei Displaybrüchen;Schutz bei Wasserschaden;Schutz bei Akku-Defekten"
        data-device-id="1234"
        data-device-price="12"
    >
        <wertgarantie-rating slot="wertgarantie-rating-component" data-text="2.557 Google-Rezensionen" data-rating="4.2" data-uri="http://www.innoq.com" >
        </wertgarantie-rating>
    </wertgarantie-policy-selection> `)
    .add('base component with fetched values', () => ` 
    <wertgarantie-policy-selection
        data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
        data-device-id="1234"
        data-device-price="12"
    >
    </wertgarantie-policy-selection> `)
    .add('component with external theme', () => ` 
        <wertgarantie-policy-selection
            class="mobilcom-theme"
            data-title="Vergessen Sie nicht Ihren Rundumschutz"
            data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
            data-details-text="Alle Details zum Tarif"
            data-details-uri="http://www.example.com"
            data-information-sheet-text="Produktinformationsblatt"
            data-information-sheet-uri="http://www.example.com"
            data-advantages="Schutz bei Displaybrüchen;Schutz bei Wasserschaden;Schutz bei Akku-Defekten"
            data-device-id="1234"
            data-device-price="12"
        >
        </wertgarantie-policy-selection> `)
    .add('all in one', () => ` 
        <wertgarantie-policy-selection
            class="mobilcom-theme"
            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
            <wertgarantie-rating    slot="wertgarantie-rating-component" 
                                    data-text="2.557 Google-Rezensionen" 
                                    data-rating="4.7" 
                                    data-uri="http://www.innoq.com"
                                    class="mobilcom-wg-rating-theme"
            >
            </wertgarantie-rating>
        </wertgarantie-policy-selection> `);
