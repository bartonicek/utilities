// Higher order-ish utility functions

export const just =
  <T>(x: T) =>
  () =>
    x;

export const zero = just(0);
export const one = just(1);
export const POJO = just({});

export function noop() {}

export function identity<T>(x: T) {
  return x;
}

export function call(fn: (...args: any[]) => any) {
  return fn();
}

export function lazy<T>(x: T) {
  return () => x;
}

export function firstArgument<T>(x: T, _: any) {
  return x;
}

export function secondArgument<T>(_: any, y: T) {
  return y;
}

export function inSequence(fn1: Function, fn2: Function) {
  return function () {
    fn1();
    fn2();
  };
}

export function unwrap<T>(x: { value: () => T }) {
  return x.value();
}

// Unary functions

export function asString(x: { toString(): string }) {
  return x.toString();
}

export function asInt(x: string) {
  return parseInt(x, 10);
}

// Text manipulation functions

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Binary functions

export function diff(x: number, y: number) {
  return x - y;
}

export function sum(x: number, y: number) {
  return x + y;
}

export function prod(x: number, y: number) {
  return x * y;
}

export function compareAlphaNumeric(x: string, y: string) {
  return x.localeCompare(y, "en", { numeric: true });
}

// Array functions

export function seq(start: number, end: number, length?: number) {
  const range = Math.abs(end - start);
  length = length ?? Math.ceil(range) + 1;
  const inc = range / (length - 1);
  const sign = end >= start ? 1 : -1;
  return Array.from(Array(length), (_, i) => start + sign * inc * i);
}

export function minMax(x: number[]): [number, number] {
  let [min, max] = [Infinity, -Infinity];
  for (let i = 0; i < x.length; i++) {
    min = Math.min(min, x[i]);
    max = Math.max(max, x[i]);
  }
  return [min, max];
}

export function orderBy<T>(array: T[], orderArray: number[]) {
  const result = [...array];
  result.sort((a, b) => {
    return Math.sign(
      orderArray[result.indexOf(a)] - orderArray[result.indexOf(b)]
    );
  });

  return result;
}

export function match<T>(array: T[], lookup: T[]) {
  const result = [] as number[];
  for (let i = 0; i < array.length; i++) result.push(lookup.indexOf(array[i]));
  return result;
}

// Object functions

export function keys<T extends Record<PropertyKey, unknown>>(object: T) {
  return Object.keys(object) as (keyof T)[];
}

export function values<T extends Record<PropertyKey, unknown>>(object: T) {
  return Object.values(object) as T[keyof T][];
}

export function entries<T extends Record<PropertyKey, unknown>>(object: T) {
  return Object.entries(object) as {
    [key in keyof T]: [key, T[key]];
  }[keyof T][];
}

export function allKeys<T extends Record<PropertyKey, unknown>>(object: T) {
  return Reflect.ownKeys(object) as (keyof T)[];
}

export function allValues<T extends Record<PropertyKey, unknown>>(object: T) {
  const result = [] as { [key in keyof T]: T[key] }[keyof T][];
  for (const k of allKeys(object)) result.push(object[k]);
  return result;
}

export function allEntries<T extends Record<PropertyKey, unknown>>(object: T) {
  const result = [] as { [key in keyof T]: [key, T[key]] }[keyof T][];
  for (const k of allKeys(object)) result.push([k, object[k]]);
  return result;
}

export function unwrapAll<T extends Record<PropertyKey, { value(): any }>>(
  object: T
) {
  const result = {} as {
    [key in keyof T]: ReturnType<T[key]["value"]>;
  };
  for (const [k, v] of allEntries(object)) result[k] = v.value();
  return result;
}
