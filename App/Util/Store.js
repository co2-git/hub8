/**
 *
 *  @module hub8
 *  @name AppStore
 *  @description contains trunk for sockets
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *
**/

import EventEmitter from 'events';
import 'babel-polyfill';
import Trunk from 'trunks';

export default class Store {
  static emitter = new EventEmitter();
  static on(listener, fn) {
    this.emitter.on(listener, fn);
    return this;
  }
  static off(listener, fn) {
    this.emitter.removeListener(listener, fn);
    return this;
  }

  static store: Object = {};
  static _store;
  static changed: {[key: string]: any} = {};
  static get(key): any {
    if (!this._store) {
      this._store = Trunk.map(this.store);
    }
    if (!key) {
      const keys = {};
      for (const _key in this.store) {
        keys[_key] = this._store.get(_key);
      }
      return keys;
    }
    return this._store.get(key);
  }
  static set(object: Object) {
    if (!this._store) {
      this._store = Trunk.map(this.store);
    }
    const changed = {};
    for (const key in object) {
      changed[key] = {
        old: this._store.get(key),
        new: object[key],
      };
      this._store = this._store.set(key, object[key]);
    }
    this.changed = changed;
    this.emitter.emit('change', changed);
  }
}
