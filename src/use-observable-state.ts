import { Dispatch, SetStateAction, useMemo, useSyncExternalStore } from 'react';
import { BehaviorSubject } from 'rxjs';


export type ObservableStateSetter<TValue> = Dispatch<SetStateAction<TValue>>;


export function useObservableState<TValue>(subject: BehaviorSubject<TValue>): [TValue, ObservableStateSetter<TValue>] {
  const { subscribe, getValue, setValue } = useMemo(() => {
    const getValue = subject.getValue.bind(subject);

    const subscribe = (notify: () => void) => {
      const subscription = subject.subscribe(notify);

      return () => {
        subscription.unsubscribe();
      };
    };

    const setValue: ObservableStateSetter<TValue> = (valueOrFactory) => {
      const newValue = typeof valueOrFactory === 'function'
        ? (valueOrFactory as Function)(subject.getValue()) // call getValue only if necessary
        : valueOrFactory;

      subject.next(newValue);
    };

    return {
      subscribe,
      getValue,
      setValue,
    };
  }, [subject]);


  const state = useSyncExternalStore(
    subscribe,
    getValue,
    getValue,
  );

  return [state, setValue];
}
