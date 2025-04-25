
// UserDataSync.js

class UserDataSync {
  constructor(dataService) {
    this.dataService = dataService;
    this.syncQueue = [];
    this.isSyncing = false;
    this.lastSyncTime = null;
    this.localStorageKey = 'tehilim_user_data';
  }

  async initialize(userId) {
    this.userId = userId;
    this.loadLocalSyncHistory();
    setInterval(() => this.performSync(), 5 * 60 * 1000);
    await this.performSync();
    window.addEventListener('online', () => this.handleOnlineStatus(true));
    window.addEventListener('offline', () => this.handleOnlineStatus(false));
    window.addEventListener('beforeunload', () => this.performSync());
    console.log('User data sync initialized for user', userId);
  }

  queueAction(type, data) {
    const action = {
      id: this._generateId(),
      type,
      data,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      status: 'pending'
    };

    this.syncQueue.push(action);
    this.saveLocalSyncQueue();
  }

  saveLocalSyncQueue() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.syncQueue));
  }

  loadLocalSyncHistory() {
    const savedQueue = localStorage.getItem(this.localStorageKey);
    if (savedQueue) {
      this.syncQueue = JSON.parse(savedQueue);
    }
  }

  async performSync() {
    if (!navigator.onLine || this.isSyncing || this.syncQueue.length === 0) return;
    this.isSyncing = true;
    const toSync = [...this.syncQueue];
    try {
      await this.dataService.syncActions(toSync);
      this.syncQueue = [];
      this.saveLocalSyncQueue();
      this.lastSyncTime = new Date();
    } catch (error) {
      console.error('Sync failed', error);
    } finally {
      this.isSyncing = false;
    }
  }

  handleOnlineStatus(isOnline) {
    if (isOnline) {
      this.performSync();
    }
  }

  _generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

export default UserDataSync;
