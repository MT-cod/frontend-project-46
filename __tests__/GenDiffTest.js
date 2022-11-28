import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff, { genDiffFromObjs } from '../src/GenDiff.js';

const resGenDiff = fs
  .readFileSync(path.resolve('__tests__/__fixtures__/resToStylishFormat'))
  .toString()
  .trim();
const pathToFile1 = '__tests__/__fixtures__/recurs_file1.json';
const pathToFile2 = '__tests__/__fixtures__/recurs_file2.json';
const format = 'stylish';
const file1 = JSON.parse(fs.readFileSync(path.resolve('__tests__/__fixtures__/recurs_file1.json')));
const file2 = JSON.parse(fs.readFileSync(path.resolve('__tests__/__fixtures__/recurs_file2.json')));
const resGenDiffFromObjs = JSON.parse(fs.readFileSync(path.resolve('__tests__/__fixtures__/diffMap')));

test('genDiff()', () => {
  expect(genDiff(pathToFile1, pathToFile2, format)).toEqual(resGenDiff);
});

test('genDiffFromObjs()', () => {
  expect(genDiffFromObjs(file1, file2)).toMatchObject(resGenDiffFromObjs);
});
