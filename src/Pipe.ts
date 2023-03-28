import { F } from 'ts-toolbelt';

export type Success<T> = {
  type: 'success';
  value: T;
};
export type Error<E> = {
  type: 'error';
  error: E;
};

export class AsyncPipe<T = never, E = never> {
  private value: Promise<Success<T> | Error<E>>;

  constructor(e: Success<T> | Error<E> | Promise<Success<T> | Error<E>>) {
    this.value = e instanceof Promise ? e : Promise.resolve(e);
  }

  static create() {
    return new AsyncPipe({
      type: 'success',
      value: undefined as never,
    });
  }

  // eslint-disable-next-line max-len
  pipe<T1 = never, E1 = never>(f: (v: T) => ConstructorParameters<typeof AsyncPipe<F.Narrow<T1>, F.Narrow<E1>>>[0]): AsyncPipe<F.Narrow<T1>, E | F.Narrow<E1>> {
    return new AsyncPipe(this.value.then<Success<F.Narrow<T1>> | Error<E | F.Narrow<E1>>>(e => (
      e.type === 'error' ? e : f(e.value)
    )));
  }

  eject = () => this.value as Promise<Exclude<Awaited<typeof this.value>, Error<never> | Success<never>>>;
}

export abstract class PipeError<E = never> {
  constructor(private value: Error<E>) {}

  abstract pipe(): PipeError<E>;
  abstract eject(): Error<E>;
}

export class Pipe<T = never, E = never> {
  constructor(private value: Success<T> | Error<E>) {}

  static create() {
    return new Pipe({
      type: 'success',
      value: undefined as never,
    });
  }

  pipe<T1 = never, E1 = never>(f: (e: T) => Success<F.Narrow<T1>> | Error<F.Narrow<E1>>): Pipe<T1, E | E1>;
  pipe<T1 = never, E1 = never>(f: (e: T) => Promise<Success<F.Narrow<T1>> | Error<F.Narrow<E1>>>): (
    | (PipeError<E> extends PipeError<never> ? never : PipeError<E>)
    | AsyncPipe<T1, E1>
  );
  pipe<T1, E1>(f: (e: T) => Success<T1> | Error<E1> | Promise<Success<T1> | Error<E1>>): Pipe<T1, E | E1> | PipeError<E> | AsyncPipe<T1, E1> {
    const v = this.value;

    if(v.type === 'error') {
      return new Pipe(v);
    }

    const result = f(v.value);

    return result instanceof Promise ? new AsyncPipe(result) : new Pipe(result);
  }

  eject = () => this.value as Exclude<typeof this.value, Error<never> | Success<never>>;
}
