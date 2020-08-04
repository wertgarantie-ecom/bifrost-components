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
        case 'dockerlocal':
            bifrostUri = "http://localhost:3000/wertgarantie";
            return;
        default:
            bifrostUri = prodUri;
    }
}

async function init(shopConfig) {
    if (!shopConfig) {
        throw new Error('no shop configuration provided');
    }
    setBifrostUri(shopConfig.stage);
    const response = await fetch(`${bifrostUri}/ecommerce/clients/${shopConfig.id}/loader-config`, {
        method: "GET",
        headers: {
            "credentials": 'include',
            'content-Type': 'application/json',
            'X-Version': version
        }
    });
    if (response.status === 204) {
        throw new Error(`No configuration for component loader found for client with id ${shopConfig.id}`);
    } else if (response.status === 400) {
        const errorResponse = await response.json();
        throw new Error(`invalid call, received error response ${JSON.stringify(errorResponse)}`)
    } else if (response.status === 500) {
        const errorResponse = await response.json();
        throw new Error(`server error: ${JSON.stringify(errorResponse)}`)
    }
    const config = await response.json();
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

    let purchasesProducts;
    if (shopConfig.cartProducts) {
        purchasesProducts = shopConfig.cartProducts.map(cartProduct => {
            return {
                price: cartProduct.price,
                manufacturer: cartProduct.manufacturer,
                deviceClasses: cartProduct.deviceClasses,
                name: cartProduct.name,
                orderItemId: cartProduct.sku
            }
        });
    }

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
