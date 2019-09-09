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
                --star-filled: #ee8a18;
                --percent: calc(var(--rating) / 5 * 100%);
                display: inline-block;
                font-family: Times, serif; /* make sure ★ appears correctly */
                background: linear-gradient(90deg, var(--star-filled) var(--percent), var(--star-empty) var(--percent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: 3px;
            }

        </style>
        <div class=wertgarantie-rating>
            <slot class="inline" name="prefix"></slot>
            <span id="rating"></span>
            <div id="wertgarantie-rating-stars"></div>
            <a id="rating-link"></a>
        </div>`;

    class WertgarantieRating extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            if (this.getAttribute('data-wg-rating-style')) {
                const shadowStyle = document.createElement('style');
                shadowStyle.innerText = '@import "' + this.getAttribute('data-wg-rating-style') + '"';
                this.shadowRoot.appendChild(shadowStyle);
            }
            this.ratingSpan = this.shadowRoot.querySelector('#rating');
            this.ratingStarsDiv = this.shadowRoot.querySelector('#wertgarantie-rating-stars');
            this.ratingLink = this.shadowRoot.querySelector('#rating-link');
            this.updateDisplay = this.updateDisplay.bind(this);
            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
        }

        connectedCallback() {
            const definedAttributes = {
                fetchUri: this.getAttribute('data-fetch-uri'),
                rating: this.getAttribute('data-rating'),
                text: this.getAttribute('data-text'),
                uri: this.getAttribute('data-url'),
            };

            this.fetchRating(definedAttributes.fetchUri)
                .then((fetchedValues) => this.overwriteWithUserDefinedAttributes(fetchedValues, definedAttributes))
                .then(this.checkIfRatingDefined)
                .then(this.updateDisplay);
        }

        async fetchRating(fetchUri) {
            if (!fetchUri) {
                return {};
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

            const addIfDefined = (object, name, property) => {
                if (property) object[name] = property;
            };

            const userData = {};
            addIfDefined(userData, 'rating', definedAttributes.rating);
            addIfDefined(userData, 'text', definedAttributes.text);
            addIfDefined(userData, 'url', definedAttributes.url);

            return merge(fetchedValues, userData);
        }

        checkIfRatingDefined(values) {
            if (!values || !values.rating) {
                throw new Error("rating undefined");
            }
            return values
        }

        updateDisplay({rating, url, text}) {
            this.ratingStarsDiv.innerText = '★★★★★';
            this.ratingSpan.innerText = rating;
            this.ratingStarsDiv.style.setProperty("--rating", rating);
            if (url) {
                this.ratingLink.setAttribute('href', url);
            }
            if (text) {
                this.ratingLink.innerText = text;
            }
        }
    }

    window.customElements.define('wertgarantie-rating', WertgarantieRating);
})();