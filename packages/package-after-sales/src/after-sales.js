import {LitElement, html} from "lit-element";
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from "lit-html/directives/style-map";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {afterSalesStyling} from './after-sales-styling';

class WertgarantieAfterSales extends LitElement {
    static get styles() {
        return afterSalesStyling;
    }

    static get properties() {
        return {
            headerTitle: {type: String},
            productBoxTitle: {type: String},

        };
    }

    setProperties(data) {
        this.headerTitle = data.headerTitle || "Ihre Geräte wurden erfolgreich versichert!";
        this.productBoxTitle = data.productBoxTitle || "Folgende Geräte wurden versichert:";
        this.orderItems = data.orderItems || [];
    }

    constructor() {
        super();
        this.componentVersion = '1.0.0';

        this.setProperties = this.setProperties.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
    }

    renderOrder() {
        //language=HTML
        return html`
            <div class="order">
                {this.orderItems.map((item, index) => this.renderOrderItem(item, index))
            </div>
        `;
    }

    renderOrderItem(item, index) {
        const contrastClasses = {
            "order-item--dark": index % 2 === 0,
            "order-item--light": index % 2 === 1
        };
        //language=HTML
        return html`
            <div class="order-item ${classMap(contrastClasses)}">
                <div class="order-item__panel panel">
                    <div class="panel__content--top">
                        <div class="panel__content panel__number">
                            ${index + 1}
                        </div>
                        <div class="panel__content panel__title">
                            ${item.insuranceProductTitle}
                        </div>
                    </div>
                    <div class="panel__content--bottom">
                        <div class="panel__content">
                            <span class="panel__product-name">${item.productTitle}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        //language=HTML
        return html`
            <div class="after-sales">
                <div class="header">
                    <div class="header__icon"><i class="icon fas fa-check"></i></div>
                    <div class="header__title">${this.headerTitle}</div>
                </div>
                <div class="content">
                    <div class="content__box">
                        <div class="box__header">
                            ${this.productBoxTitle}
                        </div>
                        
                    </div>
                    <div class="content__box">
                        <div class="box__header">DIE NÄCHSTEN SCHRITTE:</div>
                        <div class="box__icons">
                            <i class="fas fa-envelope-open-text"></i>
                            <div class="box__icons__arrow">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <i class="fas fa-file-alt"></i>
                            <div class="box__icons__arrow">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <i class="fas fa-flag-checkered"></i>
                        </div>
                        <div class="box__explanation">
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor
                                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                    accusam
                                    et justo duo dolores et ea rebum.
                                </li>
                                <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor
                                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                    accusam
                                    et justo duo dolores et ea rebum.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }
}

if (!customElements.get('wertgarantie-after-sales')) {
    customElements.define('wertgarantie-after-sales', WertgarantieAfterSales);
}