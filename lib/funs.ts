import { Constructor, Dict } from "./types";

/**
 * Takes a value and returns it lazily.
 *
 * @param x Any value
 * @returns A function that returns that value
 */
export const just =
  <T>(x: T) =>
  () =>
    x;

/**
 * Takes a function that takes a variable number of arguments
 * and returns a version of that function that only takes
 * in the first argument.
 *
 * @param fn A function
 * @returns A unary function
 */
export function unary<T extends (...args: any[]) => any>(fn: T) {
  return function (arg: Parameters<T>[0]): ReturnType<T> {
    return fn(arg);
  };
}

/** Lazily returns the value 0. */
export const zero = just(0);

/** Lazily returns the value 1. */
export const one = just(1);

/** Lazily returns a Plain Old JavaScript Object. */
export const POJO = just({});

/** Function that does nothing. */
export function noop() {}

/**
 * A function that merely returns `this`.
 *
 * @param this Any context
 * @returns The context back
 */
export function noopThis<T>(this: T) {
  return this;
}

/**
 * Turns a callback into a chainable method by making it return `this`
 * (useful when assigning callbacks as methods in the constructor)
 *
 * @param fn A callback
 * @returns A function that calls the function above and returns `this`
 */
export function chainable<T extends any[]>(fn: (...args: T) => void) {
  return function (this: any, ...args: T) {
    fn(...args);
    return this;
  };
}

/**
 * Takes any value and returns it.
 *
 * @param x Any value
 * @returns The same value
 */
export function identity<T>(x: T) {
  return x;
}

/**
 * Takes in a callback and calls it immediately
 *
 * @param fn A callback
 * @returns The returntype of the callback
 */
export function call<T extends () => any>(fn: T) {
  return fn();
}

/**
 * Takes in any number of arguments and returns the first one.
 *
 * @param x The first argument
 * @param rest Rest of the arguments
 * @returns The first argument
 */
export function firstArgument<T>(x: T, ..._rest: any[]) {
  return x;
}

/**
 * Takes in any number of arguments and returns the second one.
 *
 * @param _ The first argument
 * @param y Any number of other arguments
 * @param rest Rest of the arguments
 * @returns The first argument
 */
export function secondArgument<T>(_: any, y: T, ..._rest: any[]) {
  return y;
}

/**
 * Takes in two functions and returns a function that calls them in sequence.
 *
 * @param fn1 A function
 * @param fn2 Another function
 * @returns A new function.
 */
export function inSequence(fn1: Function, fn2: Function) {
  return function () {
    fn1();
    fn2();
  };
}

/**
 * Calls the `value()` method on an object and returns it
 * @param x Object with a `value()` method
 * @returns The value
 */
export function unwrap<T>(x: { value: () => T }) {
  return x.value();
}

/**
 * Takes in an object an returns a function that returns values
 * from that object, given a key.
 *
 * @param dict An object/dictionary
 * @returns A function that takes in a key of the object
 */
export function subsetOn<T extends Dict>(dict: T) {
  return function (key: keyof T) {
    return dict[key];
  };
}

/**
 * Returns an HTML node element
 * @param arg An HTML tag
 * @retruns An HTML node
 */
export const element = unary(document.createElement.bind(document));

/**
 * Computes the square of a number.
 *
 * @param x A number
 * @returns The number squared
 */
export function square(x: number) {
  return x ** 2;
}

/**
 * Computes the square root of a number
 * @param x A number
 * @returns The square root of the number
 */
export function squareRoot(x: number) {
  return Math.sqrt(x);
}

/**
 * Increments a number by 1.
 *
 * @param x A number
 * @returns The number incremented by one
 */
export function inc(x: number) {
  return x + 1;
}

/**
 * Returns a function that multiplies numbers by `x`.
 * @param x The multiplier
 * @returns A function that multiplies numbers by the multiplier
 */
export function times(x: number) {
  return function (y: number) {
    return x * y;
  };
}

/**
 * Call the `toString()` method on an object and returns the value.
 *
 * @param x Object with `toString()` method
 * @returns The value
 */
export function asString(x: { toString(): string }) {
  return x.toString();
}

/**
 * Parses an integer from string.
 *
 * @param x A string
 * @returns A number (integer)
 */
export function asInt(x: string) {
  return parseInt(x, 10);
}

/**
 * Makes a fetch request and awaits the resulting JSON. Can throw!
 *
 * @param path A string URL or a path to a local file
 * @returns An object (JSON)
 */
export async function fetchJSON(path: string): Promise<unknown> {
  return await (await fetch(path)).json();
}

/**
 * Capitalizes a string.
 *
 * @param string A string
 * @returns A capitalized string
 */
export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Computes a difference between two numbers.
 *
 * @param x A number
 * @param y Another number
 * @returns A difference between the two numbers
 */
export function diff(x: number, y: number) {
  return x - y;
}

/**
 * Computes a sum of two numbers.
 *
 * @param x A number
 * @param y Another number
 * @returns A sum of the two numbers
 */
