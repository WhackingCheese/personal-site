import fs from 'fs';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const path = dirname(fileURLToPath(import.meta.url));

function getLocales() {
    const rawdata = fs.readFileSync(join(path, '../data/locales.json'));
    const data = JSON.parse(rawdata);
    return data;
}

function getCourses() {
    const rawdata = fs.readFileSync(join(path, '../data/courses.json'))
    const data = JSON.parse(rawdata);
    return data;
}


/**
 * Helper function used for setting global variables for EJS.
 */
export function setLocals(app) {
    app.locals.locales = getLocales();
    app.locals.courses = getCourses();
    app.locals.lang = "en";
    app.locals.title = "Mikolaj Cymcyk";
}
