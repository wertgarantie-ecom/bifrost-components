import {LitElement, html} from 'lit-element';
import {ratingLitStyling} from './rating-lit-styling';

const starText = '★★★★★';

class WertgarantieRating extends LitElement {
    static get properties() {
        return {
            "data-rating": {type: Number},
            "data-link": {type: String},
            "data-linkText": {type: String},
            "data-bifrost-uri": {type: String},
            "data-ratingsTotal": {type: Number},
            "data-show-rating-number": {type: Boolean}
        };
    }

    static get styles() {
        return ratingLitStyling;
    }

    constructor() {
        super();
        this["data-bifrost-uri"] = "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        this.fetchRating = this.fetchRating.bind(this);
        this.checkIfRatingDefined = this.checkIfRatingDefined.bind(this);
        this.setProperties = this.setProperties.bind(this);
        this.allDisplayDataAvailable = this.allDisplayDataAvailable.bind(this);
        this.fetchRating(this["data-bifrost-uri"] + '/rating')
            .then(this.checkIfRatingDefined)
            .then(this.setProperties)
    }

    render() {
        return html`<div class="rating">
            ${this["data-show-rating-number"] ? html`<span class="rating__number" id="rating">${this["data-rating"]}</span>` : html``}
            <div class="rating__stars" id="wertgarantie-rating-stars" style="--rating:${this["data-rating"]};">${starText}</div>
            <a target="_blank" class="rating__link" href="${this["data-link"]}">${this["data-ratingsTotal"] + " " + this["data-linkText"]}</a>
        </div>`;
    }

    setProperties(ratingResponse) {
        this["data-rating"] = Math.round(ratingResponse.rating * 10) / 10;
        this["data-link"] = ratingResponse.uri;
        this["data-linkText"] = ratingResponse.text;
        this["data-ratingsTotal"] = ratingResponse.ratingsTotal;
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
            const response = await fetch(fetchUri, {
                headers: {
                    'X-Version': this.componentVersion
                }
            });
            if (response.status !== 200) {
                console.error('fetch failed:', response);
                return {};
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    }

    overwriteWithUserDefinedAttributes(fetchedValues, definedAttributes) {
        const merge = (object1, object2) => {
            return {...object1, ...object2}
        };

        return merge(fetchedValues, definedAttributes);
    }

    checkIfRatingDefined(displayData) {
        console.log(displayData);
        if (!this.allDisplayDataAvailable(displayData)) {
            this.remove();
            throw new Error("display data incomplete");
        } else {
            return displayData;
        }
    }
}

customElements.define('wertgarantie-rating', WertgarantieRating);