export function sum(x: number, y: number) {
  return x + y;
}

/**
 * Computes a product of two numbers.
 *
 * @param x A number
 * @param y Another number
 * @returns A product of the two numbers
 */
export function prod(x: number, y: number) {
  return x * y;
}

/**
 * Compares two string alphanumerically (i.e. `ABC2 < ABC20`). Use for sorting.
 * @param x An alphanumeric string
 * @param y Another alphanumeric string
 * @returns `1` if first greater, `-1` if second greater
 */
export function compareAlphaNumeric(x: string, y: string) {
  return x.localeCompare(y, "en", { numeric: true });
}

/**
 * Truncates a value between `min` and `max`.
 *
 * @param value A number
 * @param min Minimum
 * @param max Maximum
 * @returns Either `value`, `min`, or `max`
 */
export function trunc(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Truncates a value between 0 and 1.
 *
 * @param value A number
 * @returns Either `value`, 0, or 1.
 */
export function trunc0to1(value: number) {
  return trunc(value, 0, 1);
}

/**
 * Returns the last element of an array.
 * @param array An arbitrary array
 * @returns The last element
 */
export function last<T>(array: T[]) {
  return array[array.length - 1];
}

/**
 * Returns an ascending/descending sequence of numbers. If `length` is unspecified
 * and `start` and `end` are integers, will return a sequence of integers.
 *
 * @param start Start of the sequence.
 * @param end End of the sequence.
 * @param length Length of the sequence (optional)
 * @returns
 */
export function seq(start: number, end: number, length?: number) {
  const range = Math.abs(end - start);
  length = length ?? Math.ceil(range) + 1;
  const inc = range / (length - 1);
  const sign = end >= start ? 1 : -1;
  return Array.from(Array(length), (_, i) => start + sign * inc * i);
}

/**
 * Finds the minimum and the maximum of an array simultaneously.
 *
 * @param x An array of numbers.
 * @returns A tuple of the minimum and maximum
 */
export function minMax(x: number[]): [number, number] {
  let [min, max] = [Infinity, -Infinity];
  for (let i = 0; i < x.length; i++) {
    min = Math.min(min, x[i]);
    max = Math.max(max, x[i]);
  }
  return [min, max];
}

/**
 * Computes a cumulative sum of an array of numbers.
 *
 * @param array An array of numbers
 * @returns A array of equal length
 */
export function cumsum(array: number[]) {
  const result = [] as number[];
  result.push(array[0]);
  for (let i = 1; i < array.length; i++) {
    result.push(result[i - 1] + array[i]);
  }
  return result;
}

/**
 * Orders an array by another array which contains values by which to sort by.
 *
 * @param array An array of values
 * @param orderArray An array of numbers to sort by
 * @returns A sorted copy of the original array
 */
export function orderBy<T>(array: T[], orderArray: number[]) {
  const result = [...array];
  result.sort((a, b) => {
    return Math.sign(
      orderArray[result.indexOf(a)] - orderArray[result.indexOf(b)]
    );
  });

  return result;
}

/**
 * Returns an array of indices which match positions in a lookup array.
 *
 * @param array An array of values to find indices of.
 * @param lookup An array of lookup values.
 * @returns An array of indices
 */
export function match<T>(array: T[], lookup: T[]) {
  const result = [] as number[];
  for (let i = 0; i < array.length; i++) result.push(lookup.indexOf(array[i]));
  return result;
}

/**
 * Returns typed keys of an object.
 *
 * @param object An object
 * @returns A typed array of keys
 */
export function keys<T extends Record<PropertyKey, unknown>>(object: T) {
  return Object.keys(object) as (keyof T)[];
}

/**
 * Returns typed values of an object
 *
 *
 * @param object An object
 * @returns A typed array of values
 */
export function values<T extends Record<PropertyKey, unknown>>(object: T) {
  return Object.values(object) as T[keyof T][];
}

/**
 * Returns typed entries of an object
 *
 *
 * @param object An object
 * @returns A typed array of entries (key/value pairs)
 */
export function entries<T extends Record<PropertyKey, unknown>>(object: T) {
  return Object.entries(object) as {
    [key in keyof T]: [key, T[key]];
  }[keyof T][];
}

/**
 * Returns typed keys of an object, including symbols.
 *
 * @param object An object
 * @returns A typed array of keys
 */
export function allKeys<T extends Record<PropertyKey, unknown>>(object: T) {
  return Reflect.ownKeys(object) as (keyof T)[];
}

/**
 * Returns typed values of an object, including values of symbol-based keys.
 *
 * @param object An object
 * @returns A typed array of values
 */
export function allValues<T extends Record<PropertyKey, unknown>>(object: T) {
  const result = [] as { [key in keyof T]: T[key] }[keyof T][];
  for (const k of allKeys(object)) result.push(object[k]);
  return result;
}

/**
 * Returns typed entries of an object, including symbols and their respective values.
 *
 * @param object An object
 * @returns A typed array of entries (key/value pairs)
 */
export function allEntries<T extends Record<PropertyKey, unknown>>(object: T) {
  const result = [] as { [key in keyof T]: [key, T[key]] }[keyof T][];
  for (const k of allKeys(object)) result.push([k, object[k]]);
  return result;
}

/**
 * Call `value()` method on all entries of an object and returns the values.
 *
 * @param object Object with some properties with `value()` method
 * @returns The resulting values
 */
export function unwrapAll<T extends Record<PropertyKey, { value(): any }>>(
  object: T
) {
  const result = {} as {
    [key in keyof T]: ReturnType<T[key]["value"]>;
  };
  for (const [k, v] of allEntries(object)) result[k] = v.value();
  return result;
}

/**
 * Throttle a function to only fire once within a time-window.
 *
 * @param fn A function
 * @param period A period in ms
 * @returns A version of the function that only fires once within each period
 */
export function throttle(fn: Function, period: number) {
  let lastTime = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastTime < period) return;
    lastTime = now;
    fn(...args);
  };
}

