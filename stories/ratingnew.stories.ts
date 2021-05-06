import '../packages/package-rating/dist/rating.min.js';


export default {
    title: 'Components/test'
}


export const Rating = ({ rating, ratingstotal, linktext, link, showratingnumber }) => `
    <div style="display: flex; justify-content: center; margin-top: 8rem;">
        
    ${showratingnumber ? `

        <wertgarantie-rating data-show-rating-number data-rating="${rating}" data-link-text="${linktext}" data-ratings-total="${ratingstotal}" data-link="${link}" data-bifrost-uri="https://ecommerce.wertgarantie.com/wertgarantie"></wertgarantie-rating>
    
        ` : `

        <wertgarantie-rating data-rating="${rating}" data-link-text="${linktext}" data-ratings-total="${ratingstotal}" data-link="${link}" data-bifrost-uri="https://ecommerce.wertgarantie.com/wertgarantie"></wertgarantie-rating>
    
        `}
    

    </div>
`;

Rating.args = {
    rating: 4.6,
    ratingstotal: 4500,
    linktext: "Reviews on Google",
    link: "https://www.wertgarantie.de/#/",
    showratingnumber: false,
}