import { of } from 'rxjs';

import { useObservable } from '../use-observable';


describe('useObservable', () => {
  describe('Typing', () => {
    test('return optional type when initial not passed', () => {
      const observableNumber = of(1);
      const observableString = of('1');

      expectTypeOf(useObservable(observableNumber)).toEqualTypeOf<number | undefined>();
      expectTypeOf(useObservable(observableString)).toEqualTypeOf<string | undefined>();
    });

    test('return strict type when initial is passed', () => {
      const observableNumber = of(1);
      const observableString = of('1');

      expectTypeOf(useObservable(observableNumber, 0)).toEqualTypeOf<number>();
      expectTypeOf(useObservable(observableNumber, () => 0)).toEqualTypeOf<number>();
      expectTypeOf(useObservable(observableString, '0')).toEqualTypeOf<string>();
      expectTypeOf(useObservable(observableString, () => '0')).toEqualTypeOf<string>();
    });

    test('undefined allowed in initial', () => {
      const observableNumber = of(1);
      const observableString = of('1');

      expectTypeOf(useObservable(observableNumber, undefined)).toEqualTypeOf<number | undefined>();
      expectTypeOf(useObservable(observableString, undefined)).toEqualTypeOf<string | undefined>();
    });
  });
});
