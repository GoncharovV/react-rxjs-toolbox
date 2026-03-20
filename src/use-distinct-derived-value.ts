import { useMemo, useRef } from 'react';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { useObservable } from './use-observable';


export function useDistinctDerivedValue<TValue, TDerived>(
  observable: Observable<TValue>,
  producer: (value: TValue) => TDerived,
  comparator?: (a: TDerived, b: TDerived) => boolean,
) {
  const ref = useRef({ producer, comparator });
  ref.current = { producer, comparator };

  const derivedObservable = useMemo(() => {
    return observable.pipe(
      map((value) => ref.current.producer(value)),
      distinctUntilChanged(ref.current.comparator),
    );
  }, [observable]);

  return useObservable(derivedObservable);
}
