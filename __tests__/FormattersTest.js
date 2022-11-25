import { test, expect } from '@jest/globals';
import {resGenDiffFromObjs as diffMap} from "./GenDiffTest.js";
import toFormat from "../src/Formatters/index.js";

export const resToStylishFormat = `{
\t"common": {
\t\t"+ follow": false,
\t\t"  setting1": "Value 1",
\t\t"- setting2": 200,
\t\t"- setting3": true,
\t\t"+ setting3": null,
\t\t"+ setting4": "blah blah",
\t\t"+ setting5": {
\t\t\t"key5": "value5"
\t\t},
\t\t"setting6": {
\t\t\t"doge": {
\t\t\t\t"- wow": "",
\t\t\t\t"+ wow": "so much"
\t\t\t},
\t\t\t"  key": "value",
\t\t\t"+ ops": "vops"
\t\t}
\t},
\t"group1": {
\t\t"- baz": "bas",
\t\t"+ baz": "bars",
\t\t"  foo": "bar",
\t\t"- nest": {
\t\t\t"key": "value"
\t\t},
\t\t"+ nest": "str"
\t},
\t"- group2": {
\t\t"abc": 12345,
\t\t"deep": {
\t\t\t"id": 45
\t\t}
\t},
\t"+ group3": {
\t\t"deep": {
\t\t\t"id": {
\t\t\t\t"number": 45
\t\t\t}
\t\t},
\t\t"fee": 100500
\t}
}`;
export const resToPlainFormat = "Property 'common.follow' was added with value: false\n" +
    "Property 'common.setting2' was removed\n" +
    "Property 'common.setting3' was updated. From true to null\n" +
    "Property 'common.setting4' was added with value: 'blah blah'\n" +
    "Property 'common.setting5' was added with value: [complex value]\n" +
    "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'\n" +
    "Property 'common.setting6.ops' was added with value: 'vops'\n" +
    "Property 'group1.baz' was updated. From 'bas' to 'bars'\n" +
    "Property 'group1.nest' was updated. From [complex value] to 'str'\n" +
    "Property 'group2' was removed\n" +
    "Property 'group3' was added with value: [complex value]";

test('toStylishFormat()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(toFormat(Object.values(diffMap), 'stylish')).toEqual(resToStylishFormat);
});

test('toPlainFormat()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(toFormat(Object.values(diffMap), 'plain')).toEqual(resToPlainFormat);
});
