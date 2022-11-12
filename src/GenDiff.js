import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default function genDiff(pathToFile1, pathToFile2, outFormat = 'stylish') {
    const obj1 = JSON.parse(fs.readFileSync(path.resolve(pathToFile1)));
    const obj2 = JSON.parse(fs.readFileSync(path.resolve(pathToFile2)));
    const diffCalcResult = genDiffFromObjs(obj1, obj2);

    //return resultArrayToResultString($resultDiffArr, $outFormat);
    return diffCalcResult;
}

function genDiffFromObjs(obj1, obj2) {
    const merged = _.merge({...obj1}, obj2);
    const sortedKeys = _.orderBy(Object.keys(merged));

    const res = sortedKeys.reduce((nodeData, nodeKey) => {
        if (!_.has(obj1, nodeKey) && _.has(obj2, nodeKey)) {
            nodeData[nodeKey] = { nodeKey: nodeKey, nodeValue: obj2[nodeKey], diffStatus: 'added' };
        }
        if (_.has(obj1, nodeKey) && !_.has(obj2, nodeKey)) {
            nodeData[nodeKey] = { nodeKey: nodeKey, nodeValue: obj1[nodeKey], diffStatus: 'deleted' };
        }
        if (_.has(obj1, nodeKey) && _.has(obj2, nodeKey) && _.isEqual(obj1[nodeKey], obj2[nodeKey])) {
            nodeData[nodeKey] = {nodeKey: nodeKey, nodeValue: obj1[nodeKey], diffStatus: 'unchanged'};
        }
        if (_.has(obj1, nodeKey) && _.has(obj2, nodeKey) && !_.isEqual(obj1[nodeKey], obj2[nodeKey])) {
            if (typeof obj1[nodeKey] === 'object' && typeof obj2[nodeKey] === 'object') {
                nodeData[nodeKey] = { nodeKey: nodeKey, nodeValue: genDiffFromObjs(obj1[nodeKey], obj2[nodeKey]), diffStatus: 'updated' };
            } else {
                nodeData[nodeKey] = { nodeKey: nodeKey, nodeValueOld: obj1[nodeKey], nodeValueNew: obj2[nodeKey], diffStatus: 'updated' };
            }
        }
        return nodeData;
    }, {});


    /*return array_map(function ($nodeData) use ($arr1, $arr2) {
        if (!key_exists($nodeData['nodeKey'], $arr1) && key_exists($nodeData['nodeKey'], $arr2)) {
            return ['nodeKey' => $nodeData['nodeKey'], 'nodeValue' => $nodeData['child'], 'diffStatus' => 'added'];
        } elseif (key_exists($nodeData['nodeKey'], $arr1) && !key_exists($nodeData['nodeKey'], $arr2)) {
            return ['nodeKey' => $nodeData['nodeKey'], 'nodeValue' => $nodeData['child'], 'diffStatus' => 'deleted'];
        } else {
            if ($arr1[$nodeData['nodeKey']] === $arr2[$nodeData['nodeKey']]) {
                return [
                    'nodeKey' => $nodeData['nodeKey'],
                    'nodeValue' => $nodeData['child'],
                    'diffStatus' => 'unchanged'
                ];
            } else {
                if (is_array($arr1[$nodeData['nodeKey']]) && is_array($arr2[$nodeData['nodeKey']])) {
                    return [
                        'nodeKey' => $nodeData['nodeKey'],
                        'child' => genDiffFromArrays($arr1[$nodeData['nodeKey']], $arr2[$nodeData['nodeKey']])
                    ];
                } else {
                    return [
                        'nodeKey' => $nodeData['nodeKey'],
                        'nodeValueOld' => $arr1[$nodeData['nodeKey']],
                        'nodeValueNew' => $arr2[$nodeData['nodeKey']],
                        'diffStatus' => 'updated'
                    ];
                }
            }
        }
    }, $mergedAndSortedArrays);*/
    return res;
}

/*function mergeAndSortObjs(obj1, obj2) {
    const res = _.merge({...obj1}, obj2);
    const sortedKeys = _.orderBy(Object.keys(res));

    return sortedKeys;
}*/
