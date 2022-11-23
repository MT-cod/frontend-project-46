import _ from 'lodash';
import getObjFromFile from './Parsers.js'
import toFormat from "./Formatters/index.js";

export default function genDiff(pathToFile1, pathToFile2, outFormat) {
    const obj1 = getObjFromFile(pathToFile1);
    const obj2 = getObjFromFile(pathToFile2);
    const diffMap = genDiffFromObjs(obj1, obj2);
    //console.log('diffMapdiffMapdiffMapdiffMap' + JSON.stringify(diffMap, null, '\t'));

    return toFormat(Object.values(diffMap), outFormat);
}

export function genDiffFromObjs(obj1, obj2) {
    /*console.log('obj1===' + JSON.stringify(obj1, null, '\t'));
    console.log('obj2===' + JSON.stringify(obj2, null, '\t'));*/
    const merged = _.merge(_.cloneDeep(obj1), _.cloneDeep(obj2));
    /*console.log('obj1===' + JSON.stringify(obj1, null, '\t'));
    console.log('obj2===' + JSON.stringify(obj2, null, '\t'));*/
    const sortedKeys = _.orderBy(Object.keys(merged));
    //console.log('merged===' + JSON.stringify(merged, null, '\t'));

    return sortedKeys.reduce((nodeData, nodeKey) => {
        if (!_.has(obj1, nodeKey) && _.has(obj2, nodeKey)) {
            nodeData.push({ nodeKey: nodeKey, nodeValue: obj2[nodeKey], diffStatus: 'added' });
        }
        if (_.has(obj1, nodeKey) && !_.has(obj2, nodeKey)) {
            nodeData.push({ nodeKey: nodeKey, nodeValue: obj1[nodeKey], diffStatus: 'deleted' });
        }
        if (_.has(obj1, nodeKey) && _.has(obj2, nodeKey) && _.isEqual(obj1[nodeKey], obj2[nodeKey])) {
            /*console.log('obj1[nodeKey]=' + obj1[nodeKey]);
            console.log('obj2[nodeKey]=' + obj2[nodeKey]);
            console.log('_.isEqual=' + _.isEqual(obj1[nodeKey], obj2[nodeKey]));*/
            nodeData.push({nodeKey: nodeKey, nodeValue: obj1[nodeKey], diffStatus: 'unchanged'});
        }
        if (_.has(obj1, nodeKey) && _.has(obj2, nodeKey) && !_.isEqual(obj1[nodeKey], obj2[nodeKey])) {
            if (typeof obj1[nodeKey] === 'object' && typeof obj2[nodeKey] === 'object') {
                nodeData.push({ nodeKey: nodeKey, nodeChild: genDiffFromObjs(obj1[nodeKey], obj2[nodeKey]), diffStatus: 'updated' });
            } else {
                nodeData.push({ nodeKey: nodeKey, nodeValueOld: obj1[nodeKey], nodeValueNew: obj2[nodeKey], diffStatus: 'updated' });
            }
        }
        return nodeData;
    }, []);
}
