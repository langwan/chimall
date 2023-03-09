interface StorageOptions {
  prefix?: string | string[];
}

export class Storage<Mapping extends Record<keyof unknown, unknown>> {
  private storage: typeof window.localStorage;

  private prefix: StorageOptions['prefix'] = '';

  constructor(options?: StorageOptions) {
    if (options?.prefix) {
      this.prefix = options.prefix;
    }

    this.storage = window.localStorage;
  }

  set<Key extends keyof Mapping, Value = Mapping[Key]>(key: Key, value: Value) {
    const realKey = this.getKey(key);
    const stringifyValue = this.stringify(value);

    this.storage.setItem(realKey, stringifyValue);
  }

  get<Key extends keyof Mapping, Value = Mapping[Key]>(key: Key): Value | null {
    const realKey = this.getKey(key);

    const stringifyValue = this.storage.getItem(realKey);

    if (!stringifyValue) {
      return null;
    }

    return this.parse<Value>(stringifyValue);
  }

  remove<Key extends keyof Mapping>(key: Key) {
    this.storage.removeItem(this.getKey(key));
  }

  clear() {
    this.storage.clear()
  }

  private getKey(key: string | number | symbol): string {
    if (this.prefix) {
      const tempPrefix = ([] as string[]).concat(this.prefix);
      return [...tempPrefix, key as string].join('_');
    }

    return key as string;
  }

  private stringify(v: unknown): string {
    return JSON.stringify(v);
  }

  private parse<T>(v: string): T {
    return JSON.parse(v) as T;
  }
}