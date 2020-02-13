import {LitElement, html, css} from 'lit-element';

const starText = '★★★★★';

class WertgarantieRating extends LitElement {
    static get properties() {
        return {
            "rating": {type: Number},
            "link": {type: String},
            "linkText": {type: String},
            "bifrostUri": {type: String},
            "ratingsTotal": {type: Number},
            "showRatingNumber": {type: Boolean}
        };
    }

    constructor() {
        super();
        this.bifrostUri = "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        this.fetchRating(this.bifrostUri + '/rating')
            .then(this.checkIfRatingDefined)
            .then(this.setProperties)
    }

    render() {
        return html` <div class="rating">
            ${this.showRatingNumber ? html`<span class="rating__number" id="rating">${this.rating}</span>` : html``}
            <div class="rating__stars" id="wertgarantie-rating-stars" style="--rating:${this.rating};">★★★★★</div>
            <a target="_blank" class="rating__link" href="${this.link}">${this.ratingsTotal} ${this.linkText}</a>
        </div>`;
    }

    setProperties(ratingResponse) {
        this.rating = Math.round(ratingResponse.rating * 10) / 10;
        this.link = ratingResponse.uri;
        this.linkText = ratingResponse.text;
        this.ratingsTotal = ratingResponse.ratingsTotal;
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
        if (!this.allDisplayDataAvailable(displayData)) {
            this.remove();
            throw new Error("display data incomplete");
        } else {
            return displayData;
        }
    }

    updateDisplay({rating, uri, ratingsTotal, text, showRatingNumber}) {
        rating = Math.round(rating * 10) / 10;
        this.ratingStarsDiv.innerText = '★★★★★';
        if (showRatingNumber) {
            this.ratingSpan.innerText = rating;
        }
        this.ratingStarsDiv.style.setProperty("--rating", rating);
        if (uri) {
            this.ratingLink.setAttribute('href', uri);
        }
        if (text) {
            this.ratingLink.innerText = ratingsTotal + " " + text;
        }
    }

}

/*
            :host {
                display: inline-block;
            }
            
            .rating {
                font-family: var(--wertgarantie-rating-font-family, Roboto), sans-serif;
                font-size: var(--wertgarantie-rating-font-size, 16px);
            }

            .rating__number {
                color: var(--wertgarantie-rating-text-color, #2574be);
                font-weight: var(--wertgarantie-rating-font-weight, 400)
            }
            
            .rating__stars {
                --rating: 1.3;
                --star-empty: #d3dbdb;
                --star-filled: var(--wertgarantie-rating-stars-color, #ee8a18);
                --percent: calc(var(--rating) / 5 * 100%);
                display: inline-block;
                font-family: Arial, serif; /!* make sure ★ appears correctly *!/
                background: linear-gradient(90deg, var(--star-filled) var(--percent), var(--star-empty) var(--percent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: 3px;
                font-size: var(--wertgarantie-rating-stars-font-size, inherit);
            }

            .rating__link {
                color: var(--wertgarantie-rating-text-color, #2574be);
                text-decoration: none;
                font-weight: var(--wertgarantie-rating-font-weight, 400);
            }*/







