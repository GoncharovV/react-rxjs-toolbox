import { useMemo, useRef } from 'react';
import { distinctUntilChanged, Observable } from 'rxjs';

import { useObservable } from './use-observable';


export function useDistinctObservable<TValue>(
  observable: Observable<TValue>,
): TValue | undefined;
export function useDistinctObservable<TValue, TInitial extends TValue | undefined>(
  observable: Observable<TValue>,
  initialOrFactory: TInitial | (() => TInitial),
  comparator?: (a: TValue, b: TValue) => boolean,
): TValue | TInitial;
export function useDistinctObservable<TValue, TInitial extends TValue | undefined = undefined>(
  observable: Observable<TValue>,
  initialOrFactory?: TInitial | (() => TInitial),
  comparator?: (a: TValue, b: TValue) => boolean,
): TValue | TInitial {
  const comparatorRef = useRef(comparator);
  comparatorRef.current = comparator;

  const distinctObservable = useMemo(() => {
    return observable.pipe(
      distinctUntilChanged(comparatorRef.current),
    );
  }, [observable]);

  return useObservable(distinctObservable, initialOrFactory) as TValue;
}
