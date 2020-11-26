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


async function fetchConfig(publicId) {
    const response = await fetch(`${bifrostUri}/ecommerce/clients/${publicId}/loader-config`, {
        method: "GET",
        headers: {
            "credentials": 'include',
            'content-Type': 'application/json',
            'X-Version': version
        }
    });
    if (response.status === 204) {
        throw new Error(`No configuration for component loader found for client with id ${publicId}`);
    } else if (response.status === 400) {
        const errorResponse = await response.json();
        throw new Error(`invalid call, received error response ${JSON.stringify(errorResponse)}`)
    } else if (response.status === 500) {
        const errorResponse = await response.json();
        throw new Error(`server error: ${JSON.stringify(errorResponse)}`)
    }
    return await response.json();
}

async function init(shopConfig, loaderConfig) {
    if (!shopConfig) {
        throw new Error('no shop configuration provided');
    }
    setBifrostUri(shopConfig.stage);
    const config = loaderConfig || await fetchConfig(shopConfig.id)
    config.map(componentConfig => {
        import(componentConfig.sources.js);
        if (document.location.pathname.match(componentConfig.target.pageSelector)) {
            const parentElement = document.querySelector(componentConfig.target.parentElementSelector);
            if (parentElement) {
                includeComponent(componentConfig.name, parentElement, componentConfig.sources.css, shopConfig, componentConfig.target);
                if (componentConfig.mutationObserver) {
                    addMutationObserver(componentConfig, shopConfig);
                }
            }
        }
    });
}

function addMutationObserver(componentConfig, shopConfig) {
    const includeComponentFunction = (mutationRecords) => {
        mutationRecords.forEach(record => {
            if (record.addedNodes && record.addedNodes.length > 0) {
                const parentElement = document.querySelector(componentConfig.target.parentElementSelector);
                if (!parentElement) {
                    return;
                }
                includeComponent(componentConfig.name, parentElement, componentConfig.sources.css, shopConfig, componentConfig.target);
            }
        });
    }
    const observerConfig = componentConfig.mutationObserver;
    const target = document.querySelector(observerConfig.selector);
    if (!target) {
        return;
    }
    const observer = new MutationObserver(includeComponentFunction);
    observer.observe(target, observerConfig.config);
}

