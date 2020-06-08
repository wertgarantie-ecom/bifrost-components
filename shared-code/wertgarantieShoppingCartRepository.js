const DATABASE_NAME = 'WertgarantieDatabase';
const SIGNED_SHOPPING_CARTS_TABLE_NAME = 'signedShoppingCarts';
const SHOPPING_CART_ROW_KEY = 'wertgarantie-shopping-cart';
const SELECTED_PRODUCTS_TABLE_NAME = 'selectedProducts';


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

async function putValue(objectStore, key, value) {
    return new Promise((resolve, reject) => {
        const putRequest = objectStore.put(value, key);
        putRequest.onsuccess = () => {
            resolve(putRequest.result);
        };
        putRequest.onerror = (event) => {
            console.log('PUT transaction threw an error: ' + event.target.error);
            reject();
        }
    });
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

function getTransaction(db, table, mode) {
    const tx = db.transaction(table, mode);
    tx.onerror = (event) => {
        console.log('indexedDB transaction threw an error: ' + event.target.error);
    };

    return tx;
}

export async function saveShoppingCart(signedShoppingCart) {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readwrite');
    const objectStore = getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return await putValue(objectStore, SHOPPING_CART_ROW_KEY, signedShoppingCart);
}

export async function getShoppingCart() {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readonly');
    const objectStore = getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return await getFromStore(objectStore, SHOPPING_CART_ROW_KEY);
}

export async function deleteShoppingCart() {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readwrite');
    const objectStore = getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return !(await deleteFromStore(objectStore, SHOPPING_CART_ROW_KEY));
}

export async function saveProductSelection(selectionData) {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readwrite');
    const objectStore = getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return await putValue(objectStore, selectionData.productBaseIdentifier, selectionData.productIndex);
}

export async function findProductSelection(productBaseIdentifier) {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readonly');
    const objectStore = getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return await getFromStore(objectStore, productBaseIdentifier);
}

export async function deleteProductSelection(productBaseIdentifier) {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readwrite');
    const objectStore = getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return !(await deleteFromStore(objectStore, productBaseIdentifier));
}

export function getIndexedDB(databaseName = DATABASE_NAME) {
    const db = new Promise((resolve, reject) => {
        const indexedDBRequest = window.indexedDB.open(databaseName, 2);
        indexedDBRequest.onupgradeneeded = (event) => {
            let db = indexedDBRequest.result;
            if (!event.currentTarget.transaction.objectStoreNames.contains(SIGNED_SHOPPING_CARTS_TABLE_NAME)) {
                db.createObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME);
            }
            if (!event.currentTarget.transaction.objectStoreNames.contains(SELECTED_PRODUCTS_TABLE_NAME)) {
                db.createObjectStore(SELECTED_PRODUCTS_TABLE_NAME);
            }
        };
        indexedDBRequest.onsuccess = () => resolve(indexedDBRequest.result);
        indexedDBRequest.onerror = (event) => reject(event.target.error);
    });
    db.onerror = (event) => {
        console.log('Error in IndexedDB Handling: ' + event.target.errorCode);
    };
    return db;
}