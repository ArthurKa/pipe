/* eslint-disable require-await */
/* eslint-disable no-constant-condition */

import { Pipe } from '../build';

const makeSuccess = <T>(value: T) => ({ type: 'success' as const, value });
const makeError = <E>(error: E) => ({ type: 'error' as const, error });

const syncExpect = (e: unknown, toBe: unknown) => {
  expect(e).toStrictEqual(toBe);
};
const asyncExpect = async (e: unknown, toBe: unknown) => {
  expect(e).toBeInstanceOf(Promise);
  expect(await e).toStrictEqual(toBe);
};

describe('1 pipe', () => {
  test('sync', () => {
    const success = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .eject();
    const error = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .eject();

    syncExpect(success, makeSuccess(1));
    syncExpect(error, makeError('e1'));
  });

  test('async', async () => {
    const success = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .eject();
    const error = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .eject();

    await asyncExpect(success, makeSuccess(1));
    await asyncExpect(error, makeError('e1'));
  });
});

describe('2 pipes', () => {
  test('sync sync', () => {
    const result1 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result2 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result3 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result4 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();

    syncExpect(result1, makeSuccess(2));
    syncExpect(result2, makeError('e2'));
    syncExpect(result3, makeError('e1'));
    syncExpect(result4, makeError('e1'));
  });

  test('sync async', async () => {
    const result1 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result2 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result3 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result4 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();

    await asyncExpect(result1, makeSuccess(2));
    await asyncExpect(result2, makeError('e2'));
    syncExpect(result3, makeError('e1'));
    syncExpect(result4, makeError('e1'));
  });

  test('async sync', async () => {
    const result1 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result2 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result3 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result4 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();

    await asyncExpect(result1, makeSuccess(2));
    await asyncExpect(result2, makeError('e2'));
    await asyncExpect(result3, makeError('e1'));
    await asyncExpect(result4, makeError('e1'));
  });

  test('async async', async () => {
    const result1 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result2 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result3 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .eject();
    const result4 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .eject();

    await asyncExpect(result1, makeSuccess(2));
    await asyncExpect(result2, makeError('e2'));
    await asyncExpect(result3, makeError('e1'));
    await asyncExpect(result4, makeError('e1'));
  });
});

