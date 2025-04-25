// tehilim-db.js
// ניהול IndexedDB עבור טקסטים מתוקנים ותיקי משתמש

const DB_NAME = 'TehilimDB';
const DB_VERSION = 1;
const STORE_NAME = 'collections';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveCollection(collection) {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  store.put(collection);
  return tx.complete;
}

async function getCollection(id) {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return store.get(id);
}

async function getAllCollections() {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
}

async function deleteCollection(id) {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  store.delete(id);
  return tx.complete;
}

window.TehilimDB = {
  saveCollection,
  getCollection,
  getAllCollections,
  deleteCollection
};
