export type onupgradeneededFunction = (request: IDBOpenDBRequest, event?: any) => void;

/**
 * Service for indexed db transaction
 */


/**
 * Establish a new db connection
 * @param dbName database name
 * @param dbVersion database version
 * @param onupgradeneeded callback function for indexedDB's "onupgradeneeded"
 */
async function getDatabase(dbName: string, dbVersion: number, onupgradeneeded: onupgradeneededFunction): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const indexedDBRequest: IDBOpenDBRequest = window.indexedDB.open(dbName, dbVersion);
        indexedDBRequest.onupgradeneeded = (event: any) => onupgradeneeded(indexedDBRequest, event);
        indexedDBRequest.onsuccess = () => resolve(indexedDBRequest.result);
        indexedDBRequest.onerror = (event: any) => reject(event.target.error);
    });
}


/**
 * Delete entry from a store
 * @param store 
 * @param key 
 * @returns 
 */
async function deleteFromStore(store: IDBObjectStore, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const deleteRequest: IDBRequest = store.delete(key);
        deleteRequest.onsuccess = () => resolve(deleteRequest.result);
        deleteRequest.onerror = (event: any) => {
            console.log(`DELETE FROM STORE: indexedDB transaction threw an error: ${event.target.error}`);
            reject();
        }
    });
}


/**
 * Get object store
 * @param db database name
 * @param tx transaction
 * @returns object store
 */
function getObjectStore(db: string, tx: IDBTransaction): IDBObjectStore {
    return tx.objectStore(db);
}


/**
 * Get transaction
 * @param db database
 * @param table table name
 * @param mode IDBTransactionMode
 * @returns 
 */
function getTransaction(db: IDBDatabase, table: string, mode: IDBTransactionMode): IDBTransaction {
    const tx: IDBTransaction = db.transaction(table, mode);
    tx.onerror = (event: any) => console.log(`indexedDB transaction threw an error: ${event.target.error}`);
    return tx;
}


/**
 * Store a value
 * @param store IDBObjectStore
 * @param key 
 * @param value 
 * @returns 
 */
async function putValue(store: IDBObjectStore, key: string, value: any) {
    return new Promise((resolve, reject) => {
        const putRequest: IDBRequest = store.put(value, key);
        putRequest.onsuccess = () => resolve(putRequest.result);
        putRequest.onerror = (event: any) => {
            console.log(`PUT transaction threw an error: ${event.target.error}`);
            reject();
        }
    });
}


/**
 * Fetch a value from the store by id
 * @param store IDBObjectStore
 * @param key key name
 * @returns 
 */
async function getFromStore(store: IDBObjectStore, key: string) {
    return new Promise((resolve, reject) => {
        const request: IDBRequest = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event: any) => {
            console.log(`GET FROM STORE: indexedDB transaction threw an error: ${event.target.error}`);
            reject();
        };
    });
}

export const IndexedDB = {
    getDatabase: getDatabase,
    deleteFromStore: deleteFromStore,
    getObjectStore: getObjectStore,
    getTransaction: getTransaction,
    putValue: putValue,
    getFromStore: getFromStore,
}