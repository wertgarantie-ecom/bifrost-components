import {storiesOf} from '@storybook/html';
import '../src/rating/rating.js';
import '../src/policy-selection/policy-selection.js';


storiesOf('Components|Rating', module)
    .add('base component with default values', () => '<wertgarantie-rating data-text="9999 Google Rezensionen" data-url="http://example.com" data-rating="3.5"></wertgarantie-rating>')
    .add('fetched-values', () => '<wertgarantie-rating></wertgarantie-rating>')
    .add('with-imported-css', () => '<wertgarantie-rating data-text="9999 Google Rezensionen" data-url="http://example.com" data-rating="3.5" data-wg-rating-style="rating.css"></wertgarantie-rating>');

storiesOf('Components|Selection', module)
    .add('base component with default values', () => ` 
    <wertgarantie-policy-selection
        data-title="Vergessen Sie nicht Ihren Rundumschutz"
        data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
        data-details-text="Alle Details zum Tarif"
        data-details-uri="http://www.example.com"
        data-information-sheet-text="Produktinformationsblatt"
        data-information-sheet-uri="http://www.example.com"
        data-device-id="1234"
        data-device-price="12"
    >
        <li slot="advantages">advantage 1</li>
        <li slot="advantages">advantage 2</li>
        <li slot="advantages">advantage 3</li>
    </wertgarantie-policy-selection> `)
    .add('base component with embedded rating component', () => ` 
    <wertgarantie-policy-selection
        data-title="Vergessen Sie nicht Ihren Rundumschutz"
        data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
        data-details-text="Alle Details zum Tarif"
        data-details-uri="http://www.example.com"
        data-information-sheet-text="Produktinformationsblatt"
        data-information-sheet-uri="http://www.example.com"
        data-device-id="1234"
        data-device-price="12"
    >
        <li slot="advantages">
            <wertgarantie-rating data-text="2.557 Google-Rezensionen" data-rating="2.4" data-url="http://www.innoq.com" >
            </wertgarantie-rating>
        </li>
        <li slot="advantages">advantage 2</li>
        <li slot="advantages">advantage 3</li>
    </wertgarantie-policy-selection> `)
    .add('base component with fetched values', () => ` 
    <wertgarantie-policy-selection
        data-fetch-uri="http://localhost:3000/wertgarantie/policies"
        data-device-id="1234"
        data-device-price="12"
    >
    <li slot="advantages">
         <wertgarantie-rating data-text="2.557 Google-Rezensionen" data-rating="2.4" data-url="http://www.innoq.com" >
         </wertgarantie-rating>
    </li>
    <li slot="advantages">Schutz bei Displaybrüchen</li>
</wertgarantie-policy-selection> `)
    .add('component with external styling', () => ` 
    <wertgarantie-policy-selection
        data-title="Vergessen Sie nicht Ihren Rundumschutz"
        data-checkbox-label="Schutzpaket Premium für nur mtl. 9,95 € aktivieren"
        data-details-text="Alle Details zum Tarif"
        data-details-uri="http://www.example.com"
        data-information-sheet-text="Produktinformationsblatt"
        data-information-sheet-uri="http://www.example.com"
        data-device-id="1234"
        data-device-price="12"
        data-style="policy-selection.css"
    >
        <li slot="advantages">
            <i class="fa fa-check" style="color: #84bc34"></i>
            <wertgarantie-rating data-text="2.557 Google-Rezensionen" data-rating="2.4" data-url="http://www.innoq.com" >
            </wertgarantie-rating>
        </li>
        <li slot="advantages">
            <i class="fa fa-check" style="color: #84bc34"></i>
             advantage 2
         </li>
            <i slot="details-prefix" class="fa fa-check" style="color: #84bc34"></i>
<!--            <i slot="information-prefix" class="fas fa-file-pdf" style="color: #84bc34"></i>-->
    </wertgarantie-policy-selection> `);
