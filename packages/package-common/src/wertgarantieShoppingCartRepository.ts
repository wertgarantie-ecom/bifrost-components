import { IndexedDB, onupgradeneededFunction } from "./indexedDB.service";

const DATABASE_NAME = 'WertgarantieDatabase';
const SIGNED_SHOPPING_CARTS_TABLE_NAME = 'signedShoppingCarts';
const SHOPPING_CART_ROW_KEY = 'wertgarantie-shopping-cart';
const SELECTED_PRODUCTS_TABLE_NAME = 'selectedProducts';


/**
 * SHOPPING CART -----------------------------------------------------------
 */

/**
 * Save shopping cart
 * @param signedShoppingCart 
 * @returns 
 */
export async function saveShoppingCart(signedShoppingCart: any) {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return await IndexedDB.putValue(objectStore, SHOPPING_CART_ROW_KEY, signedShoppingCart);
}


/**
 * Get current shopping cart
 * @returns shopping cart
 */
export async function getShoppingCart() {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readonly');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return await IndexedDB.getFromStore(objectStore, SHOPPING_CART_ROW_KEY);
}


/**
 * Delete current shopping cart
 * @returns boolean
 */
export async function deleteShoppingCart(): Promise<boolean> {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SIGNED_SHOPPING_CARTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SIGNED_SHOPPING_CARTS_TABLE_NAME, tx);
    return !(await IndexedDB.deleteFromStore(objectStore, SHOPPING_CART_ROW_KEY));
}


/**
 * PRODUCT SELECTION -------------------------------------------------------
 */

/**
 * Save new product selection
 * @param selectionData 
 * @returns 
 */
export async function saveProductSelection(selectionData: any) {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return await IndexedDB.putValue(objectStore, selectionData.productBaseIdentifier, selectionData.productIndex);
}

/**
 * Find product selection by product id
 * @param productBaseIdentifier 
 * @returns product selection
 */
export async function findProductSelection(productBaseIdentifier: string) {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readonly');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return await IndexedDB.getFromStore(objectStore, productBaseIdentifier);
}

/**
 * Delete product selection by id
 * @param productBaseIdentifier 
 * @returns boolean
 */
export async function deleteProductSelection(productBaseIdentifier: string): Promise<boolean> {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, SELECTED_PRODUCTS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(SELECTED_PRODUCTS_TABLE_NAME, tx);
    return !(await IndexedDB.deleteFromStore(objectStore, productBaseIdentifier));
}


/**
 * Get current indexed db
 * @returns {IDBDatabase} indexed db
 */
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
