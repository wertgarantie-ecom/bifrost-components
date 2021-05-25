import {LitElement, html, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map'; 
import {customElement, property} from 'lit/decorators.js';
import fetchBifrost from "wertgarantie-common/dist/fetchBifrost";
import sassstyles from './style.scss';

const starText = '★★★★★';

@customElement('wertgarantie-rating')
export class MyElement extends LitElement {
  static get styles() { return [ unsafeCSS(sassstyles)] }

  @property({ type: Number, attribute: 'data-rating' }) rating: number | null = null;
  @property({ type: String, attribute: 'data-bifrost-uri' }) bifrostUri: String = "https://ecommerce.wertgarantie.com/wertgarantie";
  @property({ type: String, attribute: 'data-link' }) link: String = "";
  @property({ type: String, attribute: 'data-link-text' }) linkText: String = ""; 
  @property({ type: Number, attribute: 'data-ratings-total' }) ratingsTotal: number | null = null;
  @property({ type: Boolean, attribute: 'data-show-rating-number' }) showRatingNumber: boolean = false;

  async connectedCallback() {
    super.connectedCallback();

    await fetchBifrost(`${this.bifrostUri}/ecommerce/rating`, 'GET')
      .then((response: any) => this.setProperties(response))
      .catch((e: Error) => { console.error(e) });
  }


  setProperties(ratingResponse: any) {

    if(ratingResponse?.body?.error_message) throw Error(ratingResponse.body.error_message);

    if (ratingResponse.rating && ratingResponse.text && ratingResponse.ratingsTotal && ratingResponse.uri) {
      this.rating = Math.round(ratingResponse.rating * 10) / 10;
      this.link = ratingResponse.uri;
      this.linkText = ratingResponse.text;
      this.ratingsTotal = ratingResponse.ratingsTotal;
    }
    
  }

  render() {

    let content;

    let ratingNumberContent;
    if(this.showRatingNumber) ratingNumberContent = html`<span class="rating__number" id="rating">${this.rating}</span>`
    

    if(this.rating && this.ratingsTotal && this.linkText?.length) {

      content = html`
        <div class="rating">

          ${ratingNumberContent}

          <div class="rating__stars" id="wertgarantie-rating-stars" style=${styleMap({'--wertgarantie-internal-rating': this.rating.toString()})}>
          ${starText}
        </div>
          <a target="_blank" rel="noopener noreferrer" class="rating__link" href=${this.link}>${this.ratingsTotal + " " +
        this.linkText}</a>
        </div>
      `;
    }

    return content;
  }
}