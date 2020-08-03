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
    },
    {
        name: "after-sales",
        sources: {
            js: 'https://cdn.jsdelivr.net/npm/wertgarantie-after-sales@1/dist/after-sales.min.js'
        },
        target: {
            pageSelector: '/checkout',
            parentElementSelector: 'body',
        }
    }
];

const version = "1.0.0";
let bifrostUri;

function setBifrostUri(stage = 'production') {
    const prodUri = "https://ecommerce.wertgarantie.com/wertgarantie";
    switch (stage) {
        case 'production':
            bifrostUri = prodUri;
            return;
        case 'staging':
            bifrostUri = "https://wertgarantie-bifrost-staging.herokuapp.com/wertgarantie";
            return;
        case 'dev':
            bifrostUri = "https://wertgarantie-bifrost-dev.herokuapp.com/wertgarantie";
            return;
        case 'local':
            bifrostUri = "http://localhost:3000/wertgarantie";
            return;
        default:
            bifrostUri = prodUri;
    }
}

function init(shopConfig) {
    setBifrostUri(shopConfig.stage);
    // const fetchUri = getFetchUri(shopConfig.stage);
    // fetch(`${fetchUri}/client/...`);
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
        "confirmation": includeConfirmation,
        "after-sales": includeAfterSales
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
    selectionPopUpElement.setAttribute('data-bifrost-uri', bifrostUri);
    selectionPopUpElement.setAttribute('data-client-id', shopConfig.id);
    selectionPopUpElement.setAttribute('data-device-price', product.price);
    selectionPopUpElement.setAttribute('data-display-self', true);
    selectionPopUpElement.setAttribute('data-device-classes', product.deviceClasses);
    selectionPopUpElement.setAttribute('data-product-name', product.name);
    selectionPopUpElement.setAttribute('data-order-item-id', product.sku);
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
    selectionEmbeddedElement.setAttribute('data-bifrost-uri', bifrostUri);
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
    confirmationElement.setAttribute('data-bifrost-uri', bifrostUri);
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

    const purchasesProducts = shopConfig.cartProducts.map(cartProduct => {
        return {
            price: cartProduct.price,
            manufacturer: cartProduct.manufacturer,
            deviceClasses: cartProduct.deviceClasses,
            name: cartProduct.name,
            orderItemId: cartProduct.sku
        }
    });

    const shopPurchaseData = {
        purchasedProducts: purchasesProducts,
        customer: shopConfig.customer,
        encryptedSessionId: shopConfig.encryptedSessionId
    };
    const container = document.createElement('div');
    const afterSales = document.createElement('wertgarantie-after-sales');
    afterSales.setAttribute('data-client-id', shopConfig.id);
    afterSales.setAttribute('data-bifrost-uri', bifrostUri);
    afterSales.setAttribute('data-shop-purchase-data', btoa(JSON.stringify(shopPurchaseData)));
    container.appendChild(afterSales);
    parentElement.appendChild(container);
}

export default init;
