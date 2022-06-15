import { isBrowser } from './isBrowser';
import { storage } from './storage';

type Listener<S = any> = (state: S) => void;
type CompareFunc<S = any> = (prevState: S, state: S) => boolean;
interface Config {
  useLocalStorage: boolean;
  stateName: string;
}
export type UnSubscribe = () => void;
export interface CreateStateInterface<S = any> {
  getState(): S;
  setState<K extends keyof S>(state: S | Pick<S, K> | ((prevState: Readonly<S>) => S | Pick<S, K>), actionName: string): void;
  subscribe(listener: Listener<S>): UnSubscribe;
  shouldUpdate(compareFunc: CompareFunc<S>): void;
}

const defaultConfig: Config = {
  useLocalStorage: false,
  stateName: '@state',
};

export class CreateState<S = any> implements CreateStateInterface<S> {
  private state: S;
  private prevState!: S;
  private listeners: Listener<S>[];
  private config: Config;
  private compareFunc!: CompareFunc<S>;
  constructor(initialState: S, config = defaultConfig) {
    this.state = initialState;
    this.config = config;
    this.listeners = [];
    if (!config.useLocalStorage && isBrowser) {
      storage.removeItem(config.stateName);
    }
    this.updateStateFromLocalStorage();
  }
  private updateStateFromLocalStorage = () => {
    const { useLocalStorage, stateName } = this.config;
    if (isBrowser) {
      const state = storage.getItem(stateName);
      if (useLocalStorage && !!state) {
        try {
          this.state = JSON.parse(state);
        } catch {
          this.state = state as S;
        }
      }
    }
  };
  private callListeners = () => {
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  };
  private callCompare = () => {
    if (!this.compareFunc) {
      return this.callListeners();
    }
    const isUpdate = this.compareFunc(this.prevState, this.state);
    if (isUpdate) {
      this.callListeners();
    }
  };
  public getState = () => {
    return this.state;
  };
  public setState = <K extends keyof S>(state: S | Pick<S, K> | ((prevState: Readonly<S>) => S | Pick<S, K>)) => {
    const { useLocalStorage, stateName } = this.config;
    this.prevState = this.state;
    if (typeof state === 'function') {
      this.state = (state as (prevState: Readonly<S>) => S | Pick<S, K>)(this.prevState) as S;
    } else {
      this.state = state as S;
    }
    if (useLocalStorage && isBrowser) {
      storage.setItem(stateName, JSON.stringify(this.state));
    }
    this.callCompare();
  };
  public subscribe = (listener: Listener<S>) => {
    this.updateStateFromLocalStorage();
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(_listener => _listener !== listener);
    };
  };
  public shouldUpdate = (compareFunc: CompareFunc<S>) => {
    this.compareFunc = compareFunc;
  };
}

export function createState<S>(initialState: S, config = defaultConfig) {
  return new CreateState(initialState, config);
}
