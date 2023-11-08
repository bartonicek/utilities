export type Key = string | number | symbol;
export type Callback = (...args: any) => any;
export type SideEffect = (...args: any) => void;

export type Lazy<T> = () => T;
export type MapFn<T, U> = (next: T) => U;
export type ReduceFn<T, U> = (prev: U, next: T) => U;

export type Stringable = { toString(): string };
export type Dict = Record<Key, any>;
