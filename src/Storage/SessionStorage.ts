// SessionStorage.ts
import StorageInterface from './StorageInterface';

export default class SessionStorage implements StorageInterface {
  private domain = process.env.REACT_APP_DOMAIN ?? ""; // e.g. "ign"

  // build a namespaced key like "ign:banners.v1"
  private k(key: string) {
    return this.domain ? `${this.domain}:${key}` : key;
  }

  save(key: string, value: any, _secure: boolean = false): void {
    try {
      sessionStorage.setItem(this.k(key), JSON.stringify(value));
    } catch (e) {
      console.warn('SessionStorage.save error:', e);
    }
  }

  load<T = any>(key: string, _secure: boolean = false): T | null {
    const raw = sessionStorage.getItem(this.k(key));
    if (raw == null) return null;
    try { return JSON.parse(raw) as T; } catch { return raw as unknown as T; }
  }

  remove(key: string): void {
    sessionStorage.removeItem(this.k(key));
  }

  hasItem(key: string): boolean {
    return sessionStorage.getItem(this.k(key)) !== null;
  }

  /** Remove all session keys under this domain or an optional sub-prefix. */
  removeAll(prefix: string = ""): void {
    const base = this.domain ? `${this.domain}:${prefix}` : prefix;
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (!k) continue;
      if (!base) {
        // wipe only this domain’s keys if domain is set
        if (!this.domain || k.startsWith(`${this.domain}:`)) {
          sessionStorage.removeItem(k);
        }
      } else if (k.startsWith(base)) {
        sessionStorage.removeItem(k);
      }
    }
  }
}
