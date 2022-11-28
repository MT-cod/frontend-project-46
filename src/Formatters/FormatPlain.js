import _ from 'lodash';

function simplOrCompVal(val) {
  return _.isObject(val) ? '[complex value]' : val;
}

function ifStrToApostrofs(val) {
  return typeof val === 'string' ? `'${val}'` : val;
}

export default function toPlainFormat(diffMap, parents = '') {
  return diffMap.reduce((res, node) => {
    if (_.has(node, 'nodeChild')) {
      const parentsForIter = `${parents}${node.nodeKey}.`;
      res = `${res}${toPlainFormat(node.nodeChild, parentsForIter)}\n`;
    } else {
      switch (node.diffStatus) {
        case 'updated':
          res = `${res}Property '${parents}${node.nodeKey}' was updated. `
            + `From ${simplOrCompVal(ifStrToApostrofs(node.nodeValueOld))} `
            + `to ${simplOrCompVal(ifStrToApostrofs(node.nodeValueNew))}\n`;
          break;
        case 'deleted':
          res = `${res}Property '${parents}${node.nodeKey}' was removed\n`;
          break;
        case 'added':
          res = `${res}Property '${parents}${node.nodeKey}' was added with value:`
            + ` ${simplOrCompVal(ifStrToApostrofs(node.nodeValue))}\n`;
          break;
        default:
          res = `${res}`;
      }
    }
    return res;
  }, '').replaceAll('\n\n', '\n').slice(0, -1);
}
