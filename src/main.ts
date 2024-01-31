import { allValues } from "../lib/funs";

const y = Symbol("lamo");

const x = allValues({ [y]: 10, z: "lol" });
