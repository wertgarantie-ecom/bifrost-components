import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';
import '../src/policy-selection/policy-selection.js';
import ratingComponentWithDefaultValues from './documentation/ratingComponent/ratingComponentWithDefaultValues.md';
import ratingComponentWithoutRatingNumber from './documentation/ratingComponent/ratingComponentWithoutRatingNumber.md';
import ratingComponentWithFetchedValues from './documentation/ratingComponent/ratingComponentWithFetchedValues.md';
import ratingComponentWithExternalStyling from './documentation/ratingComponent/ratingComponentWithExternalStyling.md';
import selectionBaseComponent from './documentation/selectionComponent/selectionBaseComponent.md';
import selectionComponentWithDefaultValues from './documentation/selectionComponent/selectionComponentWithDefaultValues.md';
import selectionComponentWithEmbeddedRatingComponent from './documentation/selectionComponent/selectionComponentWithEmbeddedRatingComponent.md';
import selectionComponentWithFetchedValues from './documentation/selectionComponent/selectionComponentWithFetchedValues.md';
import selectionComponentWithExternalTheme from './documentation/selectionComponent/selectionComponentWithExternalTheme.md';
import selectionComponentAllInOne from './documentation/selectionComponent/selectionComponentAllInOne.md';


/* Rating Component */

storiesOf('Components|Rating', module)
    .add('base component with default values', () => 
        `<wertgarantie-rating    data-text="9999 Google Rezensionen"
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
    .add('base component', () => `
        <wertgarantie-policy-selection
            data-title="title"
            data-checkbox-label="order checkbox label"
            data-details-text="details link text"
            data-details-uri="http://www.example.com"
            data-information-sheet-text="product information"
            data-information-sheet-uri="http://www.example.com"
            data-advantages="advantage1;advantage2"
        >
        </wertgarantie-policy-selection>`, { 
            notes: { markdown: selectionBaseComponent },
        })
    .add('with default values', () => ` 
        <wertgarantie-policy-selection
            data-title="Vergessen Sie nicht Ihren Rundumschutz"
            data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
            data-details-text="Alle Details zum Tarif"
            data-details-uri="http://www.example.com"
            data-information-sheet-text="Produktinformationsblatt"
            data-information-sheet-uri="http://www.example.com"
            data-advantages="Schutz bei Displaybrüchen;Schutz bei Wasserschaden;Schutz bei Akku-Defekten"
        >
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponentWithDefaultValues },
        })
    .add('with embedded rating component', () => ` 
        <wertgarantie-policy-selection
            data-title="Vergessen Sie nicht Ihren Rundumschutz"
            data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
            data-details-text="Alle Details zum Tarif"
            data-details-uri="http://www.example.com"
            data-information-sheet-text="Produktinformationsblatt"
            data-information-sheet-uri="http://www.example.com"
            data-advantages="Schutz bei Displaybrüchen;Schutz bei Wasserschaden;Schutz bei Akku-Defekten"
        >
            <wertgarantie-rating slot="wertgarantie-rating-component" data-text="2.557 Google-Rezensionen" data-rating="4.2" data-uri="http://www.innoq.com" >
            </wertgarantie-rating>
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponentWithEmbeddedRatingComponent },
        })
    .add('base component with fetched values', () => ` 
        <wertgarantie-policy-selection
            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
        >
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponentWithFetchedValues },
        })
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
        >
        </wertgarantie-policy-selection> `, { 
            notes: { markdown: selectionComponentWithExternalTheme },
        })
    .add('all in one', () => ` 
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
            notes: { markdown: selectionComponentAllInOne },
        })
    .add('everything with different styling', () => ` 
        <wertgarantie-policy-selection
            class="jura-theme"
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
            notes: { markdown: selectionComponentAllInOne },
        });
