import { test, expect } from '@jest/globals';
import toStylishFormat from '../src/Formatters/FormatStylish.js'
import {resGenDiffFromObjs as diffMap} from "./GenDiffTest.js";

export const resToStylishFormat = {
  "common": {
    "  follow": false,
    "  setting1": "Value 1",
    "- setting2": 200,
    "  setting3": null,
    "  setting4": "blah blah",
    "  setting5": {
      "key5": "value5"
    },
    "  setting6": {
      "key": "value",
      "doge": {
        "wow": "so much"
      },
      "ops": "vops"
    }
  },
  "  group1": {
    "baz": "bars",
    "foo": "bar",
    "nest": "str"
  },
  "- group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  },
  "+ group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};

test('toStylishFormat()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(toStylishFormat(diffMap)).toMatchObject(resToStylishFormat);
});

/*test('genDiffFromObjs()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiffFromObjs(file1, file2)).toMatchObject(resGenDiffFromObjs);
});*/
