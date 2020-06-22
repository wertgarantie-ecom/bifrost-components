const DATABASE_NAME = "WertgarantieOfferedForOrderItemsDatabase";
const OFFERED_ITEMS_TABLE_NAME = "offeredItems";
const OFFERED_ITEMS_ROW_KEY = 'offered-item-ids';

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

export async function saveOfferedOrderItemIds(offeredOrderItemIds) {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, OFFERED_ITEMS_TABLE_NAME, 'readwrite');
    const objectStore = getObjectStore(OFFERED_ITEMS_TABLE_NAME, tx);
    return await putValue(objectStore, OFFERED_ITEMS_ROW_KEY, offeredOrderItemIds);
}

export async function getOfferedForOrderItemId() {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, OFFERED_ITEMS_TABLE_NAME, 'readonly');
    const objectStore = getObjectStore(OFFERED_ITEMS_TABLE_NAME, tx);
    return await getFromStore(objectStore, OFFERED_ITEMS_ROW_KEY);
}

export async function deleteOfferedForOrderItemId() {
    const db = await getIndexedDB();
    const tx = await getTransaction(db, OFFERED_ITEMS_TABLE_NAME, 'readwrite');
    const objectStore = getObjectStore(OFFERED_ITEMS_TABLE_NAME, tx);
    return !(await deleteFromStore(objectStore, OFFERED_ITEMS_ROW_KEY));
}


export function getIndexedDB(databaseName = DATABASE_NAME) {
    const db = new Promise((resolve, reject) => {
        const indexedDBRequest = window.indexedDB.open(databaseName, 1);
        indexedDBRequest.onupgradeneeded = () => {
            let db = indexedDBRequest.result;
            db.createObjectStore(OFFERED_ITEMS_TABLE_NAME);
        };
        indexedDBRequest.onsuccess = () => resolve(indexedDBRequest.result);
        indexedDBRequest.onerror = (event) => reject(event.target.error);
    });
    db.onerror = (event) => {
        console.log('Error in IndexedDB Handling: ' + event.target.errorCode);
    };
    return db;
}