function includeComponent(name, parentElement, cssSrcPath, shopConfig, componentConfigTarget) {
    const mapping = {
        "selection-pop-up": includeSelectionPopUp,
        "selection-embedded": includeSelectionEmbedded,
        "selection-embedded-multi": includeSelectionEmbeddedMulti,
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
    const elementName = 'wertgarantie-selection-embedded';
    const nodes = document.querySelectorAll(elementName);
    nodes.forEach(n => n.remove());
    if (cssSrcPath) {
        const linkElem = document.createElement('link');
        linkElem.rel = 'stylesheet';
        linkElem.href = cssSrcPath;
        parentElement.appendChild(linkElem);
    }
    const container = document.createElement('div');
    const selectionEmbeddedElement = document.createElement(elementName);
    selectionEmbeddedElement.setAttribute('data-bifrost-uri', bifrostUri);
    selectionEmbeddedElement.setAttribute('data-client-id', shopConfig.id);
    selectionEmbeddedElement.setAttribute('data-device-price', shopConfig.displayedProduct.price);
    selectionEmbeddedElement.setAttribute('data-device-classes', shopConfig.displayedProduct.deviceClasses);
    selectionEmbeddedElement.setAttribute('data-product-name', shopConfig.displayedProduct.name);
    selectionEmbeddedElement.setAttribute('data-order-item-id', shopConfig.displayedProduct.sku);
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
    const base64ShopOrder = btoa(JSON.stringify(shopConfig.cartProducts.map(loaderShopProductToBifrostShopProduct)));
    confirmationElement.setAttribute('data-shop-order-base64', base64ShopOrder);
    confirmationElement.setAttribute('data-validation-trigger-event', componentConfigTarget.validation.event);
    container.appendChild(confirmationElement);
    parentElement.appendChild(container);
}

function loaderShopProductsToBifrostShopProducts(loaderProducts) {
    const convertProducts = (acc, currentValue) => {
        const bifrostShopProduct = loaderShopProductToBifrostShopProduct(currentValue);
        const duplicateProduct = acc.find(product => bifrostShopProduct.name === product.name);
        if (duplicateProduct) {
            duplicateProduct.quantity++;
        } else {
            acc.push(bifrostShopProduct);
        }
        return acc;
    };
    return loaderProducts.reduce(convertProducts, []);
}

function loaderShopProductToBifrostShopProduct(loaderProduct) {
    return {
        price: loaderProduct.price,
        manufacturer: loaderProduct.manufacturer,
        deviceClasses: loaderProduct.deviceClasses,
        name: loaderProduct.name,
        orderItemId: loaderProduct.sku,
        condition: loaderProduct.condition,
        quantity: 1
    }
}

function includeAfterSales(parentElement, cssSrcPath, shopConfig, targetConfig) {
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
        orderId: shopConfig.orderId,
        customer: shopConfig.customer,
        encryptedSessionId: shopConfig.encryptedSessionId
    };
    const container = document.createElement('div');
    const afterSales = document.createElement('wertgarantie-after-sales');
    if (targetConfig.testData) {
        afterSales.setAttribute('data-test-data', JSON.stringify(targetConfig.testData));
    }
    afterSales.setAttribute('data-client-id', shopConfig.id);
    afterSales.setAttribute('data-bifrost-uri', bifrostUri);
    if (targetConfig.proposalInformationCallback) {
        afterSales.setAttribute('data-proposal-information-callback', targetConfig.proposalInformationCallback);
    }
    afterSales.setAttribute('data-shop-purchase-data', btoa(JSON.stringify(shopPurchaseData)));
    container.appendChild(afterSales);
    parentElement.appendChild(container);
}


function includeSelectionEmbeddedMulti(parentElement, cssSrcPath, shopConfig, componentConfigTarget) {
    if (cssSrcPath) {
        const head = document.querySelector('head');
        const linkElem = document.createElement('link');
        linkElem.rel = 'stylesheet';
        linkElem.href = cssSrcPath;
        head.appendChild(linkElem);
    }

    let purchasesProducts;
    if (shopConfig.cartProducts) {
        purchasesProducts = loaderShopProductsToBifrostShopProducts(shopConfig.cartProducts);
        const parentElements = document.querySelectorAll(componentConfigTarget.parentElementSelector);
        purchasesProducts.map(product => {
            if (product.quantity !== 1) {
                return;
            }
            for (var i = 0; i < parentElements.length; i++) {
                const parent = parentElements[i];
                if (parent.innerHTML.includes(product.name)) {
                    const container = document.createElement('div');
                    const selectionEmbeddedElement = document.createElement('wertgarantie-selection-embedded');
                    selectionEmbeddedElement.setAttribute('data-bifrost-uri', bifrostUri);
                    selectionEmbeddedElement.setAttribute('data-client-id', shopConfig.id);
                    selectionEmbeddedElement.setAttribute('data-device-price', product.price);
                    selectionEmbeddedElement.setAttribute('data-device-classes', product.deviceClasses);
                    selectionEmbeddedElement.setAttribute('data-device-condition', product.condition);
                    selectionEmbeddedElement.setAttribute('data-product-name', product.name);
                    selectionEmbeddedElement.setAttribute('data-order-item-id', product.orderItemId);
                    selectionEmbeddedElement.setAttribute('data-product-base-identifier', product.name);
                    selectionEmbeddedElement.setAttribute('data-complete-product-name', product.name);
                    container.appendChild(selectionEmbeddedElement);
                    parent.appendChild(container);
                    return;
                }
            }
        });
    }
}

export default init;

