const config = [
    {
        name: "selection-pop-up",
        sources: {
            js: 'https://cdn.jsdelivr.net/npm/wertgarantie-selection-popup@2.0.47/dist/selection-popup.min.js',
            css: 'https://cdn.jsdelivr.net/npm/wertgarantie-integrations@0.0.15/src/CwMobile/wertgarantie-selection-pop-up.css'
        },
        target: {
            pageSelector: '/shoppingCart',
            parentElementSelector: 'body'
        }
    },
    {
        name: "selection-embedded",
        sources: {
            js: 'https://cdn.jsdelivr.net/npm/wertgarantie-selection-embedded@0.0.19/dist/selection-embedded.min.js'
        },
        target: {
            pageSelector: '.dummy',
            parentElementSelector: '#here'
        }
    },
    {
        name: "confirmation",
        sources: {
            js: 'https://cdn.jsdelivr.net/npm/wertgarantie-confirmation@2.0.35/dist/confirmation.min.js'
        },
        target: {
            pageSelector: '/shoppingCart',
            parentElementSelector: '.confirmation-container',
            validation: {
                inputSelector: '#checkout-form',
                event: 'submit'
            }
        }
    }
];

function init(shopConfig) {
    config.map(componentConfig => {
        import(componentConfig.sources.js);
        if (document.location.pathname.match(componentConfig.target.pageSelector)) {
            const parentElement = document.querySelector(componentConfig.target.parentElementSelector);
            if (parentElement) {
                includeComponent(componentConfig.name, parentElement, componentConfig.sources.css, shopConfig, componentConfig.target);
            }
        }
    });
}

function includeComponent(name, parentElement, cssSrcPath, shopConfig, componentConfigTarget) {
    const mapping = {
        "selection-pop-up": includeSelectionPopUp,
        "selection-embedded": includeSelectionEmbedded,
        "confirmation": includeConfirmation
    };
    mapping[name](parentElement, cssSrcPath, shopConfig, componentConfigTarget)
}

function includeSelectionPopUp(parentElement, cssSrcPath, shopConfig) {
    if (cssSrcPath) {
        const linkElem = document.createElement('link');
        linkElem.rel = 'stylesheet';
        linkElem.href = cssSrcPath;
        parentElement.appendChild(linkElem);
    }
    const container = document.createElement('div');
    const selectionPopUpElement = document.createElement('wertgarantie-selection-pop-up');
    const product = shopConfig.cartProducts[shopConfig.cartProducts.length - 1];
    selectionPopUpElement.setAttribute('data-bifrost-uri', 'http://localhost:3000/wertgarantie');
    selectionPopUpElement.setAttribute('data-client-id', shopConfig.id);
    selectionPopUpElement.setAttribute('data-device-price', product.price);
    selectionPopUpElement.setAttribute('data-display-self', true);
    selectionPopUpElement.setAttribute('data-device-classes', product.deviceClasses);
    selectionPopUpElement.setAttribute('data-product-name', product.name);
    container.appendChild(selectionPopUpElement);
    parentElement.appendChild(container);
}

function includeSelectionEmbedded(parentElement, cssSrcPath, shopConfig) {
    if (cssSrcPath) {
        const linkElem = document.createElement('link');
        linkElem.rel = 'stylesheet';
        linkElem.href = cssSrcPath;
        parentElement.appendChild(linkElem);
    }
    const container = document.createElement('div');
    const selectionEmbeddedElement = document.createElement('wertgarantie-selection-embedded');
    selectionEmbeddedElement.setAttribute('data-bifrost-uri', 'http://localhost:3000/wertgarantie');
    selectionEmbeddedElement.setAttribute('data-client-id', shopConfig.id);
    selectionEmbeddedElement.setAttribute('data-device-price', shopConfig.displayedProduct.price);
    selectionEmbeddedElement.setAttribute('data-device-classes', shopConfig.displayedProduct.deviceClasses);
    selectionEmbeddedElement.setAttribute('data-product-name', shopConfig.displayedProduct.name);
    selectionEmbeddedElement.setAttribute('data-product-base-identifier', shopConfig.displayedProduct.name);
    selectionEmbeddedElement.setAttribute('data-complete-product-name', shopConfig.displayedProduct.name);
    container.appendChild(selectionEmbeddedElement);
    parentElement.appendChild(container);
}

function includeConfirmation(parentElement, cssSrcPath, shopConfig, componentConfigTarget) {
    if (cssSrcPath) {
        const linkElem = document.createElement('link');
        linkElem.rel = 'stylesheet';
        linkElem.href = cssSrcPath;
        parentElement.appendChild(linkElem);
    }
    const container = document.createElement('div');
    const confirmationElement = document.createElement('wertgarantie-confirmation');
    confirmationElement.setAttribute('data-client-id', shopConfig.id);
    confirmationElement.setAttribute('data-bifrost-uri', 'http://localhost:3000/wertgarantie');
    confirmationElement.setAttribute('data-validation-trigger-selector', componentConfigTarget.validation.inputSelector);
    confirmationElement.setAttribute('data-validation-trigger-event', componentConfigTarget.validation.event);
    container.appendChild(confirmationElement);
    parentElement.appendChild(container);
}

function includeAfterSales(parentElement, cssSrcPath, shopConfig) {

    if (cssSrcPath) {
        const linkElem = document.createElement('link');
        linkElem.rel = 'stylesheet';
        linkElem.href = cssSrcPath;
        parentElement.appendChild(linkElem);
    }
    const container = document.createElement('div');
    const confirmationElement = document.createElement('wertgarantie-confirmation');
    confirmationElement.setAttribute('data-client-id', shopConfig.id);
    confirmationElement.setAttribute('data-bifrost-uri', 'http://localhost:3000/wertgarantie');
    confirmationElement.setAttribute('data-validation-trigger-selector', 'TODO');
    container.appendChild(confirmationElement);
    parentElement.appendChild(container);
}

export default init;
