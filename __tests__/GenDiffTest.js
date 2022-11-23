import _ from 'lodash';
import { test, expect } from '@jest/globals';
import genDiff, { genDiffFromObjs } from '../src/GenDiff.js';
import {resToStylishFormat as resGenDiff} from "./FormattersTest.js";

const pathToFile1 = '__tests__/__fixtures__/recurs_file1.json';
const pathToFile2 = '__tests__/__fixtures__/recurs_file2.json';
const format = 'stylish';
export const file1 = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
};
export const file2 = {
      "common": {
        "follow": false,
        "setting1": "Value 1",
        "setting3": null,
        "setting4": "blah blah",
        "setting5": {
          "key5": "value5"
        },
        "setting6": {
          "key": "value",
          "ops": "vops",
          "doge": {
            "wow": "so much"
          }
        }
      },
      "group1": {
        "foo": "bar",
        "baz": "bars",
        "nest": "str"
      },
      "group3": {
        "deep": {
          "id": {
            "number": 45
          }
        },
        "fee": 100500
      }
    };
export const resGenDiffFromObjs = [
  {
    "nodeKey": "common",
    "nodeChild": [
      {
        "nodeKey": "follow",
        "nodeValue": false,
        "diffStatus": "added"
      },
      {
        "nodeKey": "setting1",
        "nodeValue": "Value 1",
        "diffStatus": "unchanged"
      },
      {
        "nodeKey": "setting2",
        "nodeValue": 200,
        "diffStatus": "deleted"
      },
      {
        "nodeKey": "setting3",
        "nodeValueOld": true,
        "nodeValueNew": null,
        "diffStatus": "updated"
      },
      {
        "nodeKey": "setting4",
        "nodeValue": "blah blah",
        "diffStatus": "added"
      },
      {
        "nodeKey": "setting5",
        "nodeValue": {
          "key5": "value5"
        },
        "diffStatus": "added"
      },
      {
        "nodeKey": "setting6",
        "nodeChild": [
          {
            "nodeKey": "doge",
            "nodeChild": [
              {
                "nodeKey": "wow",
                "nodeValueOld": "",
                "nodeValueNew": "so much",
                "diffStatus": "updated"
              }
            ],
            "diffStatus": "updated"
          },
          {
            "nodeKey": "key",
            "nodeValue": "value",
            "diffStatus": "unchanged"
          },
          {
            "nodeKey": "ops",
            "nodeValue": "vops",
            "diffStatus": "added"
          }
        ],
        "diffStatus": "updated"
      }
    ],
    "diffStatus": "updated"
  },
  {
    "nodeKey": "group1",
    "nodeChild": [
      {
        "nodeKey": "baz",
        "nodeValueOld": "bas",
        "nodeValueNew": "bars",
        "diffStatus": "updated"
      },
      {
        "nodeKey": "foo",
        "nodeValue": "bar",
        "diffStatus": "unchanged"
      },
      {
        "nodeKey": "nest",
        "nodeValueOld": {
          "key": "value"
        },
        "nodeValueNew": "str",
        "diffStatus": "updated"
      }
    ],
    "diffStatus": "updated"
  },
  {
    "nodeKey": "group2",
    "nodeValue": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    },
    "diffStatus": "deleted"
  },
  {
    "nodeKey": "group3",
    "nodeValue": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    },
    "diffStatus": "added"
  }
];

test('genDiff()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiff(pathToFile1, pathToFile2, format)).toMatchObject(resGenDiff);
});

test('genDiffFromObjs()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiffFromObjs(file1, file2)).toMatchObject(resGenDiffFromObjs);
});
