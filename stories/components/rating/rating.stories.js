import '../../../packages/package-rating/dist/rating.min.js';
import RatingReadme from './_rating.md';
import showdown from 'showdown';
showdown.setFlavor('github');

const converter = new showdown.Converter();

export default {
    title: '2.Components/Rating'
}

export const Setup = () => `<div class="markdown-body">${converter.makeHtml(RatingReadme)}</div>`

export const Example = ({ rating, ratingstotal, linktext, link, showratingnumber }) => `
    <div style="display: flex; justify-content: center; margin-top: 8rem;">
        
        ${showratingnumber ? `

        <wertgarantie-rating data-show-rating-number data-rating="${rating}" data-link-text="${linktext}" data-ratings-total="${ratingstotal}" data-link="${link}" data-bifrost-uri="https://ecommerce.wertgarantie.com/wertgarantie"></wertgarantie-rating>
    
        ` : `

        <wertgarantie-rating data-rating="${rating}" data-link-text="${linktext}" data-ratings-total="${ratingstotal}" data-link="${link}" data-bifrost-uri="https://ecommerce.wertgarantie.com/wertgarantie"></wertgarantie-rating>
    
        `}
    
    </div>
`;

Example.args = {
    rating: 4.6,
    ratingstotal: 4500,
    linktext: "Reviews on Google",
    link: "https://www.wertgarantie.de/#/",
    showratingnumber: false,
}