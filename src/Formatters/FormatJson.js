export default function toJsonFormat(diffMap) {
  return JSON.stringify(diffMap, null, '\t');
}
