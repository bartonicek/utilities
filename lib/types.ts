export type Callback = (...args: any) => any;
export type SideEffect = () => void;
export type Stringable = { toString(): string };
export type Dict = Record<PropertyKey, any>;

export type Lazy<T> = () => T;
export type MapFn<T, U> = (next: T) => U;
export type ReduceFn<T, U> = (prev: U, next: T) => U;
