import {LitElement, html} from 'lit-element';
import {ratingStyling} from './rating-styling';
import fetchBifrost from "wertgarantie-common/src/fetchBifrost";

const starText = '★★★★★';

class WertgarantieRating extends LitElement {
    static get properties() {
        return {
            rating: {type: Number},
            link: {type: String},
            linkText: {type: String},
            bifrostUri: {type: String},
            ratingsTotal: {type: Number},
            showRatingNumber: {type: Boolean}
        };
    }

    static get styles() {
        return ratingStyling;
    }


    constructor() {
        super();
        this.componentVersion = '2.0.15';
        this.fetchRating = this.fetchRating.bind(this);
        this.checkIfRatingDefined = this.checkIfRatingDefined.bind(this);
        this.setProperties = this.setProperties.bind(this);
        this.allDisplayDataAvailable = this.allDisplayDataAvailable.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://ecommerce.wertgarantie.com/wertgarantie";
        this.rating = this.getAttribute('data-rating');
        this.link = this.getAttribute('data-link');
        this.linkText = this.getAttribute('data-link-text');
        this.ratingsTotal = this.getAttribute('data-ratings-total');
        this.disableRatingNumber = this.getAttribute('data-disable-rating-number') === "true";
        this.fetchRating(this.bifrostUri + '/ecommerce/rating')
            .then(this.checkIfRatingDefined)
            .then(this.setProperties)
    }

    render() {
        if (this.ratingDataAvailable()) {
            return html`<div class="rating">
                ${this.disableRatingNumber ? html`` : html`<span class="rating__number" id="rating">${this.rating}</span>`}
                <div class="rating__stars" id="wertgarantie-rating-stars" style="--rating:${this.rating};">${starText}</div>
                <a target="_blank" class="rating__link" href="${this.link}">${this.ratingsTotal + " " + this.linkText}</a>
            </div>`;
        } else {
            return html``;
        }
    }

    ratingDataAvailable() {
        return this.rating && this.link && this.linkText && this.ratingsTotal;
    }

    setProperties(ratingResponse) {
        this.rating = this.rating || Math.round(ratingResponse.rating * 10) / 10;
        this.link = this.link || ratingResponse.uri;
        this.linkText = this.linkText || ratingResponse.text;
        this.ratingsTotal = this.ratingsTotal || ratingResponse.ratingsTotal;
    }

    allDisplayDataAvailable(displayData) {
        return displayData.rating && displayData.text && displayData.ratingsTotal && displayData.uri;
    }

    async fetchRating(fetchUri) {
        if (!fetchUri) {
            this.remove();
            throw new Error("fetch data and display data incomplete\n" +
                "fetchUri: " + fetchUri
            );
        }
        try {
            const response = await fetchBifrost(fetchUri, 'GET', this.componentVersion);
            if (response.status !== 200) {
                console.error('fetch failed:', response);
                return {};
            }
            return response.body;
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    }

    checkIfRatingDefined(displayData) {
        if (!this.allDisplayDataAvailable(displayData)) {
            this.remove();
            throw new Error("display data incomplete" + JSON.stringify(displayData, null, 2));
        } else {
            return displayData;
        }
    }
}

if (!customElements.get('wertgarantie-rating')) {
    customElements.define('wertgarantie-rating', WertgarantieRating);
}
