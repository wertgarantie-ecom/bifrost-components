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
            font-family: Times, serif; // make sure ★ appears correctly
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
    
    get rating() {
        return this.getAttribute('rating');
    }

    get url() {
        return this.getAttribute('url');
    }

    get urlText() {
        return this.getAttribute('url-text');
    }

    connectedCallback() {
        // add rating
        this.ratingSpan.innerText = this.rating;

        // add rating stars
        this.ratingStarsDiv.innerText = '★★★★★';
        this.ratingStarsDiv.style.setProperty("--rating", this.rating);

        // add url and text
        this.ratingLink.setAttribute('href', this.url);
        this.ratingLink.innerText = this.urlText;
    }
}
window.customElements.define('wg-rating', WgRating);

