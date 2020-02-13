// import { bodyParser } from "restify";
if (window.customElements) {
    (function () {
        const BIFROST_URI = "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        const SHOPPING_CART_DELETE_HEADER = 'X-wertgarantie-shopping-cart-delete';
        const COOKIE_NAME = 'wertgarantie-shopping-cart';
        const template = document.createElement('template');
        template.innerHTML = `
        <style>

            :host {
                font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
            }

            .component {
                max-width: 1100px;            
                display: none;
                background-color: white;
            }

            .info {
                width: 65%;
                padding: 1em;
            }

            .product__panel {
                width: 35%;
            }

            .product__panel--mobile {
                display: none;
            }

            .header {
                display: flex;
                width: 100%;
                background-color: rgb(230, 230, 230);
            }

            .header__icon {
                flex: 1;
                min-width: 50px;
                background-color: rgb(50, 50, 50);
                color: white;
                text-align: center;
                position: relative;
            }

            .shield::after {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                display: inline-block; 
                font-style: normal;
                font-family: "Font Awesome 5 Free", sans-serif;
                font-weight: 700;
                font-size: 20px;
                content: "\\F3ED";
                position: absolute;
                top:10%;
                left:30%;
            }

            .header__title {
                flex: 12.5;
                padding: 1em;
                text-align: center;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 0.7em;
                line-height: 1.2em;
            }

            .header__title__text {
                vertical-align: middle;
            }

            .product__tabs {
                padding-top: 1em;
                padding-left: 50px;
                display: flex;
                flex-wrap: wrap;
            }

            .tab {
                border: 1px solid rgb(230, 230, 230);
                padding: 0.8em;
                width: 18%;
                min-width: 80px;
                margin-right: 1.5em;
                margin-bottom: 1em;
                font-size: 0.8em;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                vertical-align: middle;
            }
            
            .tab__name {
                flex: 4;
            }
            
            .tab__remove {
                cursor: pointer;
                flex: 0.5;
            }

            .tab:hover {
                background-color: rgb(230, 230, 230);
            }

            .tab--selected {
                background-color: rgb(230, 230, 230);
            }

            .remove-product {
                cursor: pointer;
                font-size: 1em;
            }

            .confirmation__header {
                padding-top: 1.5em;
                padding-left: 50px;
                font-weight: 700;
                font-size: 0.8em;
                text-transform: uppercase;
            }

            .confirmation__row {
                padding-top: 1em;
                display: flex;

            }

            .confirmation__checkbox-column {
                min-width: 40px;
                padding-left: 10px;
                
            }

            .checkbox__container {
                margin-left: 2px;
                margin-right: 2px;
                display: flex;
                justify-content: center;
            }


            .confirmation--unchecked {
                border: 2px solid red;
            }

            .confirmation__text {
                width: auto;
                font-size: 0.8em;
            }

            .confirmation__footer {
                padding-top: 1.5em;
                padding-left: 50px;
                font-weight: 700;
                font-size: 0.7em;
            }

            .confirmation__footer--notification {
                display: none;
                color: red;
            }

            .product {
                display: none;
                flex-direction: column;
                justify-content: space-between;
                padding: 1em;
                color: white;
            }

            .product--selected {
                display: block;
            }

            .product--even {
                --image-link-even: linear-gradient(to top right, #006EFF, rgba(81,61,61,0));
                background-image: var(--wertgarantie-popup-product-background-even, 
                    linear-gradient(to bottom right, rgba(0,0,0,0), #000),
                    linear-gradient(to top right, #006EFF, rgba(81,61,61,0))),
                    var(--image-link-even);
                background-size: cover;
            }

            .product--odd {
                --image-link-odd: linear-gradient(to top right, rgba(0,0,0,0), #000);
                background-image: var(--wertgarantie-popup-product-background-odd,
                    linear-gradient(to bottom right, rgba(81,61,61,0), rgba(255, 145, 0, 0.6)),
                    linear-gradient(to top right, rgba(0,0,0,0), #000)),
                    var(--image-link-odd);
                background-size: cover;
            }

            .product__price-info--small {
                font-size: 0.7em;
                opacity: 0.7;
            }

            .product__price-info--strong {
                font-weight: 700;
                font-size: 0.9em;
            }

            .product__title {
                padding-top: 6em;
                text-transform: uppercase;
                font-weight: 800;
            }

            .product__advantages {
                list-style-type: none;
                padding-inline-start: 1.5em;
            }

            .product__advantage {
                font-size: 0.8em;
                padding-top: 0.7em;
            }

            .advantage__icon::before {
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                display: inline-block; 
                font-family: "Font Awesome 5 Free", sans-serif;
                font-weight: 700;
                margin:0 0.5em 0 -1.5em;
                content: "\\F00C";
            }

            .wg-link {
                text-decoration: none;
                color: #39f;
            }

            .product-link {
                font-size: 0.65em;
            }

            @media only screen and (max-width: 768px) {
                .component {
                    width: 100%;
                    max-width: 500px;            
                }

                .info {
                    width: 100%;
                    padding: 0;
                }

                .header__title {
                    line-height: 1em;
                    text-align: left;
                }

                .product__tabs {
                    padding-left: 1em;
                }

                .product__panel {
                    display: none;
                }

                .product__panel--mobile {
                    display: block;
                }

                .confirmation__section {
                    padding-right: 1em;
                    padding-bottom: 1em;
                }

                .confirmation__header {
                    padding-left: 2em;
                }

            }
    
        </style>

        <div class="component">
            <section class="info">
                <div class="header">
                    <div class="header__icon">
                        <i class="shield"></i>
                    </div>
                    <div class="header__title">
                        <span class="header__title__text">Herzlichen Glückwunsch, du hast den besten Schutz für deinen Einkauf ausgewählt.</span>
                    </div>
                </div>
                <div class="product__tabs"> 
                </div>
                <div class="product__panel--mobile">
                </div>
                <div class="confirmation__section">
                    <div class="confirmation__header" id="please-confirm-text">
                    </div>
                    <div class="confirmation__input">
                        <div class="confirmation__row">
                            <div class="confirmation__checkbox-column">
                                <div class="checkbox__container">
                                    <input class="confirmation" id="confirmation_check" type="checkbox" />
                                </div>
                            </div>
                            <div class="confirmation__text" id="general-confirmation-text">
                            </div>
                        </div>
                    </div>
                    <div class="confirmation__footer">
                        <strong>Nach dem Kauf erhalten Sie sowohl Ihr Zertifikat als auch die Rechnung der Wertgarantie per E-Mail.</strong>
                    </div>
                    <div class="confirmation__footer">
                        <strong>Mehr zum <a target="_blank" class="wg-link">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.</strong>
                    </div>
                    <div class="confirmation__footer confirmation__footer--notification">
                        <strong>Bitte bestätige die oben stehenden Bedingungen um fortzufahren.</strong>
                    </div>
                </div>
            </section>
            <div class="product__panel">
            </div>
        </div>
    `;

        const productTabTemplate =
            `<div class="tab__name">
        </div>
        <div class="tab__remove">
            &times;
        </div>`;

        const productDivTemplate =
            `<div>
            <span class="payment-interval product__price-info--small">monatlich</span><br/>
            <span class="product-price product__price-info--strong">X,XX €</span><br/>
            <span class="product-tax product__price-info--small">(inkl. x,xx€ VerSt**)</span>
        </div>
        <div>
            <div class="product__title">Fahrrad Komplettschutz Basis</div>
            <ul class="product__advantages">
            </ul>
        </div>
        <div>
            <small class="product-link"><a class="wg-link" href="http://www.example.com">Informationsblatt zu Versicherungsprodukten</a></small><br/>
        </div>`;

        const bikeLockConfirmationTemplate =
            `<div class="confirmation__checkbox">
            <div class="confirmation__checkbox-column">
                <div class="checkbox__container">
                    <input class="confirmation" type="checkbox" />
                </div>
            </div>
        </div>
        <div class="confirmation__text">
            Ich bestätige, dass ich ein Fahrradschloss mit einem Mindestkaufpreis von 49,00 € zur Sicherung meines Fahrrads nutzen werde.
        </div>`;

        class WertgarantieConfirmation extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({mode: 'open'});

                // method binding
                this.fetchConfirmationComponentData = this.fetchConfirmationComponentData.bind(this);
                this.initListeners = this.initListeners.bind(this);
                this.productDataAvailable = this.productDataAvailable.bind(this);
                this.initElementSelectors = this.initElementSelectors.bind(this);
                this.refreshShadowRoot = this.refreshShadowRoot.bind(this);
                this.setTextsAndHiddenInput = this.setTextsAndHiddenInput.bind(this);
                this.setHiddenInput = this.setHiddenInput.bind(this);
                this.prepareTabs = this.prepareTabs.bind(this);
                this.prepareProductPanels = this.prepareProductPanels.bind(this);
                this.connectTabsAndProductPanels = this.connectTabsAndProductPanels.bind(this);
                this.deleteProductOrder = this.deleteProductOrder.bind(this);
                this.showComponent = this.showComponent.bind(this);
                this.setConfirmCheckbox = this.setConfirmCheckbox.bind(this);
                this.isFullyChecked = this.isFullyChecked.bind(this);
                this.setUncheckedWarning = this.setUncheckedWarning.bind(this);
                this.checkStateOnSubmit = this.checkStateOnSubmit.bind(this);
                this.getCookieValue = this.getCookieValue.bind(this);
                this.updateInputField = this.updateInputField.bind(this);
                this.setWertgarantieShoppingCartCookie = this.setWertgarantieShoppingCartCookie.bind(this);
                this.fetchFromBifrost = this.fetchFromBifrost.bind(this);
                this.componentVersion = '1.0.17';
            }

            initElementSelectors() {
                this.productTabs = this.shadowRoot.querySelector('.product__tabs');
                this.productPanel = this.shadowRoot.querySelector('.product__panel');
                this.productPanelMobile = this.shadowRoot.querySelector('.product__panel--mobile');
                this.component = this.shadowRoot.querySelector('.component');
                this.checkbox = this.shadowRoot.querySelector('#confirmation_check');
                this.headerTitle = this.shadowRoot.querySelector('.header__title__text');
                this.generalConfirmationText = this.shadowRoot.querySelector('#general-confirmation-text');
                this.pleaseConfirmText = this.shadowRoot.querySelector('#please-confirm-text');
            }

            set clientId(clientId) {
                this.setAttribute("data-client-id", clientId);
            }

            get clientId() {
                return this.getAttribute("data-client-id");
            }

            set bifrostUri(bifrostUri) {
                this.setAttribute("data-bifrost-uri", bifrostUri);
            }

            get bifrostUri() {
                return this.getAttribute("data-bifrost-uri") || BIFROST_URI;
            }

            set hiddenInputSelector(wgProductInput) {
                this.setAttribute("data-hidden-input-selector", wgProductInput);
            }

            get hiddenInputSelector() {
                return this.getAttribute("data-hidden-input-selector");
            }

            connectedCallback() {
                const data = this.fetchConfirmationComponentData();
                this.refreshComponent(data);
            }

            refreshComponent(componentData) {
                componentData
                    .then(this.productDataAvailable)
                    .then(this.refreshShadowRoot)
                    .then(this.setConfirmCheckbox)
                    .then(this.setTextsAndHiddenInput)
                    .then(this.setWertgarantieShoppingCartCookie)
                    .then(this.prepareTabs)
                    .then(this.prepareProductPanels)
                    .then(this.connectTabsAndProductPanels)
                    .then(this.showComponent)
                    .then(this.initListeners)
                    .catch(error => {
                        if (!(error instanceof UndefinedConfirmationDataError)) {
                            console.error(error);
                        }
                        this.remove();
                    });
            }

            initListeners() {
                this.checkbox.addEventListener("click", event => {
                    if (event.target.checked) {
                        this.sendConfirmation();
                    } else {
                        this.rejectConfirmation();
                    }
                });

                if (this.getAttribute('data-form-selector')) {
                    var form = document.querySelector(this.getAttribute('data-form-selector'));
                    form.addEventListener('submit', this.checkStateOnSubmit);
                }
            }

            setConfirmCheckbox(shoppingCart) {
                this.checkbox.checked = shoppingCart.confirmed;
                return shoppingCart;
            }


            async sendConfirmation() {
                const url = this.bifrostUri + '/components/confirmation/confirm';
                const response = await this.fetchFromBifrost(url, 'PUT');
                this.updateInputField(response);
                // TODO: Was soll passieren, wenn call fehlschlägt?
            }


            async rejectConfirmation() {
                const url = this.bifrostUri + '/components/confirmation/confirm';
                const response = await this.fetchFromBifrost(url, 'DELETE');
                this.updateInputField(response)
                // TODO: Was soll passieren, wenn call fehlschlägt? --> Nachricht: Service aktuell nicht verfügbar?
            }

            updateInputField(response) {
                this.setHiddenInput(response.body.signedShoppingCart);
            }

            showComponent() {
                this.component.style.display = "flex";
            }

            async fetchConfirmationComponentData() {
                const url = new URL(this.bifrostUri + '/components/confirmation');
                const response = await this.fetchFromBifrost(url, 'PUT');

                if (response.status !== 200) {
                    return undefined;
                }

                return response.body;
            }

            getCookieValue(cookieName) {
                var cookieContent = document.cookie.match('(^|[^;]+)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
                return cookieContent ? JSON.parse(cookieContent.pop()) : undefined;
            }

            productDataAvailable(fetchedConfirmationComponentData) {
                if (!fetchedConfirmationComponentData ||
                    fetchedConfirmationComponentData.constructor !== Object ||
                    Object.entries(fetchedConfirmationComponentData).length === 0 ||
                    fetchedConfirmationComponentData.products.length === 0) {
                    throw new UndefinedConfirmationDataError("fetchedConfirmationData is empty or undefined");
                }
                return fetchedConfirmationComponentData;
            }

            setTextsAndHiddenInput(fetchedConfirmationComponentData) {
                this.headerTitle.textContent = fetchedConfirmationComponentData.title;
                this.pleaseConfirmText.textContent = fetchedConfirmationComponentData.confirmationHeader;
                this.generalConfirmationText.innerHTML = fetchedConfirmationComponentData.confirmationTextGeneral;
                this.setHiddenInput(fetchedConfirmationComponentData.signedShoppingCart);
                return fetchedConfirmationComponentData;
            }

            setWertgarantieShoppingCartCookie(fetchedConfirmationComponentData) {
                document.cookie = `${COOKIE_NAME}=${JSON.stringify(fetchedConfirmationComponentData.signedShoppingCart)}`;
                return fetchedConfirmationComponentData;
            }

            setHiddenInput(wertgarantieSignedShoppingCart) {
                const hiddenInputField = document.querySelector(this.getAttribute("data-hidden-input-selector"));
                hiddenInputField.value = btoa(JSON.stringify(wertgarantieSignedShoppingCart));
            }

            prepareTabs(fetchedConfirmationComponentData) {
                fetchedConfirmationComponentData.products.forEach((product, idx) => {
                    const productTab = document.createElement('div');
                    productTab.orderId = product.orderId;
                    productTab.classList.add('tab');
                    if (idx === 0) {
                        productTab.classList.add('tab--selected');
                    }
                    productTab.innerHTML = productTabTemplate;
                    productTab.querySelector('.tab__name').innerHTML = product.shopProductShortName;

                    var removeTabBtn = productTab.querySelector('.tab__remove');

                    removeTabBtn.addEventListener('click', () => {
                        const data = this.deleteProductOrder(product);
                        this.refreshComponent(data);
                    });

                    this.productTabs.appendChild(productTab);
                });
                return fetchedConfirmationComponentData;
            }

            refreshShadowRoot(fetchedConfirmationComponentData) {
                const oldChild = this.shadowRoot.querySelector('.component');
                if (oldChild) {
                    this.shadowRoot.replaceChild(template.content.cloneNode(true), oldChild);
                } else {
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                }

                this.initElementSelectors();
                return fetchedConfirmationComponentData;
            }


            async deleteProductOrder(product) {
                const url = new URL(this.bifrostUri + '/components/confirmation/product');

                const result = await this.fetchFromBifrost(url, 'DELETE', {
                    orderId: product.orderId
                });

                return result.body;
            }

            prepareProductPanels(fetchedConfirmationComponentData) {
                fetchedConfirmationComponentData.products.forEach((product, idx) => {
                    this.productPanel.appendChild(this.createProductDiv(product, idx));
                    this.productPanelMobile.appendChild(this.createProductDiv(product, idx));
                });
            }

            createProductDiv(product, idx) {
                const productDiv = document.createElement('div');
                productDiv.orderId = product.orderId;
                productDiv.classList.add('product');
                if (idx === 0) {
                    productDiv.classList.add('product--selected')
                }
                if (idx % 2 === 0) {
                    productDiv.classList.add('product--even');
                    productDiv.style.setProperty("--image-link-even", "url('" + product.productBackgroundImageLink + "')");
                } else {
                    productDiv.classList.add('product--odd');
                    productDiv.style.setProperty("--image-link-odd", "url('" + product.productBackgroundImageLink + "')");
                }
                productDiv.innerHTML = productDivTemplate;
                productDiv.querySelector('.payment-interval').textContent = product.paymentInterval;
                productDiv.querySelector('.product-price').textContent = product.price;
                productDiv.querySelector('.product-tax').textContent = product.includedTax;

                productDiv.querySelector('.product__title').textContent = product.productTitle;

                product.top3.forEach(advantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('product__advantage');
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon');
                    spanElement.textContent = advantage;
                    listElement.appendChild(spanElement);
                    productDiv.querySelector('.product__advantages').appendChild(listElement);
                });
                return productDiv;
            }

            connectTabsAndProductPanels() {
                var tabs = this.productTabs.querySelectorAll('.tab');
                var productPanels = this.productPanel.querySelectorAll('.product');
                var mobileProductPanels = this.productPanelMobile.querySelectorAll('.product');

                tabs.forEach((tab, idx) => {
                    tab.addEventListener('click', () => {
                        tabs.forEach(tab => tab.classList.remove('tab--selected'));
                        tab.classList.add('tab--selected');

                        productPanels.forEach(panel => panel.classList.remove('product--selected'));
                        mobileProductPanels.forEach(panel => panel.classList.remove('product--selected'));

                        productPanels[idx].classList.add('product--selected');
                        mobileProductPanels[idx].classList.add('product--selected');
                    });
                });
            }

            checkStateOnSubmit(e) {
                if (!this.isFullyChecked()) {
                    this.setUncheckedWarning();
                    e.preventDefault();
                    return false;
                }
            }

            isFullyChecked() {
                const checkboxes = this.shadowRoot.querySelectorAll('.confirmation'); // all checkboxes must have confirmation class (dynamic validation fields)
                let fullyChecked = true;
                checkboxes.forEach(box => {
                    if (!box.checked) {
                        fullyChecked = false;
                    }
                });
                return fullyChecked;
            }

            setUncheckedWarning() {
                const checkboxDiv = this.shadowRoot.querySelectorAll('.checkbox__container');
                checkboxDiv.forEach(div => {
                    div.classList.add('confirmation--unchecked');
                });
                this.shadowRoot.querySelector('.confirmation__footer--notification').style.display = 'block';
            }

            async fetchFromBifrost(url, method, body = {}) {
                const signedShoppingCart = this.getCookieValue(COOKIE_NAME);
                if (signedShoppingCart) {
                    body.signedShoppingCart = signedShoppingCart;
                }
                const result = await fetch(url, {
                    method: method,
                    headers: {
                        "credentials": 'include',
                        'content-Type': 'application/json',
                        'X-Version': this.componentVersion
                    },
                    body: JSON.stringify(body)
                });

                if (result.headers.get(SHOPPING_CART_DELETE_HEADER)) {
                    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
                }

                let responseJson = undefined;
                if (result.status === 200) {
                    responseJson = await result.json();
                    if (responseJson.signedShoppingCart) {
                        document.cookie = `${COOKIE_NAME}=${JSON.stringify(responseJson.signedShoppingCart)}`
                    }
                }
                return {
                    headers: result.headers,
                    status: result.status,
                    body: responseJson
                };
            }
        }

        class UndefinedConfirmationDataError extends Error {
        }

        window.customElements.define('wertgarantie-confirmation', WertgarantieConfirmation);
    })();
}
