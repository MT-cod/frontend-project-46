import fs from 'fs';
import path from 'path';

export default function getObjFromFile(pathToFile) {
    const pathToFileStr = path.resolve(pathToFile);
    const extOfFile = path.extname(pathToFileStr);

    switch (extOfFile) {
        case '.json':
            return JSON.parse(fs.readFileSync(pathToFileStr));
        case '.yaml':
            return JSON.parse(fs.readFileSync(pathToFileStr));
    }
}
