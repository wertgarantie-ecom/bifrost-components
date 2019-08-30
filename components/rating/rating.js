const template = document.createElement('template');
template.innerHTML =
    `<style>
        .wg-rating {
            display: inline-block;
        }
        
        #wg-rating-stars {
            --rating: 1.3;
            --star-empty: #fff;
            --star-filled: #fc0f;
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
        <span id="rating"></span>
        <div id="wg-rating-stars"></div>
        <a id="rating-link"></a>
    </div>`;

class WgRating extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.ratingSpan = this.shadowRoot.querySelector('#rating');
        this.ratingStarsDiv = this.shadowRoot.querySelector('#wg-rating-stars');
        this.ratingLink = this.shadowRoot.querySelector('#rating-link');
        this.updateDisplay = this.updateDisplay.bind(this);
    }

    connectedCallback() {
        if (this.getAttribute('dummy-text')
            && this.getAttribute('dummy-uri')
            && this.getAttribute('dummy-rating')) {
            this.updateDisplay({
                rating: this.getAttribute('dummy-rating'),
                uri: this.getAttribute('dummy-uri'),
                text: this.getAttribute('dummy-text'),
            })
        } else {
            this.fetchRating("http://localhost:3000/wertgarantie/rating")
                .then(this.updateDisplay)


        }
    }

    updateDisplay(ratingValues) {
        this.ratingStarsDiv.innerText = '★★★★★';
        this.ratingSpan.innerText = ratingValues.rating;
        this.ratingStarsDiv.style.setProperty("--rating", ratingValues.rating);
        this.ratingLink.setAttribute('href', ratingValues.url);
        this.ratingLink.innerText = ratingValues.text;
    }

    async fetchRating(url) {
        try {
            let response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

window.customElements.define('wg-rating', WgRating);