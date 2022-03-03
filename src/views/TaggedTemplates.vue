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
  ageExp: number
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

function template(strings: TemplateStringsArray, ...keys: any[]) {
  // return function (...values: (string | number | Record<string | number, string>)[]) {
  return function (...values: any[]) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function (key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

let t1Closure = template`${0}${1}${0}!`;
//let t1Closure = template(["","","","!"],0,1,0);
console.log(t1Closure("Y", "A")); // "YAY!"

let t2Closure = template`${0} ${"foo"}!`;
//let t2Closure = template([""," ","!"],0,"foo");
console.log(t2Closure("Hello", { foo: "World" })); // "Hello World!"

let t3Closure = template`I'm ${"name"}. I'm almost ${"age"} years old.`;
//let t3Closure = template(["I'm ", ". I'm almost ", " years old."], "name", "age");
console.log(t3Closure("foo", { name: "MDN", age: 30 })); //"I'm MDN. I'm almost 30 years old."
console.log(t3Closure({ name: "MDN", age: 30 })); //"I'm MDN. I'm almost 30 years old."
</script>

<template>tagged templates</template>
