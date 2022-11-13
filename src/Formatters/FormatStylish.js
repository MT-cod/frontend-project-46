import _ from "lodash";

export default function toStylishFormat(diffMap) {
  console.log(typeof diffMap);
  const res = {...diffMap};
  console.log('diffMapdiffMapdiffMapdiffMap' + JSON.stringify(res, null, '\t'));
  return res.reduce((nodeData, node) => {
    console.log(node.diffStatus);
    switch (node.diffStatus) {
      case 'updated':
        if (_.has(node, 'nodeValue') && typeof node.nodeValue === 'object') {
          nodeData[node.nodeKey] = toStylishFormat(node.nodeValue);
          break;
        }
        nodeData['- ' + node.nodeKey] = node.nodeValueOld;
        nodeData['+ ' + node.nodeKey] = node.nodeValueNew;
        break;
      case 'deleted':
        nodeData['- ' + node.nodeKey] = node.nodeValue;
        break;
      case 'added':
        nodeData['+ ' + node.nodeKey] = node.nodeValue;
        break;
      case 'unchanged':
        nodeData['  ' + node.nodeKey] = node.nodeValue;
        break;
    }
    return nodeData;
  }, {});
}