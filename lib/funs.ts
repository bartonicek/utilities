// Higher order-ish utility functions

import { Key } from "./types";

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

export function POJO() {
  return {};
}

export function inSequence(fn1: Function, fn2: Function) {
  return function () {
    fn1();
    fn2();
  };
}

export function unwrap(x: { value: () => any }) {
  return x.value();
}

// Unary functions

export function asString(x: any) {
  return x.toString();
}

export function asInt(x: string) {
  return parseInt(x, 10);
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

export function seq(start: number, end: number) {
  const length = Math.abs(end - start) + 1;
  const sign = end >= start ? 1 : -1;
  return Array.from(Array(length), (_, i) => start + sign * i);
}

export function minMax(x: number[]) {
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

// Object functions

export function allKeys<T extends Record<Key, any>>(x: T) {
  return Reflect.ownKeys(x) as (keyof T)[];
}

export function allValues<T extends Record<Key, any>>(x: T) {
  const result = [] as {
    [key in keyof T]: T[key];
  }[keyof T][];
  for (const k of allKeys(x)) result.push(x[k]);
  return result;
}

export function allEntries<T extends Record<Key, any>>(x: T) {
  const result = [] as {
    [key in keyof T]: [key, T[key]];
  }[keyof T][];
  for (const k of allKeys(x)) result.push([k, x[k]]);
  return result;
}

export function unwrapAll<T extends Record<Key, { value(): any }>>(x: T) {
  const result = {} as {
    [key in keyof T]: ReturnType<T[key]["value"]>;
  };
  for (const [k, v] of allEntries(x)) result[k] = v.value();
  return result;
}
