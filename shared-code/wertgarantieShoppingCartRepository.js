import getWertgarantieCookieValue from "./getWertgarantieCookieValue";
const WERTGARANTIE_SESSION_ID_COOKIE = 'wertgarantie-session-id';
const SIGNED_SHOPPING_CARTS_TABLE_NAME = 'signedShoppingCarts';

export async function getShoppingCartBySessionId(sessionId) {
    const sessionIdToQuery = sessionId || getWertgarantieCookieValue(WERTGARANTIE_SESSION_ID_COOKIE);
    if (!sessionIdToQuery) {
        return undefined;
    }
    const db = await getIndexedDB();
    const wertgarantieData = await db.wertgarantieData.get(sessionIdToQuery);
    return wertgarantieData ? wertgarantieData.signedShoppingCart : undefined;
}

// wir sollten hier vielleicht überlegen, ob wir beim client eine zweite Datenbank aufmachen für deletedShoppingCarts / purchases
// export async function deleteShoppingCart(sessionId) {
//     if (!sessionId) {
//         return false;
//     }
//     const db = await getIndexedDB();
//     await db.wertgarantieData.delete(sessionId);
//     return !(await db.wertgarantieData.get(sessionId)); // --> true if undefined, which is the desired output
// }

export async function saveShoppingCart(signedShoppingCart) {
    const db = await getIndexedDB();
    return new Promise((resolve, reject) => {

        const tx = db.transaction(SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readwrite');
        tx.oncomplete = () => {
            console.log('saved signed shopping cart to indexeddb!');
            console.log(JSON.stringify(signedShoppingCart, null, 2));
            resolve(signedShoppingCart);
        };
        tx.onerror = (event) => {
            console.log('indexedDB transaction threw an error: ' + event.target.error);
            reject();
        };

        const store = tx.objectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME);
        store.put({
            sessionId: signedShoppingCart.shoppingCart.sessionId,
            signedShoppingCart: signedShoppingCart
        });
    });
}

export function getIndexedDB(databaseName = 'WertgarantieDatabase') {
    const db = new Promise((resolve, reject) => {
        const indexedDBRequest = window.indexedDB.open(databaseName, 1);
        indexedDBRequest.onupgradeneeded = () => {
            let db = indexedDBRequest.result;
            db.createObjectStore('signedShoppingCarts', {keyPath: 'sessionId'});
        };
        indexedDBRequest.onsuccess = () => resolve(indexedDBRequest.result);
        indexedDBRequest.onerror = (event) => reject(event.target.error);
    });
    db.onerror = (event) => {
        console.log('Error in IndexedDB Handling: ' + event.target.errorCode);
    };
    return db;
}