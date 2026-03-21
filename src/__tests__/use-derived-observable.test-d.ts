
import { of } from 'rxjs';

import { useDerivedValue } from '../use-derived-value';


describe('useDerivedValue', () => {
  describe('Typing', () => {
    test('return optional type when initial not passed', () => {
      const observableNumber = of(1);
      const producerNumber = (value: number) => value + 1;

      const observableString = of('1');
      const producerString = (value: string) => value + '1';

      expectTypeOf(useDerivedValue(observableNumber, producerNumber)).toEqualTypeOf<number | undefined>();
      expectTypeOf(useDerivedValue(observableString, producerString)).toEqualTypeOf<string | undefined>();
    });

    test('return strict type when initial is passed', () => {
      const observableNumber = of(1);
      const producerNumber = (value: number) => value + 1;

      const observableString = of('1');
      const producerString = (value: string) => value + '1';

      expectTypeOf(useDerivedValue(observableNumber, producerNumber, 0)).toEqualTypeOf<number>();
      expectTypeOf(useDerivedValue(observableNumber, producerNumber, () => 0)).toEqualTypeOf<number>();
      expectTypeOf(useDerivedValue(observableString, producerString, '0')).toEqualTypeOf<string>();
      expectTypeOf(useDerivedValue(observableString, producerString, () => '0')).toEqualTypeOf<string>();
    });

    test('producer function is changing return type', () => {
      const observableString = of('1');
      // string -> number
      const producerString = (value: string) => value.length;

      expectTypeOf(useDerivedValue(observableString, producerString)).toEqualTypeOf<number | undefined>();
    });

    test('initial matches type of derived', () => {
      const observableNumber = of(1);
      const numberToString = (value: number) => String(value);

      const observableString = of('1');
      const stringToNumber = (value: string) => value.length;

      expectTypeOf(useDerivedValue(observableNumber, numberToString)).toEqualTypeOf<string | undefined>();
      expectTypeOf(useDerivedValue(observableNumber, numberToString, '')).toEqualTypeOf<string>();
      expectTypeOf(useDerivedValue(observableNumber, numberToString, () => '')).toEqualTypeOf<string>();

      expectTypeOf(useDerivedValue(observableString, stringToNumber)).toEqualTypeOf<number | undefined>();
      expectTypeOf(useDerivedValue(observableString, stringToNumber, 0)).toEqualTypeOf<number>();
      expectTypeOf(useDerivedValue(observableString, stringToNumber, () => 0)).toEqualTypeOf<number>();
    });

    test('undefined allowed in initial', () => {
      const observableNumber = of(1);
      const producerNumber = (value: number) => value + 1;
      const observableString = of('1');
      const producerString = (value: string) => value + '1';

      expectTypeOf(useDerivedValue(observableNumber, producerNumber, undefined)).toEqualTypeOf<number | undefined>();
      expectTypeOf(useDerivedValue(observableString, producerString, undefined)).toEqualTypeOf<string | undefined>();
    });
  });
});
