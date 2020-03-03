import {LitElement, html} from 'lit-element';
import {confirmationStyling} from './confirmation-styling';
import fetchBifrost from "../../../shared-code/fetchBifrost";
import {classMap} from 'lit-html/directives/class-map';

class WertgarantieConfirmation extends LitElement {


    static get styles() {
        return confirmationStyling;
    }

    WertgarantieConfirmation() {
        this.componentVersion = '1.0.18';
    }

    connectedCallback() {
        this.clientId = this.getAttribute('data-client-id');
        this.bifrostUri = this.getAttribute('data-bifrost-uri') || "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
        this.formSelector = this.getAttribute('data-form-selector');
        this.initListeners();
    }

    setProperties(data) {
        this.headerTitle = data.headerTitle || 'Herzlichen Glückwunsch, Du hast den besten Schutz für Deinen Einkauf ausgewählt.';
        this.products = data.products;
        this.selectedProductIndex = 0;
        this.confirmText = data.confirmText || 'Bitte bestätige noch kurz:';
        this.generalConfirmationText = html`${data.generalConfirmationText}` || html`Ich akzeptiere die Allgemeinen Versicherungsbedingungen <a\href="https://stage-api.wertgarantie.com/download/5f6671a8-d1da-4668-a70a-f4f542f8a08a">(AVB)</a> und die Bestimmungen zum Datenschutz. Das gesetzliche Widerrufsrecht, die Produktinformationsblätter und die Vermittler-Erstinformation habe ich zur Kenntnis genommen und alle Dokumente heruntergeladen. Mit der Bestätigung der Checkbox erkläre ich mich damit einverstanden, dass mir alle vorstehenden Unterlagen an meine E-Mail-Adresse übermittelt werden. Der Übertragung meiner Daten an Wertgarantie stimme ich zu. Der Betrag wird separat per Rechnung bezahlt.`
        this.footerText = data.footerText || 'Nach dem Kauf erhalten Sie sowohl Ihr Zertifikat als auch die Rechnung der Wertgarantie per E-Mail.';
        this.moreInformationHtml = html`${data.moreInformationHtml}` || html`Mehr zum <a target="_blank" class="wg-link">Produkt</a> und der <a target="_blank" class="wg-link" href="http://www.example.com/">Wertgarantie</a>.`;
        this.pleaseConfirmText = 'Bitte bestätige die oben stehenden Bedingungen um fortzufahren.';
    }

    initListeners() {
        if (this.getAttribute('data-form-selector')) {
            var form = document.querySelector(this.getAttribute('data-form-selector'));
            form.addEventListener('submit', this.checkStateOnSubmit);
        }
    }

