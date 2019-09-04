import {storiesOf} from '@storybook/html';
import '../public/rating.js';
import '../components/rating/rating.css'

storiesOf('Components|Rating', module)
    .add('dummy-values', () => '<wg-rating data-text="9999 Google Rezensionen" data-url="http://example.com" data-rating="3.5" -></wg-rating>')
    .add('fetched-values', () => '<wg-rating></wg-rating>')
    .add('embedded', () => '<div class="info-box">\n    <h2> Vergessen Sie nicht Ihren Rundumschutz</h2>\n    <ul>\n        <li>\n            <i class="fa fa-check"></i>\n            <wg-rating data-text="2.557 Google-Rezensionen" data-rating="2.4" data-url="http://www.innoq.com">\n            </wg-rating>\n        </li>\n        <li>\n            <i class="fa fa-check"></i>\n            Schutz bei Displaybrüchen\n        </li>\n        <li>\n            <i class="fa fa-check"></i>\n            Schutz bei Wasserschaden\n        </li>\n        <li>\n            <i class="fa fa-check"></i>\n            Schutz bei Akku-Defekten\n        </li>\n\n        <li>\n            <a>\n                <i class="fas fa-plus">\n                </i>\n                Alle Details zum Tarif\n            </a>\n        </li>\n        <li>\n            <a>\n                <i class="far fa-file-pdf">\n                </i>\n                Produktinformationsblatt\n            </a>\n        </li>\n    <div class="checkbox">\n        <input type="checkbox" id="order">\n        <label for="order">Schutzpaket Premium für nur mtl. 9,95 € aktivieren</label>\n    </div>\n    </ul>\n</div>')
    .add('external-stylesheet', () => '<wg-rating styling="./rating.css"></wg-rating>');
