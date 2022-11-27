import { test, expect } from '@jest/globals';
import getObjFromFile from '../src/Parsers.js'
import fs from 'fs';
import path from 'path';

const res = JSON.parse(fs.readFileSync(path.resolve('__tests__/__fixtures__/recurs_file2.json')));
const pathToJsonFile = '__tests__/__fixtures__/recurs_file2.json';
const pathToYamlFile = '__tests__/__fixtures__/recurs_file2.yaml';

test('getObjFromFile() JSON', () => {
  expect(getObjFromFile(pathToJsonFile)).toMatchObject(res);
});

test('getObjFromFile() YAML', () => {
  expect(getObjFromFile(pathToYamlFile)).toMatchObject(res);
});
