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
export const resToJsonFormat = `[
\t{
\t\t"nodeKey": "common",
\t\t"nodeChild": [
\t\t\t{
\t\t\t\t"nodeKey": "follow",
\t\t\t\t"nodeValue": false,
\t\t\t\t"diffStatus": "added"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "setting1",
\t\t\t\t"nodeValue": "Value 1",
\t\t\t\t"diffStatus": "unchanged"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "setting2",
\t\t\t\t"nodeValue": 200,
\t\t\t\t"diffStatus": "deleted"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "setting3",
\t\t\t\t"nodeValueOld": true,
\t\t\t\t"nodeValueNew": null,
\t\t\t\t"diffStatus": "updated"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "setting4",
\t\t\t\t"nodeValue": "blah blah",
\t\t\t\t"diffStatus": "added"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "setting5",
\t\t\t\t"nodeValue": {
\t\t\t\t\t"key5": "value5"
\t\t\t\t},
\t\t\t\t"diffStatus": "added"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "setting6",
\t\t\t\t"nodeChild": [
\t\t\t\t\t{
\t\t\t\t\t\t"nodeKey": "doge",
\t\t\t\t\t\t"nodeChild": [
\t\t\t\t\t\t\t{
\t\t\t\t\t\t\t\t"nodeKey": "wow",
\t\t\t\t\t\t\t\t"nodeValueOld": "",
\t\t\t\t\t\t\t\t"nodeValueNew": "so much",
\t\t\t\t\t\t\t\t"diffStatus": "updated"
\t\t\t\t\t\t\t}
\t\t\t\t\t\t],
\t\t\t\t\t\t"diffStatus": "updated"
\t\t\t\t\t},
\t\t\t\t\t{
\t\t\t\t\t\t"nodeKey": "key",
\t\t\t\t\t\t"nodeValue": "value",
\t\t\t\t\t\t"diffStatus": "unchanged"
\t\t\t\t\t},
\t\t\t\t\t{
\t\t\t\t\t\t"nodeKey": "ops",
\t\t\t\t\t\t"nodeValue": "vops",
\t\t\t\t\t\t"diffStatus": "added"
\t\t\t\t\t}
\t\t\t\t],
\t\t\t\t"diffStatus": "updated"
\t\t\t}
\t\t],
\t\t"diffStatus": "updated"
\t},
\t{
\t\t"nodeKey": "group1",
\t\t"nodeChild": [
\t\t\t{
\t\t\t\t"nodeKey": "baz",
\t\t\t\t"nodeValueOld": "bas",
\t\t\t\t"nodeValueNew": "bars",
\t\t\t\t"diffStatus": "updated"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "foo",
\t\t\t\t"nodeValue": "bar",
\t\t\t\t"diffStatus": "unchanged"
\t\t\t},
\t\t\t{
\t\t\t\t"nodeKey": "nest",
\t\t\t\t"nodeValueOld": {
\t\t\t\t\t"key": "value"
\t\t\t\t},
\t\t\t\t"nodeValueNew": "str",
\t\t\t\t"diffStatus": "updated"
\t\t\t}
\t\t],
\t\t"diffStatus": "updated"
\t},
\t{
\t\t"nodeKey": "group2",
\t\t"nodeValue": {
\t\t\t"abc": 12345,
\t\t\t"deep": {
\t\t\t\t"id": 45
\t\t\t}
\t\t},
\t\t"diffStatus": "deleted"
\t},
\t{
\t\t"nodeKey": "group3",
\t\t"nodeValue": {
\t\t\t"deep": {
\t\t\t\t"id": {
\t\t\t\t\t"number": 45
\t\t\t\t}
\t\t\t},
\t\t\t"fee": 100500
\t\t},
\t\t"diffStatus": "added"
\t}
]`;

test('toStylishFormat()', () => {
  expect(toFormat(Object.values(diffMap), 'stylish')).toEqual(resToStylishFormat);
});

test('toPlainFormat()', () => {
  expect(toFormat(Object.values(diffMap), 'plain')).toEqual(resToPlainFormat);
});

test('toJsonFormat()', () => {
  expect(toFormat(Object.values(diffMap), 'json')).toEqual(resToJsonFormat);
});
