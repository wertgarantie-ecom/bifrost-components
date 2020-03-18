import Dexie from "dexie";
import getWertgarantieCookieValue from "./getWertgarantieCookieValue";
const WERTGARANTIE_SESSION_ID_COOKIE = 'wertgarantie-session-id';

export async function saveShoppingCart(signedShoppingCart, database) {
    const db = database || await getShoppingCartDatabase();
    await db.signedShoppingCart.put({
        sessionId: signedShoppingCart.shoppingCart.sessionId,
        signedShoppingCart: signedShoppingCart
    });
    return await db.signedShoppingCart.get(signedShoppingCart.shoppingCart.sessionId);
}

export async function getShoppingCart(sessionId, database) {
    const sessionIdToQuery = sessionId || getWertgarantieCookieValue(WERTGARANTIE_SESSION_ID_COOKIE);
    if (!sessionIdToQuery) {
        return undefined;
    }
    const db = database || await getShoppingCartDatabase();
    return await db.signedShoppingCart.get(sessionIdToQuery);
}

// wir sollten hier vielleicht überlegen, ob wir beim client eine zweite Datenbank aufmachen für deletedShoppingCarts / purchases
export async function deleteShoppingCart(sessionId, database) {
    if (!sessionId) {
        return false;
    }
    const db = database || await getShoppingCartDatabase();
    await db.signedShoppingCart.delete(sessionId);
    return !(await db.signedShoppingCart.get(sessionId)); // --> true if undefined, which is the desired output
}

async function getShoppingCartDatabase(databaseName = 'WertgarantieShoppingCart') {
    var db = new Dexie(databaseName);
    db.version(1).stores({signedShoppingCart: 'sessionId,signedShoppingCart'});
    // falls sich Versionen ändern: Hier eintragen, ABER DIE ALTE UNBEDINGT STEHEN LASSEN - Migrationen
    return db;
}