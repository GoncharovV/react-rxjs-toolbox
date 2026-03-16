import { useMemo, useRef } from 'react';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { useObservable } from './use-observable';

// TODO: note about value WILL NOT be changed if producer changes until new value is emitted


export function useDerivedValue<TValue, TDerived>(
  observable: Observable<TValue>,
  producer: (value: TValue) => TDerived,
) {
  const producerRef = useRef(producer);
  producerRef.current = producer;

  const derivedObservable = useMemo(() => {
    return observable.pipe(
      map((value) => producerRef.current(value)),
    );
  }, [observable]);

  return useObservable(derivedObservable);
}

// TODO: remove duplication if code become more complex

export function useDistinctDerivedValue<TValue, TDerived>(
  observable: Observable<TValue>,
  producer: (value: TValue) => TDerived,
) {
  const producerRef = useRef(producer);
  producerRef.current = producer;

  const derivedObservable = useMemo(() => {
    return observable.pipe(
      map((value) => producerRef.current(value)),
      distinctUntilChanged(),
    );
  }, [observable]);

  return useObservable(derivedObservable);
}
