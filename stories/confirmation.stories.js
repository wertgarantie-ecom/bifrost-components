import {storiesOf} from '@storybook/html';
import '../packages/package-confirmation/src/confirmation.js';

// import PopupReadme from './documentation/popupComponent/popupComponent.md';

// import showdown from 'showdown';

// showdown.setFlavor('github');

// var converter = new showdown.Converter();

storiesOf('Components|Confirmation', module)
.add("Confirmation component bike shop", () => 
    `<wertgarantie-confirmation
        data-client-id="f0037d1d-9936-4f63-8f74-136d8aa6b063"
        data-bifrost-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie">
    </wertgarantie-confirmation>`
)
.add("Confirmation component phone shop", () => 
    `<wertgarantie-confirmation
        data-client-id="37382522-d7ce-439a-8d78-abc0a0970cbd"
        data-bifrost-uri="https://wertgarantie-bifrost.herokuapp.com/wertgarantie">
    </wertgarantie-confirmation>`
);