/**
 * Merge values from one set into another.
 *
 * @param target Target set
 * @param source Source set
 * @returns The target set with values merged
 */
export function mergeIntoSet<T>(target: Set<T>, source: Set<T>) {
  for (const v of source) target.add(v);
  return target;
}

/**
 * Applies multiple mixins in a single go (works well as a decorator).
 * The mixins can depend on one another, e.g. `@applyMixins([foo, bar])`
 * will first apply `foo`, and `bar` can then make use of methods from `foo`.
 *
 * @param mixins An array of mixins
 * @returns A function that applies the mixins to a base class.
 */
export function applyMixins<T extends Constructor<unknown>>(
  mixins: ((Base: T) => T)[]
) {
  return function (Base: T) {
    return mixins.reduce((base, fn) => fn(base), Base);
  };
}

/**
 * Inverts numerical range defined by limits and returns new limits
 * such scaling 0 and 1 will return the original limits.
 * I.e. if we define a scaling function:
 * `const scale = (value) => (value - newMin) / (newMax - newMin)`),
 * then `scale(0) === min` and `scale(1) === max`.
 *
 * @param min Lower limit of the range
 * @param max Upper limit of the range
 * @returns A tuple with limits of the new range (`min`, `max`),
 * and a `scalingFactor` (by how much does inverting the original range shrink/expand it)
 */
export function invertRange(
  min: number,
  max: number
): [min: number, max: number, scaleFactor: number] {
  const rangeInverse = 1 / (max - min);
  return [-min * rangeInverse, rangeInverse - min * rangeInverse, rangeInverse];
}

/**
 * An algorithm to compute "pretty" breaks (i.e. ones defined by
 * multiples of neat values, 1, 2, 5, or 10)
 * from a given numerical range. Inspired by the `pretty()` function from base R.
 *
 * @param min Lower limit of the range
 * @param max Upper limit of the range
 * @param n Number of breaks (optional, used only as a rough guide)
 * @returns An array of pretty break points within the range.
 * The lower and upper limits of the pretty breaks may be different
 * (but within) the original range and their number may be different from `n`.
 */
export function prettyBreaks(min: number, max: number, n = 4) {
  const unitGross = (max - min) / n;
  const base = Math.floor(Math.log10(unitGross));

  const neatUnits = [1, 2, 4, 5, 10];
  let [minDist, neatValue] = [Infinity, 0];

  // Find the nearest neat unit to the gross unit
  for (let i = 0; i < neatUnits.length; i++) {
    const dist = (neatUnits[i] * 10 ** base - unitGross) ** 2;
    if (dist < minDist) [minDist, neatValue] = [dist, neatUnits[i]];
  }

  const unitNeat = 10 ** base * neatValue;

  const minNeat = Math.ceil(min / unitNeat) * unitNeat;
  const maxNeat = Math.floor(max / unitNeat) * unitNeat;

  const newN = Math.round((maxNeat - minNeat) / unitNeat);
  const breaks = [] as number[];

  for (let i = 0; i < newN + 1; i++) {
    const value = minNeat + i * unitNeat;
    breaks.push(value);
  }

  breaks.push(maxNeat);

  return breaks;
}

const sups: Record<string, string> = {
  "-": "⁻",
  "+": "",
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
};

/**
 * Converts a number to its superscript representation (unicode).
 *
 * @param n
 * @returns
 */
export function convertToSuperscript(n: string) {
  return n.split("").map(subsetOn(sups)).join("");
}

/**
 * Turns a number in exponential/scientific notation (e.g. `1.2+e4`)
 * to its superscript-formatted equivalent (`1.2×10³⁴`).
 *
 * @param n A string of a number in scientific notation
 * @returns A string in superscript-based format
 */
export function exponentialToSuperscript(n: string) {
  let [base, exponent] = n.split("e");
  exponent = convertToSuperscript(exponent);
  return base + "×10" + exponent;
}
