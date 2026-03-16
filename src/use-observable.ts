import { useMemo, useSyncExternalStore } from 'react';
import { asapScheduler, finalize, Observable, share, tap, timer } from 'rxjs';


const cache = new WeakMap<Observable<any>, CacheRecord<any>>();

interface CacheRecord<TValue> {
  state: ObservableState<TValue>;
  subscribe: (notify: () => void) => () => void;
  getSnapshot: (initial: unknown) => TValue;
}


interface ObservableState<T> {
  didEmit: boolean;
  snapshot?: T;
}


export function useObservable<TValue>(
  observable: Observable<TValue>,
): TValue | undefined;
export function useObservable<TValue, TInitial extends TValue | undefined>(
  observable: Observable<TValue>,
  initialOrFactory: TInitial | (() => TInitial),
): TValue | TInitial;
export function useObservable<TValue, TInitial extends TValue | undefined = undefined>(
  observable: Observable<TValue>,
  initialOrFactory?: TInitial | (() => TInitial),
): TValue | TInitial {
  const record = useMemo((): CacheRecord<TValue> => {
    const cached = cache.get(observable);

    // this is faster than cache.has(observable), cache.get(observable)!
    if (cached) {
      return cached;
    }

    const state: ObservableState<TValue> = {
      didEmit: false,
    };

    const observableForSubscribe = observable.pipe(
      tap((value) => {
        state.snapshot = value;
        state.didEmit = true;
      }),
      finalize(() => cache.delete(observable)),
      share({ resetOnRefCountZero: () => timer(0, asapScheduler) }),
    );

    const subscribe = (notify: () => void) => {
      const subscription = observableForSubscribe.subscribe(() => {
        notify();
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    const getSnapshot = (initial: unknown): TValue => {
      if (state.didEmit) {
        return state.snapshot as TValue;
      }

      return getValue(initial) as TValue;
    };

    const record: CacheRecord<TValue> = {
      state,
      subscribe,
      getSnapshot,
    };

    observableForSubscribe.subscribe().unsubscribe();

    cache.set(observable, record);

    return record;
  }, [observable]);

  return useSyncExternalStore(
    record.subscribe,
    // no need to wrap with use callback because of initialOrFactory dependency
    () => record.getSnapshot(initialOrFactory),
    typeof initialOrFactory === 'undefined'
      ? undefined
      : () => getValue(initialOrFactory) as TValue,
  );
}

function getValue<TValue>(initialOrCallback: TValue | (() => TValue)): TValue {
  if (typeof initialOrCallback === 'function') {
    return (initialOrCallback as Function)();
  }

  return initialOrCallback;
}
