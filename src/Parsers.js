import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function getObjFromFile(pathToFile) {
    const pathToFileStr = path.resolve(pathToFile);
    const extOfFile = path.extname(pathToFileStr);

    switch (extOfFile) {
        case '.json':
            return JSON.parse(fs.readFileSync(pathToFileStr));
        case '.yaml':
        case '.yml':
            return yaml.load(fs.readFileSync(pathToFileStr));
    }
}
