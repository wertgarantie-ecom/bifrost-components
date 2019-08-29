const template = document.createElement('template');

template.innerHTML = `
    <style>
        .wg-rating {
            display: inline-block;
        }
        
        #wg-rating-stars {
            --rating: 1.3;
            --star-empty: #fff;
            --star-filled: yellow;
            --percent: calc(var(--rating) / 5 * 100%);
            display: inline-block;
            font-family: Times, serif; /* make sure ★ appears correctly */
            font-size: var(--star-size);
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
    </div>
`;

class WgRating extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.ratingSpan = this.shadowRoot.querySelector('#rating');
        this.ratingStarsDiv = this.shadowRoot.querySelector('#wg-rating-stars');
        this.ratingLink = this.shadowRoot.querySelector('#rating-link');
    }

    connectedCallback() {
        if (this.getAttribute('dummy-text') && this.getAttribute('dummy-uri') && this.getAttribute('dummy-rating')) {
            this.ratingSpan.innerText = this.getAttribute('dummy-rating');
                // add rating stars
                this.ratingStarsDiv.innerText = '★★★★★';
                this.ratingStarsDiv.style.setProperty("--rating", this.getAttribute('dummy-rating'));
                // add url and text
                this.ratingLink.setAttribute('href', this.getAttribute('dummy-uri'));
                this.ratingLink.innerText = this.getAttribute('dummy-text');
        } else {
            let self = this;
            fetch("http://localhost:3000/wertgarantie/rating")
                .then(function (response) {
                    return response.json()
                })
                .then(function (body) {
                    self.ratingSpan.innerText = body.rating;
                    // add rating stars
                    self.ratingStarsDiv.innerText = '★★★★★';
                    self.ratingStarsDiv.style.setProperty("--rating", body.rating);
                    // add url and text
                    self.ratingLink.setAttribute('href', body.url);
                    self.ratingLink.innerText = body.text;
                })
                .catch(error => console.error('Error:', error));
        }
    }
}

window.customElements.define('wg-rating', WgRating);

