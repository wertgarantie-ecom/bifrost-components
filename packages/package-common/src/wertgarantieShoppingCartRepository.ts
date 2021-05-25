import { IndexedDB, onupgradeneededFunction } from "./indexedDB.service";

const DATABASE_NAME = 'WertgarantieDatabase';
const SIGNED_SHOPPING_CARTS_TABLE_NAME = 'signedShoppingCarts';
const SHOPPING_CART_ROW_KEY = 'wertgarantie-shopping-cart';
const SELECTED_PRODUCTS_TABLE_NAME = 'selectedProducts';


/**
 * SHOPPING CART
 */
export async function saveShoppingCart(signedShoppingCart: any) {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return await IndexedDB.putValue(objectStore, SHOPPING_CART_ROW_KEY, signedShoppingCart);
}

export async function getShoppingCart() {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readonly');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return await IndexedDB.getFromStore(objectStore, SHOPPING_CART_ROW_KEY);
}

export async function deleteShoppingCart() {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return !(await IndexedDB.deleteFromStore(objectStore, SHOPPING_CART_ROW_KEY));
}



/**
 * PRODUCT SELECTION
 */
export async function saveProductSelection(selectionData: any) {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return await IndexedDB.putValue(objectStore, selectionData.productBaseIdentifier, selectionData.productIndex);
}

export async function findProductSelection(productBaseIdentifier: string) {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readonly');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return await IndexedDB.getFromStore(objectStore, productBaseIdentifier);
}

export async function deleteProductSelection(productBaseIdentifier: string) {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return !(await IndexedDB.deleteFromStore(objectStore, productBaseIdentifier));
}



export async function getIndexedDB(): Promise<IDBDatabase> {
    
    // onupgradeneeded callback function
    const func: onupgradeneededFunction = (indexedDBRequest: IDBOpenDBRequest, event: any) => {
        const db: IDBDatabase = indexedDBRequest.result;
        if (!event.currentTarget.transaction.objectStoreNames.contains(SIGNED_SHOPPING_CARTS_TABLE_NAME)) {
            db.createObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME);
        }
        if (!event.currentTarget.transaction.objectStoreNames.contains(SELECTED_PRODUCTS_TABLE_NAME)) {
            db.createObjectStore(SELECTED_PRODUCTS_TABLE_NAME);
        }}

    // get db 
    return IndexedDB.getDatabase(DATABASE_NAME, 2, func);
}
