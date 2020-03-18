const SHOPPING_CART_DELETE_HEADER = 'X-wertgarantie-shopping-cart-delete';
const WERTGARANTIE_SESSION_ID = 'X-wertgarantie-session-id';
const WERTGARANTIE_SESSION_ID_COOKIE = 'wertgarantie-session-id';
import {saveShoppingCart, getShoppingCart, deleteShoppingCart} from './wertgarantieShoppingCartRepository';

export default async function fetchBifrost(url, method, version, body = {}) {
    const signedShoppingCart = await getShoppingCart();
    const requestParams = {
        method: method,
        headers: {
            "credentials": 'include',
            'content-Type': 'application/json',
            'X-Version': version
        }
    };
    if (signedShoppingCart) {
        body.signedShoppingCart = signedShoppingCart;
        requestParams.headers[WERTGARANTIE_SESSION_ID] = signedShoppingCart.shoppingCart.sessionId;
    }

    if (method !== 'GET') {
        requestParams.body = JSON.stringify(body);
    }

    const result = await fetch(url, requestParams);

    if (result.headers.get(SHOPPING_CART_DELETE_HEADER)) {
        // ToDo: SWDBECOM-196 handle response
        await deleteShoppingCart();
        document.cookie = `${WERTGARANTIE_SESSION_ID_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }

    let responseJson = undefined;
    if (result.status === 200) {
        responseJson = await result.json();
        if (responseJson.signedShoppingCart) {
            // ToDo: SWDBECOM-196 handle response
            const savedSignedShoppingCart = await saveShoppingCart(responseJson.signedShoppingCart)
            document.cookie = `${WERTGARANTIE_SESSION_ID_COOKIE}=${savedSignedShoppingCart.shoppingCart.sessionId}`
        }
    }
    return {
        headers: result.headers,
        status: result.status,
        body: responseJson
    };
}
