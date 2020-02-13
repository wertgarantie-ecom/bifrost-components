import {LitElement, html} from 'lit-element';
import '../../package-rating/src/rating.js'
import fetchBifrost from "../../../shared-code/fetchBifrost";


class WertgarantieSelectionPopUp extends LitElement {

    static get properties() {
        return {
            display: {type: Boolean},
            devicePrice: {type: Number},
            deviceClass: {type: String},
            bifrostUri: {type: String},
            clientId: {type: String},
            shopProductName: {type: String},
            title: {type: String},
            products: {type: Array},
            displayAttributes: {type: Object}
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.devicePrice = this.getAttribute("data-device-price");
        this.deviceClass = this.getAttribute("data-device-class");
        this.bifrostUri = this.getAttribute("data-bifrost-uri") || "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        this.clientId = this.getAttribute("data-client-id");
        this.shopProductName = this.getAttribute("data-shop-product-name");
    }

    setProperties(responseData) {
        const products = responseData.products.map(product => {
            product.displayAttributes = {
                isSelected: false
            }
        });

        this.title = responseData.title;
        this.products = products;
        this.displayAttributes = {
            showDetails: false
        };
    }


    displayComponent() {
        this.fetchPolicy()
            .then(this.allDisplayDataAvailable)
            .then(this.setProperties)
            .then(() => this.display = true)

    }

    async fetchPolicy() {
        if (!(this.bifrostUri && this.devicePrice && this.deviceClass && this.clientId && this.shopProductName)) {
            this.remove();
            throw new Error("fetch data incomplete\n" +
                "bifrostUri: " + this.bifrostUri + "\n" +
                "clientId: " + this.clientId + "\n" +
                "devicePrice: " + this.devicePrice + "\n" +
                "deviceClass: " + this.deviceClass + "\n" +
                "shopProductName: " + this.shopProductName
            );
        }
        try {
            const url = new URL(this.bifrostUri + '/components/selection-popup');
            const queryParams = {
                devicePrice: this.devicePrice,
                deviceClass: this.deviceClass,
                clientId: this.clientId
            };
            Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
            const response = await fetchBifrost(url, 'GET', this.componentVersion);
            if (response.status !== 200) {
                console.error('fetch failed:', response);
                return {};
            }
            return response.body;
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    }

    allDisplayDataAvailable(displayData) {
        let isComplete = true;
        if (Object.entries(displayData).length === 0 && displayData.constructor === Object) {
            isComplete = false;
        } else {
            displayData.products.forEach(data => {
                if (!(data.name && data.detailsDocText && data.detailsDocUri && data.advantages && data.top3
                    && data.excludedAdvantages && data.infoSheetUri && data.infoSheetText && data.paymentInterval
                    && data.price && data.currency && data.priceFormatted && data.tax)) {
                    isComplete = false;
                }
            });
        }
        if (!isComplete) {
            this.remove();
            throw new Error("display data incomplete");
        }
        return displayData;
    }


    constructor() {
        super();
        this.initialized = false;
        this.componentVersion = '1.0.2';

        // method binding:
        // TODO
    }

    render() {
        return (this.display) ? html`<div class="modal" id="modal" style="display: block;">
        <div class="content">
            <div class="head">
                <div class="head__left">
                    <strong class="head__title">Wird oft dazugebucht</strong>
                    <wertgarantie-rating class="wg-rating-default" data-show-rating-number="false">
                    </wertgarantie-rating>
                </div>
                <div class="head__right">
                    <span class="closeBtn" id="closeBtn">×</span>
                </div>
            </div>
            <p class="head__subtitle">Wählen Sie den Schutz, der Ihren Bedürfnissen am besten entspricht:</p>
            <section class="product-selectors" id="product-selectors">
            <button class="product-selectors__button product-selectors__button--selected">Varinate 1</button><button class="product-selectors__button">Varinate 2</button></section>
            <section class="products" id="products">
            <div class="product">
        <div class="product__head--background product__head--background-even" style="--image-link-even:url(&quot;https://wertgarantie-bifrost.s3.eu-central-1.amazonaws.com/eBike-HP.jpeg&quot;);">
            <div class="product__base-info">
                <div class="product__base-info--top">
                    <div class="product__base-info--top-left">
                        <small class="payment-interval">monatl.</small><br>
                        <strong class="price-display">ab 5,00 €</strong><br>
                        <small class="tax-display">(inkl. 0,80€ VerSt**)</small>
                    </div>
                    <div class="product__base-info--top-right">
                        <label class="radio-container">
                            <input class="product__selection" type="radio" name="product-id" value="11">
                            <span class="radio-circle"></span>
                        </label>
                    </div>
                </div>
                <div class="product__base-info--bottom">
                    <h3 class="product__title">E-Bike Komplettschutz mit monatlicher Zahlweise</h3>
                    <ul class="product__advantages product__advantages--top3">
                <li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Unterwegs was passiert? Wir holen Sie ab!</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Schaden an Fahrrad oder Motor? Wir kümmern uns um die Reparatur und Kosten!</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Diebstahl? Wir erstatten den Zeitwert!</span></li></ul></div>
                
            </div>
        </div>
        <div class="product__details product__details--expanded">
            <h3>Details</h3>
            <ul class="product__advantages product__advantages--details">
            <li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Pick-Up-Service</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Volle Kostenübernahme bei Reparaturen</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Unsachgemäße Handhabung</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Verschleißschutz</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Diebstahlschutz</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Teilediebstahlschutz</span></li></ul>
            <div class="product__terms">
                <div>
                    <p><strong>Bedingungen</strong></p>
                    <a class="wg-link wg-infosheet-link wg-product-info-sheet" href="https://stage-api.wertgarantie.com/download/82e38762-4440-46a9-a34e-58974a3ddad5">Informationsblatt zu Versicherungsprodukten</a><br>
                    <a class="wg-link wg-infosheet-link wg-avb" href="https://stage-api.wertgarantie.com/download/1eb7d0ce-6c62-4264-a3e7-58319bd4d4d1">Allgemeine Versicherungsbedingungen</a>
                </div>
                <div style="text-align: center; padding-top: 1em;">
                    <p><strong>Mehr zum <a target="_blank" class="wg-link info-sheet-link" href="https://stage-api.wertgarantie.com/download/82e38762-4440-46a9-a34e-58974a3ddad5">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.</strong></p>
                </div>
            </div>
        </div>
        </div><div class="product">
        <div class="product__head--background product__head--background-odd" style="--image-link-odd:url(&quot;https://wertgarantie-bifrost.s3.eu-central-1.amazonaws.com/utah-mountain-biking-bike-biking-71104.jpeg&quot;);">
            <div class="product__base-info">
                <div class="product__base-info--top">
                    <div class="product__base-info--top-left">
                        <small class="payment-interval">jährl.</small><br>
                        <strong class="price-display">ab 83,40 €</strong><br>
                        <small class="tax-display">(inkl. 13,32€ VerSt**)</small>
                    </div>
                    <div class="product__base-info--top-right">
                        <label class="radio-container">
                            <input class="product__selection" type="radio" name="product-id" value="10">
                            <span class="radio-circle"></span>
                        </label>
                    </div>
                </div>
                <div class="product__base-info--bottom">
                    <h3 class="product__title">E-Bike Komplettschutz mit jährlicher Zahlweise</h3>
                    <ul class="product__advantages product__advantages--top3">
                <li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Unterwegs was passiert? Wir holen Sie ab!</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Schaden an Fahrrad oder Motor? Wir kümmern uns um die Reparatur und Kosten!</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Diebstahl? Wir erstatten den Zeitwert!</span></li></ul></div>
                
            </div>
        </div>
        <div class="product__details product__details--expanded">
            <h3>Details</h3>
            <ul class="product__advantages product__advantages--details">
            <li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Pick-Up-Service</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Volle Kostenübernahme bei Reparaturen</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Unsachgemäße Handhabung</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Verschleißschutz</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Diebstahlschutz</span></li><li class="advantage advantage--included"><span class="advantage__icon advantage__icon--included">Teilediebstahlschutz</span></li></ul>
            <div class="product__terms">
                <div>
                    <p><strong>Bedingungen</strong></p>
                    <a class="wg-link wg-infosheet-link wg-product-info-sheet" href="https://stage-api.wertgarantie.com/download/928e51ef-d92f-4aa4-ba42-61d1e100af2f">Informationsblatt zu Versicherungsprodukten</a><br>
                    <a class="wg-link wg-infosheet-link wg-avb" href="https://stage-api.wertgarantie.com/download/191a36e2-6685-4a3d-beb0-dc0159a90387">Allgemeine Versicherungsbedingungen</a>
                </div>
                <div style="text-align: center; padding-top: 1em;">
                    <p><strong>Mehr zum <a target="_blank" class="wg-link info-sheet-link" href="https://stage-api.wertgarantie.com/download/928e51ef-d92f-4aa4-ba42-61d1e100af2f">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.</strong></p>
                </div>
            </div>
        </div>
        </div></section>
            <section class="product__details-footer product__details-footer--expanded">
                <div>
                    <p>Versicherung ist Vertrauenssache, deshalb setzt "PARTNERSHOP" neben <strong>500.000 zufriedener Kunden</strong> auf die <strong>Wertgarantie</strong>, den <strong>Testsieger in Sachen Sicherheit</strong></p>
                </div>
                
                <div class="award-image-block">
                    <a target="_blank" href="https://www.certipedia.com/quality_marks/9105052129"><img class="award-image" src="https://www.wertgarantie.de/portaldata/4/resources/Icons/tuev-logo.png" alt="tuev-logo"></a>
                    <a target="_blank" href="https://www.wertgarantie.de/Home.aspx#"><img class="award-image" src="https://www.wertgarantie.de/Portaldata/4/Resources/logos/test-bild-wertgarantie-109-01.png" alt="test-bild"></a>
                </div>
            </section>
            <section class="button-section">
                <div class="button-section__details-cancel">
                    <button class="button button--dark" id="detailsBtn">Details anzeigen</button>
                    <button class="button button--light" id="cancelOrder">Nicht absichern</button>
                </div>
                <div class="button-section__order">
                    <button class="button button--dark order-button order-button--inactive" id="orderBtn" disabled="">Beides in den Warenkorb</button>
                </div>
            </section>
        </div>
    </div>` : html``;
    }

}

customElements.define(name, WertgarantieSelectionPopUp);

/*

if (window

    .customElements
) {
    (

        function () {
            const BIFROST_URI = "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
            const MOBILE_WIDTH = 878;
            const template = document.createElement('template');


            let productTemplate = `
        <div class="product__head--background">
            <div class="product__base-info">
                <div class="product__base-info--top">
                    <div class="product__base-info--top-left">
                        <small class="payment-interval">monatlich</small><br/>
                        <strong class="price-display">ab X,XX €</strong><br/>
                        <small class="tax-display">(inkl. x,xx€ VerSt**)</small>
                    </div>
                    <div class="product__base-info--top-right">
                        <label class="radio-container">
                            <input class="product__selection" type="radio" name="product-id"/>
                            <span class="radio-circle"></span>
                        </label>
                    </div>
                </div>
                <div class="product__base-info--bottom">
                    <h3 class="product__title">Smartphone Komplettschutz Basis</h3>
                    <ul class="product__advantages product__advantages--top3">
                </div>
                </ul>
            </div>
        </div>
        <div class="product__details">
            <h3>Details</h3>
            <ul class="product__advantages product__advantages--details">
            </ul>
            <div class="product__terms">
                <div>
                    <p><strong>Bedingungen</strong></p>
                    <a class="wg-link wg-infosheet-link wg-product-info-sheet" href="http://www.example.com">Informationsblatt zu Versicherungsprodukten</a><br/>
                    <a class="wg-link wg-infosheet-link wg-avb" href="http://www.example.com">Allgemeine Versicherungsbedingungen</a>
                </div>
                <div style="text-align: center; padding-top: 1em;">
                    <p><strong>Mehr zum <a target="_blank" class="wg-link info-sheet-link">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.</strong></p>
                </div>
            </div>
        </div>
        `;


            class WertgarantieSelectionPopUp extends HTMLElement {

                constructor() {
                    super();
                    this.attachShadow({mode: 'open'});
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                    this.modal = this.shadowRoot.querySelector('#modal');
                    this.closeBtn = this.shadowRoot.querySelector('#closeBtn');
                    this.productSelectors = this.shadowRoot.querySelector('#product-selectors');
                    this.productSection = this.shadowRoot.querySelector('#products');
                    this.detailsBtn = this.shadowRoot.querySelector('#detailsBtn');
                    this.productDetailsFooter = this.shadowRoot.querySelector('.product__details-footer');
                    this.orderBtn = this.shadowRoot.querySelector('#orderBtn');
                    this.initialized = false;
                    this.componentVersion = '1.0.2';

                    // method binding:
                    this.allDisplayDataAvailable = this.allDisplayDataAvailable.bind(this);
                    this.setupDisplay = this.setupDisplay.bind(this);
                    this.expandDetailsSections = this.expandDetailsSections.bind(this);
                    this.open = this.open.bind(this);
                    this.close = this.close.bind(this);
                    this.addProductToOrder = this.addProductToOrder.bind(this);
                    this.getSelectedProduct = this.getSelectedProduct.bind(this);
                }

                set devicePrice(devicePrice) {
                    this.setAttribute("data-device-price", devicePrice);
                }

                set deviceClass(deviceClass) {
                    this.setAttribute("data-device-class", deviceClass);
                }

                set clientId(clientId) {
                    this.setAttribute("data-client-id", clientId);
                }

                set shopProductName(shopProductName) {
                    this.setAttribute("data-shop-product-name", shopProductName);
                }

                set bifrostUri(bifrostUri) {
                    this.setAttribute("data-bifrost-uri", bifrostUri);
                }

                get bifrostUri() {
                    return this.getAttribute("data-bifrost-uri") || BIFROST_URI;
                }

                open() {
                    this.modal.style.display = 'block';
                }

                close() {
                    this.modal.style.display = 'none';
                }

                initComponent(configuredData) {
                    this._upgradeProperty('deviceClass');
                    this._upgradeProperty('devicePrice');
                    this._upgradeProperty('clientId');
                    this._upgradeProperty('shopProductName');

                    // setup event listeners
                    this.closeBtn.addEventListener('click', this.close);
                    this.detailsBtn.addEventListener('click', this.expandDetailsSections);
                    this.orderBtn.disabled = true;
                    this.orderBtn.addEventListener('click', this.addProductToOrder);

                    const addIfDefined = (object, name, property) => {
                        if (property) object[name] = property;
                    };

                    const fetchData = {};
                    addIfDefined(fetchData, 'devicePrice', this.getAttribute('data-device-price'));
                    addIfDefined(fetchData, 'deviceClass', this.getAttribute('data-device-class'));
                    addIfDefined(fetchData, 'bifrostUri', this.bifrostUri);
                    addIfDefined(fetchData, 'clientId', this.getAttribute('data-client-id'));
                    addIfDefined(fetchData, 'shopProductName', this.getAttribute('data-shop-product-name'));

                    this.fetchPolicy(fetchData)
                        .then(fetchedData => {
                            return {...fetchedData, ...configuredData};
                        })
                        .then(this.allDisplayDataAvailable) // check if display data is complete
                        .then(this.setupDisplay);

                    this.initialized = true;
                }

                expandDetailsSections() {
                    const detailsSections = this.shadowRoot.querySelectorAll('.product__details');
                    detailsSections.forEach(section => {
                        section.classList.toggle('product__details--expanded');
                    });
                    this.productDetailsFooter.classList.toggle('product__details-footer--expanded');
                }

                _upgradeProperty(prop) {
                    if (this[prop]) {
                        let value = this[prop];
                        delete this[prop];
                        this[prop] = value;
                    }
                }

                allDisplayDataAvailable(displayData) {
                    let isComplete = true;
                    if (Object.entries(displayData).length === 0 && displayData.constructor === Object) {
                        isComplete = false;
                    } else {
                        displayData.products.forEach(data => {
                            if (!(data.name && data.detailsDocText && data.detailsDocUri && data.advantages && data.top3
                                && data.excludedAdvantages && data.infoSheetUri && data.infoSheetText && data.paymentInterval
                                && data.price && data.currency && data.priceFormatted && data.tax)) {
                                isComplete = false;
                            }
                        });
                    }
                    if (!isComplete) {
                        this.remove();
                        throw new Error("display data incomplete");
                    }
                    return displayData;
                }

                async fetchPolicy({bifrostUri, devicePrice, deviceClass, clientId, shopProductName}) {
                    if (!(bifrostUri && devicePrice && deviceClass && clientId && shopProductName)) {
                        this.remove();
                        throw new Error("fetch data incomplete\n" +
                            "bifrostUri: " + bifrostUri + "\n" +
                            "clientId: " + clientId + "\n" +
                            "devicePrice: " + devicePrice + "\n" +
                            "deviceClass: " + deviceClass + "\n" +
                            "shopProductName: " + shopProductName
                        );
                    }
                    try {
                        const url = new URL(bifrostUri + '/components/selection-popup');
                        const queryParams = {
                            devicePrice: devicePrice,
                            deviceClass: deviceClass,
                            clientId: clientId
                        };
                        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
                        const response = await fetchBifrost(url, 'GET', this.componentVersion);
                        if (response.status !== 200) {
                            console.error('fetch failed:', response);
                            return {};
                        }
                        return response.body;
                    } catch (error) {
                        console.error('Error:', error);
                        return {};
                    }
                }

                setupDisplay(displayData) {
                    displayData.products.forEach((product, idx) => {
                        let newProductDiv = document.createElement('div');
                        newProductDiv.classList.add('product');
                        newProductDiv.innerHTML = productTemplate;

                        // Set alternating light and dark styling for products
                        if (idx % 2 === 0) {
                            if (product.imageLink) {
                                newProductDiv.querySelector('.product__head--background').style.setProperty('--image-link-even', 'url("' + product.imageLink + '")');
                            }
                            newProductDiv.querySelector('.product__head--background').classList.add('product__head--background-even');
                        } else {
                            if (product.imageLink) {
                                newProductDiv.querySelector('.product__head--background').style.setProperty('--image-link-odd', 'url("' + product.imageLink + '")');
                            }
                            newProductDiv.querySelector('.product__head--background').classList.add('product__head--background-odd');
                        }

                        // Update price display
                        newProductDiv.querySelector('.payment-interval').textContent = product.paymentInterval;
                        newProductDiv.querySelector('.price-display').textContent = product.priceFormatted;
                        newProductDiv.querySelector('.tax-display').textContent = product.taxFormatted;
                        newProductDiv.querySelector('.product__title').textContent = product.name;
                        newProductDiv.querySelector('.product__selection').value = product.id;
                        newProductDiv.querySelector('.info-sheet-link').href = product.infoSheetUri;

                        // Assemble Top 3 advantages to product head
                        product.top3.forEach(advantage => {
                            const listElement = document.createElement('li');
                            listElement.classList.add('advantage', 'advantage--included');

                            const spanElement = document.createElement('span');
                            spanElement.classList.add('advantage__icon', 'advantage__icon--included');
                            spanElement.textContent = advantage;

                            listElement.appendChild(spanElement);

                            newProductDiv.querySelector('.product__advantages--top3').appendChild(listElement);
                        });

                        // Assemble Product Details
                        product.excludedAdvantages.forEach(excludedAdvantage => {
                            const listElement = document.createElement('li');
                            listElement.classList.add('advantage', 'advantage--excluded');

                            const spanElement = document.createElement('span');
                            spanElement.classList.add('advantage__icon', 'advantage__icon--excluded');
                            spanElement.textContent = excludedAdvantage;

                            listElement.appendChild(spanElement);

                            newProductDiv.querySelector('.product__advantages--details').appendChild(listElement);
                        });

                        product.advantages.forEach(advantage => {
                            const listElement = document.createElement('li');
                            listElement.classList.add('advantage', 'advantage--included');

                            const spanElement = document.createElement('span');
                            spanElement.classList.add('advantage__icon', 'advantage__icon--included');
                            spanElement.textContent = advantage;

                            listElement.appendChild(spanElement);

                            newProductDiv.querySelector('.product__advantages--details').appendChild(listElement);
                        });

                        newProductDiv.querySelector('.wg-product-info-sheet').setAttribute('href', product.infoSheetUri);
                        newProductDiv.querySelector('.wg-avb').setAttribute('href', product.detailsDocUri);

                        // add listeners
                        newProductDiv.addEventListener('click', () => {
                            if (window.innerWidth > MOBILE_WIDTH) {
                                if (newProductDiv.querySelector(".product__selection").checked) {
                                    newProductDiv.querySelector(".product__selection").checked = false;
                                    this.restoreHighlighting(newProductDiv);
                                    this.productSelectors.querySelectorAll('.product-selectors__button').forEach(button => {
                                        button.classList.remove('product-selectors__button--selected');
                                    });
                                    this.productSelectors.querySelectorAll('.product-selectors__button')[0].classList.add('product-selectors__button--selected');
                                } else {
                                    this.checkProduct(newProductDiv);
                                    this.highlightProduct(newProductDiv);
                                    this.productSelectors.querySelectorAll('.product-selectors__button').forEach(button => {
                                        button.classList.remove('product-selectors__button--selected');
                                    });
                                    this.productSelectors.querySelectorAll('.product-selectors__button')[idx].classList.add('product-selectors__button--selected');
                                }
                            }
                        });

                        newProductDiv.addEventListener('mouseover', () => {
                            if (window.innerWidth > MOBILE_WIDTH) {
                                this.highlightProduct(newProductDiv);
                            }
                        });

                        newProductDiv.addEventListener('mouseleave', () => {
                            if (window.innerWidth > MOBILE_WIDTH) {
                                this.restoreHighlighting();
                            }
                        });

                        this.productSection.appendChild(newProductDiv);


                        if (idx === 0) {
                            newProductDiv.classList.add('product--selected--mobile');
                            if (window.innerWidth <= MOBILE_WIDTH) {
                                this.checkProduct(newProductDiv);
                                this.highlightProduct(newProductDiv);
                            }
                        }

                        const selectorButton = document.createElement('button');
                        selectorButton.classList.add('product-selectors__button');
                        selectorButton.innerText = 'Varinate ' + (idx + 1);
                        if (idx === 0) {
                            selectorButton.classList.add('product-selectors__button--selected');
                        }
                        selectorButton.addEventListener('click', () => {
                            this.productSelectors.querySelectorAll('.product-selectors__button').forEach(button => {
                                button.classList.remove('product-selectors__button--selected');
                            });
                            selectorButton.classList.add('product-selectors__button--selected');
                            const allProductDivs = this.productSection.querySelectorAll('.product');
                            this.productSection.querySelectorAll('.product').forEach(productDiv => {
                                this.markAsUnselected(productDiv);
                            });
                            this.checkProduct(allProductDivs[idx]);
                            this.highlightProduct(allProductDivs[idx]);
                        });

                        this.productSelectors.appendChild(selectorButton);
                    });
                }

                checkProduct(newProductDiv) {
                    newProductDiv.querySelector(".product__selection").checked = true;
                    this.orderBtn.disabled = false;
                    this.orderBtn.classList.remove('order-button--inactive');
                }

                highlightProduct(newProductDiv) {
                    this.productSection.querySelectorAll('.product').forEach((productDiv, idx) => {
                        if (productDiv.querySelector('.product__selection').value === newProductDiv.querySelector('.product__selection').value) {
                            this.markAsSelected(productDiv, idx);
                        } else {
                            this.markAsUnselected(productDiv);
                        }
                    });
                }

                restoreHighlighting() {
                    let checked = false;
                    this.productSection.querySelectorAll('.product').forEach((productDiv, idx) => {
                        this.markAsUnselected(productDiv);

                        if (productDiv.querySelector(".product__selection").checked) {
                            checked = true;
                            this.markAsSelected(productDiv, idx);
                        }
                    });
                    if (!checked) {
                        this.productSection.querySelectorAll('.product').forEach(productDiv => {
                            productDiv.classList.remove('product--unselected');
                            productDiv.classList.remove('product--selected--mobile');
                        });
                        if (window.innerWidth <= MOBILE_WIDTH) {
                            let product = this.productSection.querySelectorAll('.product')[0];
                            product.classList.add('product--selected--mobile', 'product--selected');
                            product.querySelector(".product__selection").checked = true;
                        } else {
                            this.orderBtn.disabled = true;
                            this.orderBtn.classList.add('order-button--inactive')
                        }
                    }
                }

                markAsSelected(productDiv, idx) {
                    productDiv.classList.remove('product--unselected');
                    productDiv.classList.add('product--selected');
                    productDiv.classList.add('product--selected--mobile');
                    if (idx % 2 === 0) {
                        productDiv.classList.add('product--selected-left');
                    } else {
                        productDiv.classList.add('product--selected-right');
                    }
                }

                markAsUnselected(productDiv) {
                    productDiv.classList.add('product--unselected');
                    productDiv.classList.remove('product--selected');
                    productDiv.classList.remove('product--selected--mobile');
                    productDiv.classList.remove('product--selected-left');
                    productDiv.classList.remove('product--selected-right');
                }

                async addProductToOrder() {
                    const bifrostUri = this.bifrostUri;
                    const clientId = this.getAttribute('data-client-id');
                    const currency = "EUR";
                    // fetch uri with different path for POST call to set cookie
                    const selectedProduct = this.getSelectedProduct();
                    if (!(bifrostUri && this.getAttribute('data-device-price') && this.getAttribute('data-device-class') && this.getAttribute('data-shop-product-name') && selectedProduct && clientId)) {
                        this.remove();
                        throw new Error("order data incomplete: \n" +
                            "bifrostUri: " + bifrostUri + "\n" +
                            "devicePrice: " + this.getAttribute('data-device-price') + "\n" +
                            "deviceClass: " + this.getAttribute('data-device-class') + "\n" +
                            "clientId: " + clientId + "\n" +
                            "selectedProduct: " + selectedProduct + "\n",
                            "shopProductName: " + this.getAttribute('data-shop-product-name')
                        );
                    }
                    try {
                        const response = await fetchBifrost(bifrostUri + '/shoppingCart/' + clientId, 'POST', this.componentVersion, {
                            devicePrice: parseInt(this.getAttribute('data-device-price')),
                            deviceClass: this.getAttribute('data-device-class'),
                            productId: parseInt(selectedProduct),
                            deviceCurrency: currency,
                            shopProductName: this.getAttribute('data-shop-product-name')
                        });
                        if (response.status !== 200) {
                            console.error('Adding product to shopping cart failed:', response);
                            return {};
                        }

                        this.fadeout();
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }

                getSelectedProduct() {
                    return this.productSection.querySelector('.product--selected').querySelector('.product__selection').value;
                }

                fadeout() {
                    var fadeTarget = this.modal;
                    var fadeEffect = setInterval(function () {
                        if (!fadeTarget.style.opacity) {
                            fadeTarget.style.opacity = 1;
                        }
                        if (fadeTarget.style.opacity > 0) {
                            fadeTarget.style.opacity -= 0.05;
                        } else {
                            clearInterval(fadeEffect);
                            fadeTarget.remove();
                        }
                    }, 20);
                }
            }


            window.wertgarantieSelectionPopUpOpen = (popupId, configuredData = {}) => {
                const name = 'wertgarantie-selection-pop-up';
                if (!customElements.get(name)) {
                    customElements.define(name, WertgarantieSelectionPopUp);
                }
                customElements.whenDefined(name).then(() => {
                    const popup = document.querySelector(popupId);
                    if (popup) {
                        if (!popup.initialized) {
                            popup.initComponent(configuredData);
                            popup.initialized = true;
                        }
                        popup.open();
                    }
                });
            }
        }

    )()
    ;
} else {
    window.wertgarantieSelectionPopUpOpen = function () {
    }
}
*/