    checkStateOnSubmit(e) {
        if (!this.isFullyChecked()) {
            this.failedValidation = true;
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
            div.classList.add('');
        });
        this.shadowRoot.querySelector('.confirmation__footer--notification').style.display = 'block';
    }

    async fetchConfirmationComponentData() {
        const url = new URL(this.bifrostUri + '/components/confirmation');
        const response = await fetchBifrost(url, 'PUT', this.componentVersion);

        if (response.status !== 200) {
            return undefined;
        }

        return response.body;
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

    displayComponent() {
        this.fetchConfirmationComponentData()
            .then(this.productDataAvailable)
            .then(this.setProperties)
            .then(() => this.showComponent = true)
            .catch(error => this.showComponent = false)
    }

    renderProductPanel(classAttribute, product) {
        return html`
                    <div class="${classAttribute}">
                        <div class="product product--selected product--even"
                             style="--image-link-even:url(&quot;${product.imageUri}&quot;);">
                            <div>
                                <span class="payment-interval product__price-info--small">${product.paymentInterval}</span><br>
                                <span class="product-price product__price-info--strong">${product.price}</span><br>
                                <span class="product-tax product__price-info--small">${product.tax}</span>
                            </div>
                            <div>
                                <div class="product__title">${product.title}</div>
                                <ul class="product__advantages">
                                ${product.advantages.map(advantage => html`
                                    <li class="product__advantage"><span class="advantage__icon">${advantage}</span>
                                    </li>
                                   `)}
                                </ul>
                            </div>
                            <div>
                                <small class="product-link"><a class="wg-link" href="http://www.example.com">${product.informationSheetUri}</a></small><br>
                            </div>
                        </div>
                    </div>
       `;
    }

    toggleConfirmation(event) {
        if (event.target.checked) {
            return this.sendToggelConfirmationRequest('PUT');
        } else {
            return this.sendToggelConfirmationRequest('DELETE');
        }
    }

    async sendToggelConfirmationRequest(method) {
        const url = this.bifrostUri + '/components/confirmation/confirm';
        const response = await fetchBifrost(url, method, this.componentVersion);
        this.updateInputField(response);
    }

    renderValidationFailed() {
        return this.failedValidation ? html`
                        <div class="confirmation__footer confirmation__footer--notification" >
                            <strong>${this.pleaseConfirmText}</strong>
                        </div> ` : html``;
    }

    render() {
        if (!this.showComponent) {
            return html``;
        }
        //language=HTML
        return html`
            <div class="component" style="display: flex;">
                <section class="info">
                    <div class="header">
                        <div class="header__icon">
                            <i class="shield"></i>
                        </div>
                        <div class="header__title">
                            <span class="header__title__text">${this.headerTitle}</span>
                        </div>
                    </div>
                    <div class="product__tabs">
                    ${products.map((product, index) => html`
                        <div class="tab ?tab--selected=${index === this.selectedProductIndex}">
                            <div class="tab__name">${product.name}</div>
                            <div class="tab__remove">
                                ×
                            </div>
                        </div>
                    `)}
                    </div>
                    ${this.renderProductPanel('product__panel--mobile', products[this.selectedProductIndex])}
                    <div class="confirmation__section">
                        <div class="confirmation__header" id="please-confirm-text">${this.confirmText}</div>
                        <div class="confirmation__input">
                            <div class="confirmation__row">
                                <div class="confirmation__checkbox-column">
                                    <div class="checkbox__container ?confirmation--unchecked=${this.failedValidation}">
                                        <input @click="${event => this.toggleConfirmation(event)}" class="confirmation" id="confirmation_check" type="checkbox">
                                    </div>
                                </div>
                                <div class="confirmation__text" id="general-confirmation-text">${this.generalConfirmationText}</div>
                            </div>
                        </div>
                        <div class="confirmation__footer">
                            <strong>${this.footerText}</strong>
                        </div>
                        <div class="confirmation__footer">
                            <strong>${this.moreInformationHtml}</strong>
                        </div>
                        ${this.renderValidationFailed()}
                    </div>
                </section>
                    ${this.renderProductPanel('product__panel', products[this.selectedProductIndex])}
            </div>                   `;
    }
}


class WertgarantieConfirmation extends HTMLElement {


    setConfirmCheckbox(shoppingCart) {
        this.checkbox.checked = shoppingCart.confirmed;
        return shoppingCart;
    }


    updateInputField(response) {
        this.setHiddenInput(response.body.signedShoppingCart);
    }

    showComponent() {
        this.component.style.display = "flex";
    }


    setTextsAndHiddenInput(fetchedConfirmationComponentData) {
        this.headerTitle.textContent = fetchedConfirmationComponentData.title;
        this.pleaseConfirmText.textContent = fetchedConfirmationComponentData.confirmationHeader;
        this.generalConfirmationText.innerHTML = fetchedConfirmationComponentData.confirmationTextGeneral;
        this.setHiddenInput(fetchedConfirmationComponentData.signedShoppingCart);
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

        const result = await fetchBifrost(url, 'DELETE', this.componentVersion, {
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

}


class UndefinedConfirmationDataError extends Error {
}

window.customElements.define('wertgarantie-confirmation', WertgarantieConfirmation);
})
();
}
