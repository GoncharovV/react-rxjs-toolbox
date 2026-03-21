import { Observable } from 'rxjs';
import { act, render, renderHook } from '@testing-library/react';

import { useObservable } from '../use-observable';


function createObservableWithSubscribersCount() {
  const subscribersRef = { count: 0 };

  const observable = new Observable(() => {
    subscribersRef.count++;

    return () => {
      subscribersRef.count--;
    };
  });

  return {
    observable,
    subscribersRef,
  };
}


describe('useObservable', () => {
  test('should subscribe on component mount', async () => {
    const { observable, subscribersRef } = createObservableWithSubscribersCount();

    expect(subscribersRef.count).toBe(0);

    const { unmount } = renderHook(() => useObservable(observable));

    expect(subscribersRef.count).toBe(1);

    unmount();

    await Promise.resolve();

    expect(subscribersRef.count).toBe(0);
  });
});
