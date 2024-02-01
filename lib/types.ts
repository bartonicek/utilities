/** Asserts that `T` is of type `U`. Useful in some type definitions
 *  where TypeScript type inference fails.
 */
export type As<T, U> = T extends U ? T : never;

/** Unwraps one level of type aliasing. E.g. if `type T = { name: string }`,
 * `type U = { age: number }`, then `type V = Normalize<T & U>` turns into
 * `{ name: string, age : number}` in the type hints (and not just `T & U`).
 */
export type Normalize<T> = { [key in keyof T]: T[key] } & {};

/** A generic function. */
export type Callback = (...args: any) => any;

/** A function that takes no arguments and returns no value
 * (but may do something as a side-effect). */
export type SideEffect = () => void;

/** An object that has a method that returns its string representation. */
export type Stringable = { toString(): string };

/** An dictionary of key-value pairs. */
export type Dict = Record<PropertyKey, any>;

/** Function that lazily returns `T`. */
export type Lazy<T> = () => T;

/** Function that maps `T` to `U`. */
export type MapFn<T, U> = (next: T) => U;

/** Function that takes in `U` and `T` and returns a `U`. */
export type ReduceFn<T, U> = (prev: U, next: T) => U;

/** A constructor of a class `T`. */
export type Constructor<T> = new (...args: any[]) => T;

/** A rectangle defined by the coordinates of the four corners.*/
export type Rect = [x0: number, y0: number, x1: number, y1: number];

const alphabet = `abcdefghijklmnopqrstuvwxyz` as const;
/** Letter of the alphabet. */
export type Letter = (typeof alphabet)[number];

/** Helper type for defining (key) labels based on a pattern. */
export type Label<T extends string, U extends string | number> = `${T}${U}`;
