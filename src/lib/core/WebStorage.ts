interface Storage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export default class WebStorage {
  private storage: Storage;

  constructor(type: "local" | "session") {
    if (type === "local") {
      this.storage = window.localStorage;
    } else {
      this.storage = window.sessionStorage;
    }
  }

  private get(key: string) {
    try {
      return this.storage.getItem(key) || null;
    } catch (error) {
      throw new Error("storage occur error");
    }
  }

  private set(key: string, value: string) {
    try {
      this.storage.setItem(key, value);
    } catch (error) {
      throw new Error("storage occur error");
    }
  }

  protected remove(key: string) {
    this.storage.removeItem(key);
  }

  protected getData<T>(key: string, defaultValue: T): T {
    try {
      const data = this.get(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  protected setData<T>(key: string, value: T) {
    try {
      this.set(key, JSON.stringify(value));
    } catch (error) {
      throw new Error("storage occur error");
    }
  }
}
