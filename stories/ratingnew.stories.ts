import { storiesOf, addParameters } from '@storybook/html';
// // import '../packages/package-landing-page/dist/landing-page.min.js';
// import landingPageReadme from './documentation/landingPage/landingPage.md';
// import landingPageStylingExample from './documentation/landingPage/landingPageStylingExample.md';
// import landingPageRaw from './documentation/landingPage/landingPageRaw.md';

// import showdown from 'showdown';

// showdown.setFlavor('github');

// var converter = new showdown.Converter();

// storiesOf('Components/TEST', module)
//     .add("Landing Page general", () =>
//         `<div class="markdown-body">` +
//         converter.makeHtml(landingPageReadme) + 
//         `</div>`
//     )
//     .add("Landing Page Styling Example", () =>
//         `<div class="markdown-body">` +
//         converter.makeHtml(landingPageStylingExample) +
//         `</div>`
//     )
//     .add("Landing Page raw", () =>
//         `<div class="markdown-body">` +
//         converter.makeHtml(landingPageRaw) +
//         `</div>`
//     );

import '../packages/package-rating/dist/rating.min.js';

export default {
    title: 'NEW/test'
}



export const Rating = ({ rating, ratingstotal, linktext, link }) => `
    <wertgarantie-rating 
        rating="${rating}" 
        ratingstotal="${ratingstotal}" 
        linktext="${linktext}"
        link="${link}">
    </wertgarantie-rating>
`;

Rating.args = {
    rating: 4.6,
    ratingstotal: 4500,
    linktext: "Reviews on Google",
    link: "https://www.wertgarantie.de/#/"
}