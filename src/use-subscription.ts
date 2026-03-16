
import { useRef } from 'react';
import { Observable, Observer, Subscription } from 'rxjs';

import { useIsomorphicLayoutEffect } from './internal/isomorphic-layout-effect';


export function useSubscription<TValue>(
  observable: Observable<TValue>,
  observer: ((value: TValue) => void) | Partial<Observer<TValue>>,
) {
  const observerRef = useRef(observer);
  observerRef.current = observer;

  const subscriptionRef = useRef<Subscription | null>(undefined);

  useIsomorphicLayoutEffect(() => {
    const subscription = observable.subscribe({
      next: (value) => {
        if (typeof observerRef.current === 'function') {
          observerRef.current(value);
        } else {
          observerRef.current.next?.(value);
        }
      },
      error: (error) => {
        if (typeof observerRef.current === 'object') {
          observerRef.current.error?.(error);
        }
      },
      complete: () => {
        if (typeof observerRef.current === 'object') {
          observerRef.current.complete?.();
        }
      },
    });

    subscriptionRef.current = subscription;

    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);

  return subscriptionRef;
}
