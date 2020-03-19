const DATABASE_NAME = 'WertgarantieDatabase';
const SIGNED_SHOPPING_CARTS_TABLE_NAME = 'signedShoppingCarts';
const SHOPPING_CART_ROW_KEY = 'wertgarantie-shopping-cart';

export async function getShoppingCart() {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, 'readonly');
    const objectStore = getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    const dbResult = await getFromStore(objectStore, SHOPPING_CART_ROW_KEY);
    console.log(dbResult);
    return dbResult;
}

async function deleteFromStore(objectStore, key) {
    return new Promise((resolve, reject) => {
       const deleteRequest = objectStore.delete(key);
       deleteRequest.onsuccess = () => {
           resolve(deleteRequest.result);
       };
       deleteRequest.onerror = (event) => {
           console.log('DELETE FROM STORE: indexedDB transaction threw an error: ' + event.target.error);
           reject();
       }
    });
}

export async function deleteShoppingCart() {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, 'readwrite');
    const objectStore = getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return !(await deleteFromStore(objectStore, SHOPPING_CART_ROW_KEY));
}

function getFromStore(store, key) {
    return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = (event) => {
            console.log('GET FROM STORE: indexedDB transaction threw an error: ' + event.target.error);
            reject();
        };
    });
}

function getObjectStore(db, tx) {
    return tx.objectStore(db);
}

function getTransaction(db, mode) {
    const tx = db.transaction(SIGNED_SHOPPING_CARTS_TABLE_NAME, mode);
    tx.oncomplete = () => {
        console.log('Transaction completed');
    };
    tx.onerror = (event) => {
        console.log('indexedDB transaction threw an error: ' + event.target.error);
    };

    return tx;
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