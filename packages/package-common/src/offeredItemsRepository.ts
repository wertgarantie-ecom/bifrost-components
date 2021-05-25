import { IndexedDB, onupgradeneededFunction } from "./indexedDB.service";

const DATABASE_NAME = "WertgarantieOfferedForOrderItemsDatabase";
const OFFERED_ITEMS_TABLE_NAME = "offeredItems";
const OFFERED_ITEMS_ROW_KEY = 'offered-item-ids';


export async function getOfferedForOrderItemId() {
    const db = await getIndexedDB();
    const tx = IndexedDB.getTransaction(db, OFFERED_ITEMS_TABLE_NAME, 'readonly');
    const objectStore = IndexedDB.getObjectStore(OFFERED_ITEMS_TABLE_NAME, tx);
    return await IndexedDB.getFromStore(objectStore, OFFERED_ITEMS_ROW_KEY);
}

export async function saveOfferedOrderItemIds(offeredOrderItemIds: any) {
    const db = await getIndexedDB();
    const tx = IndexedDB.getTransaction(db, OFFERED_ITEMS_TABLE_NAME, 'readwrite');
    const objectStore = IndexedDB.getObjectStore(OFFERED_ITEMS_TABLE_NAME, tx);
    return await IndexedDB.putValue(objectStore, OFFERED_ITEMS_ROW_KEY, offeredOrderItemIds);
}

export async function deleteOfferedForOrderItemId() {
    const db: IDBDatabase = await getIndexedDB();
    const tx: IDBTransaction = IndexedDB.getTransaction(db, OFFERED_ITEMS_TABLE_NAME, 'readwrite');
    const objectStore: IDBObjectStore = IndexedDB.getObjectStore(OFFERED_ITEMS_TABLE_NAME, tx);
    return !(await IndexedDB.deleteFromStore(objectStore, OFFERED_ITEMS_ROW_KEY));
}


async function getIndexedDB(): Promise<IDBDatabase>  {
    
    // onupgradeneeded callback function
    const func: onupgradeneededFunction = (indexedDBRequest: IDBOpenDBRequest) => indexedDBRequest.result.createObjectStore(OFFERED_ITEMS_TABLE_NAME)

    // get db 
    return IndexedDB.getDatabase(DATABASE_NAME, 1, func);
}