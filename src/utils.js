import fs from 'fs';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const path = dirname(fileURLToPath(import.meta.url));

export function getStructure() {
    const rawdata = fs.readFileSync(join(path, '../data/structure.json'));
    const data = JSON.parse(rawdata);
    return data.structure;
}

export function getLocales() {
    const rawdata = fs.readFileSync(join(path, '../data/locales.json'));
    const data = JSON.parse(rawdata);
    return data;
}

export function getCourses() {
    const rawdata = fs.readFileSync(join(path, '../data/courses.json'))
    const data = JSON.parse(rawdata);
    return data;
}
