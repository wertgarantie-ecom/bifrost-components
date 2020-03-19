const SHOPPING_CART_DELETE_HEADER = 'X-wertgarantie-shopping-cart-delete';
const WERTGARANTIE_SESSION_ID = 'X-wertgarantie-session-id';
const JSON_SHOPPING_CART_COOKIE = 'wertgarantie-shopping-cart';
const BASE64_SHOPPING_CART_COOKIE = 'wertgarantie-shopping-cart-data';
import getWertgarantieCookieValue from "./getWertgarantieCookieValue";
import Dexie from "dexie";

export default async function fetchBifrost(url, method, version, body = {}) {
    const signedShoppingCart = getWertgarantieCookieValue(JSON_SHOPPING_CART_COOKIE);
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
        document.cookie = `${JSON_SHOPPING_CART_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        document.cookie = `${BASE64_SHOPPING_CART_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }

    let responseJson = undefined;
    if (result.status === 200) {
        responseJson = await result.json();
        if (responseJson.signedShoppingCart) {
            // await saveSignedShoppingCart(responseJson.signedShoppingCart);
            const shoppingCartString = JSON.stringify(responseJson.signedShoppingCart);
            document.cookie = `${JSON_SHOPPING_CART_COOKIE}=${shoppingCartString}`;
            document.cookie = `${BASE64_SHOPPING_CART_COOKIE}=${btoa(shoppingCartString)}`
        }
    }
    return {
        headers: result.headers,
        status: result.status,
        body: responseJson
    };
}

async function saveSignedShoppingCart(signedShoppingCart) {
    const db = getDatabase();
    db.wertgarantieSessionData.put({
        sessionId: signedShoppingCart.shoppingCart.sessionId,
        signedShoppingCart: signedShoppingCart
    })
}

async function getDatabase() {
    var db = new Dexie('WertgarantieShoppingCart');
    db.version(1).stores({
        wertgarantieSessionData: "sessionId, signedShoppingCart"
    });
    return db;
}