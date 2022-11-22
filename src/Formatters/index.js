import toStylishFormat from "./FormatStylish.js";
import toPlainFormat from "./FormatPlain.js";
import toJsonFormat from "./FormatJson.js";

export default function toFormat(diffMapValues, outFormat) {
  const formatters = { stylish: toStylishFormat, plain: toPlainFormat, json: toJsonFormat };

  return formatters[outFormat](diffMapValues);
}