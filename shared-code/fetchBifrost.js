const SHOPPING_CART_DELETE_HEADER = 'X-wertgarantie-shopping-cart-delete';
const COOKIE_NAME = 'wertgarantie-shopping-cart';

export default async function(url, method, version, body = {}) {
    const signedShoppingCart = getCookieValue(COOKIE_NAME);
    if (signedShoppingCart) {
        body.signedShoppingCart = signedShoppingCart;
    }
    const requestParams = {
        method: method,
        headers: {
            "credentials": 'include',
            'content-Type': 'application/json',
            'X-Version': version
        }
    };

    if (method !== 'GET') {
        requestParams.body = JSON.stringify(body);
    }

    const result = await fetch(url, requestParams);

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

function getCookieValue(cookieName) {
    const cookieContent = document.cookie.match('(^|[^;]+)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
    return cookieContent ? JSON.parse(cookieContent.pop()) : undefined;
}