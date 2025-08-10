type StoreNames = 'programs' | 'days' | 'sessions';

class IDB {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'minimalift_v1';
  private readonly version = 1;

  async openDb(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create programs store
        if (!db.objectStoreNames.contains('programs')) {
          db.createObjectStore('programs', { keyPath: 'programId' });
        }

        // Create days store with index
        if (!db.objectStoreNames.contains('days')) {
          const daysStore = db.createObjectStore('days', { keyPath: 'dayId' });
          daysStore.createIndex('programId', 'programId', { unique: false });
        }

        // Create sessions store with indexes
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionsStore = db.createObjectStore('sessions', { 
            keyPath: 'sessionId', 
            autoIncrement: true 
          });
          sessionsStore.createIndex('dayId', 'dayId', { unique: false });
          sessionsStore.createIndex('date', 'startedAt', { unique: false });
        }
      };
    });
  }

  async tx(storeName: StoreNames, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    const db = await this.openDb();
    const transaction = db.transaction([storeName], mode);
    return transaction.objectStore(storeName);
  }

  async get<T>(storeName: StoreNames, key: IDBValidKey): Promise<T | undefined> {
    const store = await this.tx(storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll<T>(storeName: StoreNames): Promise<T[]> {
    const store = await this.tx(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async put<T>(storeName: StoreNames, data: T): Promise<IDBValidKey> {
    const store = await this.tx(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: StoreNames, key: IDBValidKey): Promise<void> {
    const store = await this.tx(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async indexGetAll<T>(
    storeName: StoreNames, 
    indexName: string, 
    query?: IDBValidKey | IDBKeyRange
  ): Promise<T[]> {
    const store = await this.tx(storeName);
    const index = store.index(indexName);
    return new Promise((resolve, reject) => {
      const request = query ? index.getAll(query) : index.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async clear(storeName: StoreNames): Promise<void> {
    const store = await this.tx(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const idb = new IDB();