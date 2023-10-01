<script setup lang="ts">
/*
 * Most of this was copied from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/

let person = "Mike";
let age = 28;

function myTag(
  strings: TemplateStringsArray,
  personExp: string,
  ageExp: number,
) {
  let str0 = strings[0]; // "That "
  let str1 = strings[1]; // " is a "
  let str2 = strings[2]; // "."

  let ageStr;
  if (ageExp > 99) {
    ageStr = "centenarian";
  } else {
    ageStr = "youngster";
  }

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

let output = myTag`That ${person} is a ${age}.`;

console.log(output);
// That mike is a youngster.

type FlatKeyValue = string | number;
type RecordKeyValue = Record<string, FlatKeyValue>;
type KeyValue = FlatKeyValue | RecordKeyValue;

const getDict = (values: unknown[]) => {
  const last = values.at(-1);
  if (typeof last === "object" && last != null) {
    return last as RecordKeyValue;
  }
  return;
};

const numberIsInteger = (value: unknown): value is number =>
  Number.isInteger(value);

function template<T extends FlatKeyValue[]>(
  strings: TemplateStringsArray,
  ...keys: T
) {
  const ret = <U extends KeyValue[]>(...values: U) => {
    const dict = getDict(values);
    const result = [strings[0]];
    keys.forEach((key, i) => {
      if (key in values === false && dict == null) {
        throw new Error("Extra key", { cause: key });
      }
      const value = numberIsInteger(key)
        ? (values as FlatKeyValue[])[key]
        : dict![key];
      if (value == null) {
        throw new Error("Missing key", { cause: key });
      }
      result.push(`${value}`, strings[i + 1]);
    });
    return result.join("");
  };
  return ret;
}

const t1Closure = template`${0}${1}${0}!`;
// const t1Closure = template(["","","","!"],0,1,0);
console.log(t1Closure("Y", "A")); // "YAY!"

const t2Closure = template`${0} ${"foo"}!`;
// const t2Closure = template([""," ","!"],0,"foo");
console.log(t2Closure("Hello", { foo: "World" })); // "Hello World!"

const t3Closure = template`I'm ${"name"}. I'm almost ${"age"} years old.`;
// const t3Closure = template(["I'm ", ". I'm almost ", " years old."], "name", "age");
console.log(t3Closure({ name: "MDN", age: 30 })); // "I'm MDN. I'm almost 30 years old."
</script>

<template>tagged templates</template>
