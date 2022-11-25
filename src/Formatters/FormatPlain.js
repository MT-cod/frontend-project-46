import _ from "lodash";

export default function toPlainFormat(diffMap, parents = '') {
    return diffMap.reduce((res, node) => {
        if (_.has(node, 'nodeChild')) {
            const parentsForIter = parents + node.nodeKey + '.';
            res.push(toPlainFormat(node.nodeChild, parentsForIter));
        } else {
            switch (node.diffStatus) {
                case 'updated':
                    res.push(`Property '${parents}${node.nodeKey}' was updated. ` +
                        `From ${simplOrCompVal(ifStrToApostrofs(node.nodeValueOld))} ` +
                        `to ${simplOrCompVal(ifStrToApostrofs(node.nodeValueNew))}`);
                    break;
                case 'deleted':
                    res.push(`Property '${parents}${node.nodeKey}' was removed`);
                    break;
                case 'added':
                    res.push(`Property '${parents}${node.nodeKey}' was added with value:` +
                        ` ${simplOrCompVal(ifStrToApostrofs(node.nodeValue))}`);
            }
        }
        return res;
    }, []).join('\n');
}

function simplOrCompVal(val) {
    return _.isObject(val) ? '[complex value]' : val;
}

function ifStrToApostrofs(val)
{
    return typeof val === 'string' ? `'${val}'` : val;
}
