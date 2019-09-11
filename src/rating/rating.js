(function () {
    const template = document.createElement('template');
    template.innerHTML =
        `
        <style>
            :host {
                display: inline-block;
            }

            #wertgarantie-rating-stars {
                --rating: 1.3;
                --star-empty: #d3dbdb;
                --star-filled: var(--wertgarantie-rating-stars-color, #ee8a18);
                --percent: calc(var(--rating) / 5 * 100%);
                display: inline-block;
                font-family: Times, serif; /* make sure ★ appears correctly */
                background: linear-gradient(90deg, var(--star-filled) var(--percent), var(--star-empty) var(--percent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: 3px;
            }

            .wertgarantie-rating-container {
                font-family: var(--wertgarantie-rating-font-family, Roboto), sans-serif;
                font-size: var(--wertgarantie-rating-font-size, 16px);
            }

            .rating-link {
                color: var(--wertgarantie-rating-link-color, #2574be);
            }

        </style>
        <div class=wertgarantie-rating-container>
            <span id="rating"></span>
            <div id="wertgarantie-rating-stars"></div>
            <a class="rating-link"></a>
        </div>`;

    class WertgarantieRating extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.container = this.shadowRoot.querySelector(".wertgarantie-rating-container");
            this.ratingSpan = this.shadowRoot.querySelector('#rating');
            this.ratingStarsDiv = this.shadowRoot.querySelector('#wertgarantie-rating-stars');
            this.ratingLink = this.shadowRoot.querySelector('.rating-link');

            this.updateDisplay = this.updateDisplay.bind(this);
            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
            this.checkIfRatingDefined = this.checkIfRatingDefined.bind(this);
        }

        connectedCallback() {
            const addIfDefined = (object, name, property) => {
                if (property) object[name] = property;
            };

            const displayData = {};
            addIfDefined(displayData, 'rating', this.getAttribute('data-rating'));
            addIfDefined(displayData, 'text', this.getAttribute('data-text'));
            addIfDefined(displayData, 'uri', this.getAttribute('data-uri'));
            addIfDefined(displayData, 'showRatingNumber', this.getAttribute('data-show-rating-number') === "false" ? false : true);

            const fetchData = {};
            addIfDefined(fetchData, 'fetchUri', this.getAttribute('data-fetch-uri'));

            if (this.allDisplayDataAvailable(displayData)) {
                this.updateDisplay(displayData);
            } else {
                this.fetchRating(fetchData.fetchUri)
                    .then((fetchedValues) => this.overwriteWithUserDefinedAttributes(fetchedValues, displayData))
                    .then(this.checkIfRatingDefined)
                    .then(this.updateDisplay);
            }
        }

        allDisplayDataAvailable(displayData) {
            return displayData.rating && displayData.text && displayData.uri;
        }

        async fetchRating(fetchUri) {
            if (!fetchUri) {
                this.remove();
                throw new Error("fetch data and display data incomplete\n" + 
                    "fetchUri: " + fetchUri
                );
            }
            try {
                const response = await fetch(fetchUri);
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

        updateDisplay({rating, uri, text, showRatingNumber}) {
            this.ratingStarsDiv.innerText = '★★★★★';
            if (showRatingNumber) {
                this.ratingSpan.innerText = rating;
            }
            this.ratingStarsDiv.style.setProperty("--rating", rating);
            if (uri) {
                this.ratingLink.setAttribute('href', uri);
            }
            if (text) {
                this.ratingLink.innerText = text;
            }
        }
    }

    window.customElements.define('wertgarantie-rating', WertgarantieRating);
})();