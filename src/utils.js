import fs from 'fs';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const path = dirname(fileURLToPath(import.meta.url));
const data_path = '../data.json';
var default_lang;
var default_title;
var langs;

/**
 * Helper function used for setting and refreshing global variables for EJS.
 */
export function setLocals(app) {
    app.locals.data = getData();
    default_lang = app.locals.data.defaults.default_lang;
    app.locals.lang = default_lang;
    default_title = app.locals.data.defaults.default_title;
    app.locals.title = default_title;
    langs = [];
    app.locals.data.langs.forEach(obj => langs.push(obj["lang"]));
}

/**
 * Helper middleware used for setting the language.
 */
export function setLanguage(req, res, next) {
    const language = req.query.lang;
    if (langs.includes(language)) {
        req.app.locals.lang = language;
        req.app.locals.hreftail = `?lang=${language}`;
        next();
    } else {
        res.redirect(`${req._parsedOriginalUrl.pathname}?lang=${default_lang}`)
    }
}

/**
 * Loads data from json file;
 */
function getData() {
    const rawdata = fs.readFileSync(join(path, data_path));
    const data = JSON.parse(rawdata);
    return data;
}
