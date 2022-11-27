import { test, expect } from '@jest/globals';
import toFormat from "../src/Formatters/index.js";
import fs from 'fs';
import path from 'path';

const diffMap = JSON.parse(fs.readFileSync(path.resolve('__tests__/__fixtures__/diffMap')));
const resToStylishFormat = fs
  .readFileSync(path.resolve('__tests__/__fixtures__/resToStylishFormat'))
  .toString()
  .trim();
const resToPlainFormat = fs
  .readFileSync(path.resolve('__tests__/__fixtures__/resToPlainFormat'))
  .toString()
  .trim();
const resToJsonFormat = fs
  .readFileSync(path.resolve('__tests__/__fixtures__/resToJsonFormat'))
  .toString()
  .trim();

test('toStylishFormat()', () => {
  expect(toFormat(Object.values(diffMap), 'stylish')).toEqual(resToStylishFormat);
});

test('toPlainFormat()', () => {
  expect(toFormat(Object.values(diffMap), 'plain')).toEqual(resToPlainFormat);
});

test('toJsonFormat()', () => {
  expect(toFormat(Object.values(diffMap), 'json')).toEqual(resToJsonFormat);
});
