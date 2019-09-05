(function() {
    const selectionTemplate = document.createElement('template');
    selectionTemplate.innerHTML =
        `<style>
            .inline{
                display: inline-block;
            } 
            
            .wg-rating {
                display: inline-block;
            }
        
            #wg-rating-stars {
                --rating: 1.3;
                --star-empty: #d3dbdb;
                --star-filled: #ed6f2b;
                --percent: calc(var(--rating) / 5 * 100%);
                display: inline-block;
                font-family: Times, serif; /* make sure ★ appears correctly */
                background: linear-gradient(90deg, var(--star-filled) var(--percent), var(--star-empty) var(--percent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: 3px;
            }
        </style>

        <div class=wg-rating>
            <slot class="inline" name="prefix"></slot>
            <span id="rating"></span>
            <div id="wg-rating-stars"></div>
            <a id="rating-link"></a>
        </div>`;

    class WgRating extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(selectionTemplate.content.cloneNode(true));
            this.ratingSpan = this.shadowRoot.querySelector('#rating');
            this.ratingStarsDiv = this.shadowRoot.querySelector('#wg-rating-stars');
            this.ratingLink = this.shadowRoot.querySelector('#rating-link');
            this.updateDisplay = this.updateDisplay.bind(this);
            this.overwriteWithUserDefinedAttributes = this.overwriteWithUserDefinedAttributes.bind(this);
            this.fetchUri = "http://localhost:3000/wertgarantie/rating";
        }

        connectedCallback() {
            const definedAttributes = {
                fetchUri: this.getAttribute('data-fetchUrl'),
                rating: this.getAttribute('data-rating'),
                text: this.getAttribute('data-text'),
                uri: this.getAttribute('data-url'),
                allSet: () => this.rating && this.text && this.uri
            }

            if (definedAttributes.fetchUri) {
                this.fetchUri = definedAttributes.fetchUri;
            }
            this.fetchRating(this.fetchUri, definedAttributes)
                .then((fetchedValues) => this.overwriteWithUserDefinedAttributes(fetchedValues, definedAttributes))
                .then(this.checkIfRatingDefined)
                .then(this.updateDisplay);
        }

        async fetchRating(fetchUri, definedAttributes) {
            if (!fetchUri || definedAttributes.allSet()) {
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

    window.customElements.define('wg-rating', WgRating);
})();