describe('3 pipes', () => {
  test('sss', () => {
    const result1 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    syncExpect(result1, makeSuccess(3));
    syncExpect(result2, makeError('e3'));
    syncExpect(result3, makeError('e2'));
    syncExpect(result4, makeError('e2'));
    syncExpect(result5, makeError('e1'));
    syncExpect(result6, makeError('e1'));
    syncExpect(result7, makeError('e1'));
    syncExpect(result8, makeError('e1'));
  });

  test('ssa', async () => {
    const result1 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    await asyncExpect(result1, makeSuccess(3));
    await asyncExpect(result2, makeError('e3'));
    syncExpect(result3, makeError('e2'));
    syncExpect(result4, makeError('e2'));
    syncExpect(result5, makeError('e1'));
    syncExpect(result6, makeError('e1'));
    syncExpect(result7, makeError('e1'));
    syncExpect(result8, makeError('e1'));
  });

  test('sas', async () => {
    const result1 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    await asyncExpect(result1, makeSuccess(3));
    await asyncExpect(result2, makeError('e3'));
    await asyncExpect(result3, makeError('e2'));
    await asyncExpect(result4, makeError('e2'));
    syncExpect(result5, makeError('e1'));
    syncExpect(result6, makeError('e1'));
    syncExpect(result7, makeError('e1'));
    syncExpect(result8, makeError('e1'));
  });

  test('saa', async () => {
    const result1 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(() => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(() => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    await asyncExpect(result1, makeSuccess(3));
    await asyncExpect(result2, makeError('e3'));
    await asyncExpect(result3, makeError('e2'));
    await asyncExpect(result4, makeError('e2'));
    syncExpect(result5, makeError('e1'));
    syncExpect(result6, makeError('e1'));
    syncExpect(result7, makeError('e1'));
    syncExpect(result8, makeError('e1'));
  });

  test('ass', async () => {
    const result1 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    await asyncExpect(result1, makeSuccess(3));
    await asyncExpect(result2, makeError('e3'));
    await asyncExpect(result3, makeError('e2'));
    await asyncExpect(result4, makeError('e2'));
    await asyncExpect(result5, makeError('e1'));
    await asyncExpect(result6, makeError('e1'));
    await asyncExpect(result7, makeError('e1'));
    await asyncExpect(result8, makeError('e1'));
  });

  test('asa', async () => {
    const result1 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(() => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    await asyncExpect(result1, makeSuccess(3));
    await asyncExpect(result2, makeError('e3'));
    await asyncExpect(result3, makeError('e2'));
    await asyncExpect(result4, makeError('e2'));
    await asyncExpect(result5, makeError('e1'));
    await asyncExpect(result6, makeError('e1'));
    await asyncExpect(result7, makeError('e1'));
    await asyncExpect(result8, makeError('e1'));
  });

  test('aas', async () => {
    const result1 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(() => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    await asyncExpect(result1, makeSuccess(3));
    await asyncExpect(result2, makeError('e3'));
    await asyncExpect(result3, makeError('e2'));
    await asyncExpect(result4, makeError('e2'));
    await asyncExpect(result5, makeError('e1'));
    await asyncExpect(result6, makeError('e1'));
    await asyncExpect(result7, makeError('e1'));
    await asyncExpect(result8, makeError('e1'));
  });

  test('aaa', async () => {
    const result1 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result2 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result3 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result4 = Pipe.create()
      .pipe(async () => 1 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result5 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result6 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 1 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result7 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 1 ? makeSuccess(3) : makeError('e3'))
      .eject();
    const result8 = Pipe.create()
      .pipe(async () => 0 ? makeSuccess(1) : makeError('e1'))
      .pipe(async () => 0 ? makeSuccess(2) : makeError('e2'))
      .pipe(async () => 0 ? makeSuccess(3) : makeError('e3'))
      .eject();

    await asyncExpect(result1, makeSuccess(3));
    await asyncExpect(result2, makeError('e3'));
    await asyncExpect(result3, makeError('e2'));
    await asyncExpect(result4, makeError('e2'));
    await asyncExpect(result5, makeError('e1'));
    await asyncExpect(result6, makeError('e1'));
    await asyncExpect(result7, makeError('e1'));
    await asyncExpect(result8, makeError('e1'));
  });
});

describe('With Promise.resolve', () => {
  test('·', async () => {
    const success = Pipe.create()
      .pipe(() => Promise.resolve(1 ? makeSuccess(1) : makeError('e1')))
      .eject();
    const error = Pipe.create()
      .pipe(() => Promise.resolve(0 ? makeSuccess(1) : makeError('e1')))
      .eject();

    await asyncExpect(success, makeSuccess(1));
    await asyncExpect(error, makeError('e1'));
  });
});

describe('With object values', () => {
  test('·', async () => {
    const success = Pipe.create()
      .pipe(() => Promise.resolve(1 ? makeSuccess({ a: 1 }) : makeError({ e: 1 })))
      .eject();
    const error = Pipe.create()
      .pipe(() => Promise.resolve(0 ? makeSuccess({ a: 1 }) : makeError({ e: 1 })))
      .eject();

    await asyncExpect(success, makeSuccess({ a: 1 }));
    await asyncExpect(error, makeError({ e: 1 }));
  });
});

describe('Using inputs', () => {
  test('·', () => {
    const result1 = Pipe.create()
      .pipe(() => makeSuccess('asd3qwe'))
      .pipe(e => {
        const n = e[2];

        return n === void 0 ? makeError('Wrong type') : makeSuccess(n);
      })
      .pipe(e => {
        const n = Number(e);

        return Number.isFinite(n) ? makeSuccess(n) : makeError('Is not a number');
      })
      .pipe(e => makeSuccess(2 ** e))
      .pipe(e => makeSuccess(e + 1))
      .pipe(e => makeSuccess(e ** 2))
      .eject();
    const result2 = Pipe.create()
      .pipe(() => makeSuccess('asd3qwe'))
      .pipe(e => {
        const n = e[3];

        return n === void 0 ? makeError('Wrong type') : makeSuccess(n);
      })
      .pipe(e => {
        const n = Number(e);

        return Number.isFinite(n) ? makeSuccess(n) : makeError('Is not a number');
      })
      .pipe(e => makeSuccess(2 ** e))
      .pipe(e => makeSuccess(e + 1))
      .pipe(e => makeSuccess(e ** 2))
      .eject();

    syncExpect(result1, makeError('Is not a number'));
    syncExpect(result2, makeSuccess(81));
  });
});

describe('A lot of pipes', () => {
  test('·', () => {
    let result = Pipe.create().pipe(() => makeSuccess(4 as number));

    for(let i = 0; i < 50; i++) {
      result = result.pipe(e => makeSuccess(e + i));
    }

    syncExpect(result.eject(), makeSuccess(1229));
  });
});
