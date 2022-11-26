import toStylishFormat from "./FormatStylish.js";
import toPlainFormat from "./FormatPlain.js";
import toJsonFormat from "./FormatJson.js";

export default function toFormat(diffMapValues, outFormat) {
  switch (outFormat) {
    case 'stylish':
      return toStylishFormat(diffMapValues);
    case 'plain':
      return toPlainFormat(diffMapValues);
    case 'json':
      return toJsonFormat(diffMapValues);
  }
}