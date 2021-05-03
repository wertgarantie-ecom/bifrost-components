import '../packages/package-rating/dist/rating.min.js';


export default {
    title: 'Components/test'
}


export const Rating = ({ rating, ratingstotal, linktext, link, showratingnumber }) => `
    <div style="display: flex; justify-content: center; margin-top: 8rem;">
        
        <wertgarantie-rating 
            rating="${rating}" 
            ratingstotal="${ratingstotal}" 
            linktext="${linktext}"
            link="${link}"
            showratingnumber="${showratingnumber}"
            >
        </wertgarantie-rating>

    </div>
`;

Rating.args = {
    rating: 4.6,
    ratingstotal: 4500,
    linktext: "Reviews on Google",
    link: "https://www.wertgarantie.de/#/",
    showratingnumber: false,
}