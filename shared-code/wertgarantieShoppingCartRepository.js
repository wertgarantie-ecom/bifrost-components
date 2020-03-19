const DATABASE_NAME = 'WertgarantieDatabase';
const SIGNED_SHOPPING_CARTS_TABLE_NAME = 'signedShoppingCarts';
const SHOPPING_CART_ROW_KEY = 'wertgarantie-shopping-cart';

export async function getShoppingCart() {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, 'read');
    const objectStore = getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return await getFromStore(objectStore, SHOPPING_CART_ROW_KEY);
}

// export async function deleteShoppingCart(sessionId) {
//     if (!sessionId) {
//         return false;
//     }
//     const db = await getIndexedDB();
//     await db.wertgarantieData.delete(sessionId);
//     return !(await db.wertgarantieData.get(sessionId)); // --> true if undefined, which is the desired output
// }

function getFromStore(store, key) {
    return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = (event) => {
            console.log('indexedDB transaction threw an error: ' + event.target.error);
            reject();
        };
    });
}

function getObjectStore(db, tx) {
    return tx.objectStore(db);
}

function getTransaction(db, mode) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(mode);
        tx.oncomplete = () => {
            console.log('get shopping cart from indexeddb');
            resolve(tx);
        };
        tx.onerror = (event) => {
            console.log('indexedDB transaction threw an error: ' + event.target.error);
            reject();
        };

    });
}

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
        store.put(signedShoppingCart, SHOPPING_CART_ROW_KEY);
    });

}

export function getIndexedDB(databaseName = DATABASE_NAME) {
    const db = new Promise((resolve, reject) => {
        const indexedDBRequest = window.indexedDB.open(databaseName, 1);
        indexedDBRequest.onupgradeneeded = () => {
            let db = indexedDBRequest.result;
            db.createObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME);
        };
        indexedDBRequest.onsuccess = () => resolve(indexedDBRequest.result);
        indexedDBRequest.onerror = (event) => reject(event.target.error);
    });
    db.onerror = (event) => {
        console.log('Error in IndexedDB Handling: ' + event.target.errorCode);
    };
    return db;
}