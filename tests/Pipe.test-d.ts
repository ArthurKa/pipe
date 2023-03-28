/* eslint-disable no-lone-blocks */
/* eslint-disable require-await */

import { expectType } from 'tsd';
import { AsyncPipe, Error, Pipe, PipeError, Success } from '../build';

const makeSuccess = <T>(value: T) => ({ type: 'success' as const, value });
const makeError = <E>(error: E) => ({ type: 'error' as const, error });

(async () => {
  {
    {
      const result = Pipe.create();
      //     ^?

      expectType<Pipe<never, never>>(result);
      expectType<never>(result.eject());
    }
    {
      const result = Pipe.create().pipe(() => makeSuccess(123));
      //     ^?

      expectType<Pipe<123, never>>(result);
      expectType<Success<123>>(result.eject());
    }
    {
      const result = Pipe.create().pipe(() => makeError(123));
      //     ^?

      expectType<Pipe<never, 123>>(result);
      expectType<Error<123>>(result.eject());
    }
  }

  // 1 pipe
  {
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(() => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
      );

      expectType<Pipe<1, 'e1'>>(result);
      expectType<Success<1> | Error<'e1'>>(result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
      );

      expectType<AsyncPipe<1, 'e1'>>(result);
      expectType<Promise<Success<1> | Error<'e1'>>>(result.eject());
      expectType<Success<1> | Error<'e1'>>(await result.eject());
    }
  }

  // 2 pipes
  {
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(() => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
      );

      expectType<Pipe<2, 'e1' | 'e2'>>(result);
      expectType<Success<2> | Error<'e1' | 'e2'>>(result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(() => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
      );

      expectType<PipeError<'e1'> | AsyncPipe<2, 'e2'>>(result);
      expectType<Error<'e1'> | Promise<Success<2> | Error<'e2'>>>(result.eject());
      expectType<Error<'e1'> | Error<'e2'> | Success<2>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
      );

      expectType<AsyncPipe<2, 'e1' | 'e2'>>(result);
      expectType<Promise<Success<2> | Error<'e1' | 'e2'>>>(result.eject());
      expectType<Success<2> | Error<'e1' | 'e2'>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
      );

      expectType<AsyncPipe<2, 'e1' | 'e2'>>(result);
      expectType<Promise<Success<2> | Error<'e1' | 'e2'>>>(result.eject());
      expectType<Success<2> | Error<'e1' | 'e2'>>(await result.eject());
    }
  }

  // 3 pipes
  {
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(() => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<Pipe<3, 'e1' | 'e2' | 'e3'>>(result);
      expectType<Success<3> | Error<'e1' | 'e2' | 'e3'>>(result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(() => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<PipeError<'e1' | 'e2'> | AsyncPipe<3, 'e3'>>(result);
      expectType<Error<'e1' | 'e2'> | Promise<Success<3> | Error<'e3'>>>(result.eject());
      expectType<Error<'e1' | 'e2'> | Success<3> | Error<'e3'>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(() => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<PipeError<'e1'> | AsyncPipe<3, 'e2' | 'e3'>>(result);
      expectType<Error<'e1'> | Promise<Success<3> | Error<'e2' | 'e3'>>>(result.eject());
      expectType<Error<'e1'> | Success<3> | Error<'e2' | 'e3'>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(() => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<PipeError<'e1'> | AsyncPipe<3, 'e2' | 'e3'>>(result);
      expectType<Error<'e1'> | Promise<Success<3> | Error<'e2' | 'e3'>>>(result.eject());
      expectType<Error<'e1'> | Success<3> | Error<'e2' | 'e3'>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<AsyncPipe<3, 'e1' | 'e2' | 'e3'>>(result);
      expectType<Promise<Success<3> | Error<'e1' | 'e2' | 'e3'>>>(result.eject());
      expectType<Success<3> | Error<'e1' | 'e2' | 'e3'>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<AsyncPipe<3, 'e1' | 'e2' | 'e3'>>(result);
      expectType<Promise<Success<3> | Error<'e1' | 'e2' | 'e3'>>>(result.eject());
      expectType<Success<3> | Error<'e1' | 'e2' | 'e3'>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(() => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<AsyncPipe<3, 'e1' | 'e2' | 'e3'>>(result);
      expectType<Promise<Success<3> | Error<'e1' | 'e2' | 'e3'>>>(result.eject());
      expectType<Success<3> | Error<'e1' | 'e2' | 'e3'>>(await result.eject());
    }
    {
      const result = (
        //     ^?
        Pipe.create()
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(1) : makeError('e1'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(2) : makeError('e2'))
          .pipe(async () => Math.random() > 0.5 ? makeSuccess(3) : makeError('e3'))
      );

      expectType<AsyncPipe<3, 'e1' | 'e2' | 'e3'>>(result);
      expectType<Promise<Success<3> | Error<'e1' | 'e2' | 'e3'>>>(result.eject());
      expectType<Success<3> | Error<'e1' | 'e2' | 'e3'>>(await result.eject());
    }
  }

  // With Promise.resolve
  {
    {
      const result = (
        //    ^?
        Pipe.create()
          .pipe(() => Promise.resolve(Math.random() > 0.5 ? makeSuccess(1) : makeError('e1')))
      );

      expectType<AsyncPipe<number, string>>(result);
      expectType<Promise<Success<number> | Error<string>>>(result.eject());
      expectType<Success<number> | Error<string>>(await result.eject());
    }
    {
      const result = (
        //    ^?
        Pipe.create()
          .pipe(() => Promise.resolve(Math.random() > 0.5 ? makeSuccess(1 as const) : makeError('e1' as const)))
      );

      expectType<AsyncPipe<1, 'e1'>>(result);
      expectType<Promise<Success<1> | Error<'e1'>>>(result.eject());
      expectType<Success<1> | Error<'e1'>>(await result.eject());
    }
  }

  // Using inputs
  {
    const result = (
      //   ^?
      Pipe.create()
        .pipe(e => {
          expectType<never>(e);
          return makeSuccess('asd3qwe');
        })
        .pipe(e => {
          expectType<'asd3qwe'>(e);

          const n = e[2];
          expectType<string | undefined>(n);

          return n === void 0 ? makeError('Wrong type') : makeSuccess(n);
        })
        .pipe(e => {
          expectType<string>(e);
          const n = Number(e);

          return Number.isFinite(n) ? makeSuccess(n) : makeError('Is not a number');
        })
        .pipe(e => {
          expectType<number>(e);
          return makeSuccess(2 ** e);
        })
        .pipe(e => {
          expectType<number>(e);
          return makeSuccess(e + 1);
        })
        .pipe(e => {
          expectType<number>(e);
          return makeSuccess(e ** 2);
        })
    );

    expectType<Pipe<number, 'Wrong type' | 'Is not a number'>>(result);
    expectType<Success<number> | Error<'Wrong type' | 'Is not a number'>>(result.eject());
  }
})();
