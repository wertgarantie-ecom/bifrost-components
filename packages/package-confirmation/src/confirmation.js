(function () {

    const template = document.createElement('template');
    template.innerHTML = `
        <style>

            :host {
                font-family: var(--wertgarantie-popup-font-family, Arial, Helvetica), sans-serif;
            }

            .component {
                max-width: 1100px;            
                display: flex;
                background-color: white;
            }

            .info {
                flex: 2;
                padding: 1em;
            }

            .product__panel {
                flex: 1;
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
                top:30%;
                left:30%;
            }

            .header__title {
                flex: 12.5;
                padding: 1em;
                text-align: center;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 0.7em;
                line-height: 26px;
            }

            .header__title__text {
                vertical-align: middle;
            }

            .product__tabs {
                padding-top: 1em;
                padding-left: 50px;
                display: flex;
                flex-direction: row;
            }

            .tab {
                border: 1px solid rgb(230, 230, 230);
                padding: 0.8em;
                width: 18%;
                margin-right: 1.5em;
                font-size: 0.8em;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
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

            .confirmation__checkbox {
                min-width: 40px;
                padding-left: 10px;
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
    
        </style>

        <div class="component">
            <section class="info">
                <div class="header">
                    <div class="header__icon">
                        <i class="shield"></i>
                    </div>
                    <div class="header__title">
                        <span class="header__title__text">Herzlichen Glückwunsch, du hast den bestmöglichen Schutz für dein Bike ausgewählt.</span>
                    </div>
                </div>
                <div class="product__tabs"> 
                </div>
                <div class="confirmation__header">
                    Bitte bestätige noch kurz:
                </div>
                <div class="confirmation__row">
                    <div class="confirmation__checkbox">
                        <input type="checkbox" />
                    </div>
                    <div class="confirmation__text">
                        Ich akzeptiere die Allgemeinen Versicherungsbedingungen (AVB) und die Bestimmungen zum Datenschutz. 
                        Das gesetzliche Widerrufsrecht, das Produktinformationsblatt (IPID) und die Vermittler-Erstinformation habe ich zur 
                        Kenntnis genommen und alle Dokumente heruntergeladen. Mit der Bestätigung der Checkbox erkläre ich mich damit einverstanden, 
                        dass mir alle vorstehenden Unterlagen an meine E-Mail-Adresse übermittelt werden. Der Übertragung meiner Daten an Wertgarantie 
                        stimme ich zu. Der Betrag wird separat per Rechnung bezahlt.
                    </div>
                </div>
                <div class="confirmation__row">
                    <div class="confirmation__checkbox">
                        <input type="checkbox" />
                    </div>
                    <div class="confirmation__text">
                        Ich bestätige, dass ich ein Fahrradschloss mit einem Mindestkaufpreis von 49,00 € zur Sicherung meines Fahrrads nutzen werde.
                    </div>
                </div>
                <div class="confirmation__footer">
                    <strong>Mehr zum <a target="_blank" class="wg-link">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.</strong>
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
        <small class="product-link"><a class="wg-link" href="http://www.example.com">Allgemeine Versicherungsbedingungen</a></small>
    </div>`

    class WertgarantieConfirmation extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            // element selectors
            this.productTabs = this.shadowRoot.querySelector('.product__tabs');
            this.productPanel = this.shadowRoot.querySelector('.product__panel');

            // method binding
            this.fetchShoppingCartData = this.fetchShoppingCartData.bind(this);
            this.productDataAvailable = this.productDataAvailable.bind(this);
            this.prepareTabs = this.prepareTabs.bind(this);
            this.fetchProductData = this.fetchProductData.bind(this);
            this.prepareProductPanels = this.prepareProductPanels.bind(this);
            this.connectTabsAndProductPanels = this.connectTabsAndProductPanels.bind(this);
        }

        set clientId(clientId) {
            this.setAttribute("data-client-id", clientId);
        }

        set bifrostUri(bifrostUri) {
            this.setAttribute("data-bifrost-uri", bifrostUri);
        }

        connectedCallback() {
            this.fetchShoppingCartData()
            .then(this.productDataAvailable)
            .then(this.prepareTabs)
            .then(this.fetchProductData)
            .then(this.prepareProductPanels)
            .then(this.connectTabsAndProductPanels);
        }

        async fetchShoppingCartData() {
            try {
                const response = await fetch(this.getAttribute('data-bifrost-uri') + '/shoppingCart/' + this.getAttribute('data-client-id'), {
                    method: 'GET',
                    credentials: 'include'
                });
                var responseJson = await response.json();
                return responseJson;
            } catch (e) {
                console.error("Error while fetching shoppingCartData: ", e)
                return {};
            }
        }

        productDataAvailable(fetchedShoppingCart) {
            if (!fetchedShoppingCart || fetchedShoppingCart.constructor !== Object || Object.entries(fetchedShoppingCart).length === 0) {
                this.remove();
                throw new Error("No product selection has been made for this client id")
            }
            return fetchedShoppingCart;
        }

        prepareTabs(fetchedShoppingCart) {
            fetchedShoppingCart.products.forEach((product, idx) => {
                // erstelle Tab pro produkt mit Produkt-Namen.
                const productTab = document.createElement('div');
                productTab.classList.add('tab');
                if (idx == 0) {
                    productTab.classList.add('tab--selected');
                }
                productTab.innerHTML = productTabTemplate;
                productTab.querySelector('.tab__name').innerHTML = product.shopProductName;

                this.productTabs.appendChild(productTab);
            });
            return fetchedShoppingCart;
        }

        async fetchProductData(fetchedShoppingCart) {
            var products = [];
            for (var i = 0; i < fetchedShoppingCart.products.length; i++) {
                var productDetail = await this.fetchProduct(fetchedShoppingCart.products[i]);
                products.push(productDetail);
            }
            return products;
        }

        prepareProductPanels(products) {
            products.forEach((product, idx) => {
                // erstelle product-panel pro produkt mit Versicherungsproduktdaten 
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                if (idx === 0) {
                    productDiv.classList.add('product--selected')
                }
                if (idx % 2 === 0) {
                    productDiv.classList.add('product--even');
                    productDiv.style.setProperty("--image-link-even", "url('" + product.imageLink + "')");
                } else {
                    productDiv.classList.add('product--odd');
                    productDiv.style.setProperty("--image-link-odd", "url('" + product.imageLink + "')");
                }
                productDiv.innerHTML = productDivTemplate;
                productDiv.querySelector('.payment-interval').textContent = product.paymentInterval;
                productDiv.querySelector('.product-price').textContent = product.price + product.currency;
                productDiv.querySelector('.product-tax').textContent = product.taxFormatted;

                productDiv.querySelector('.product__title').textContent = product.name;

                product.top_3.forEach(advantage => {
                    const listElement = document.createElement('li');
                    listElement.classList.add('product__advantage');
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('advantage__icon');
                    spanElement.textContent = advantage;
                    listElement.appendChild(spanElement);
                    productDiv.querySelector('.product__advantages').appendChild(listElement);
                })
                this.productPanel.appendChild(productDiv);
            });
        }

        async fetchProduct(product) {
            const url = new URL(this.getAttribute('data-bifrost-uri')  + '/product');
            const queryParams = {
                deviceClass: product.deviceClass,
                devicePrice: product.devicePrice,
                productId: product.productId,
                clientId: this.getAttribute('data-client-id')
            }
            Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
            const response = await fetch(url);
            return await response.json();
        }

        connectTabsAndProductPanels() {
            var tabs = this.productTabs.querySelectorAll('.tab');
            var productPanels = this.productPanel.querySelectorAll('.product');

            tabs.forEach((tab, idx) => {
                tab.addEventListener('click', () => {
                    tabs.forEach(tab => tab.classList.remove('tab--selected'))
                    tab.classList.add('tab--selected');

                    productPanels.forEach(panel => panel.classList.remove('product--selected'));

                    productPanels[idx].classList.add('product--selected');
                })
            });
        }
    }

    window.customElements.define('wertgarantie-confirmation', WertgarantieConfirmation);
})();