import AsyncStorage from '@react-native-async-storage/async-storage';

interface ExternalStorage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  getAllKeys(): Promise<readonly string[]>;
}

export class Storage {
  private static _instance: Storage;
  private cache: Record<string, string> = {};

  private constructor(private _external: ExternalStorage) {}

  public static Create(localStorage: ExternalStorage): Readonly<Storage> {
    if (!this._instance) {
      this._instance = new Storage(localStorage);
    }

    return this._instance;
  }

  public static get instance(): Readonly<Storage> {
    return Storage._instance;
  }

  public async set(key: string, value: string): Promise<void> {
    Storage._instance.cache[key] = value;
    return Storage._instance._external.setItem(key, value);
  }

  public async get(key: string): Promise<string | null> {
    const value =
      Storage._instance.cache[key] ??
      (await Storage._instance._external.getItem(key));

    Storage._instance.cache[key] = value;

    return value;
  }

  public async keys(): Promise<readonly string[]> {
    return Storage._instance._external.getAllKeys();
  }
}

export default Storage.Create(AsyncStorage);
