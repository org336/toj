export class StorageUtil {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * 保存值（对象）到键
   * @param {string} key 键
   * @param {Object} value 值
   */
  set(key, value) {
    this.storage.setItem(key, value);
  }

  /**
   * 通过键获取值（对象）
   * @param {string} key 键
   * @return {Object}
   */
  get(key) {
    return this.storage.getItem(key) || null;
  }

  /**
   * 从存储中移除键
   * @param {string} key 键
   */
  remove(key) {
    this.storage.removeItem(key);
  }

  /**
   * 清除所有存储
   */
  clear() {
    this.storage.clear();
  }
}

export const myLocalStorage = new StorageUtil(window.localStorage);
export const mySessionStorage = new StorageUtil(window.sessionStorage);
