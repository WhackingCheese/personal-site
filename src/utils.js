/* Imports for utils */
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/* Variables for utils */
const langCookieAge = 24 * 60 * 60;
const path = dirname(fileURLToPath(import.meta.url));
const data_path = '../data.json';
var default_lang;
var default_title;
var langs;

/* Helper function used for setting and refreshing global variables for EJS */
export function setLocals(app) {
    app.locals.data = JSON.parse(fs.readFileSync(join(path, data_path)));
    default_lang = app.locals.data.defaults.default_lang;
    app.locals.lang = default_lang;
    default_title = app.locals.data.defaults.default_title;
    app.locals.title = default_title;
    langs = [];
    app.locals.data.langs.forEach(obj => langs.push(obj["lang"]));
}

/* Helper middleware that adds the querystring params to app locals */
export function setParams(req, res, next) {
    req.app.locals.params = req.query;
    next();
}

/**
 * Custom cookie parser helper function.
 * Reads cookies from req and returns as an object containing the parsed cookies.
 */
function getCookies(req) {
    const rawCookies = req.headers.cookie;
    if (rawCookies) {
        const parsedCookies = {};
        rawCookies.split('; ').forEach(cookie => {
            const parsedCookie = cookie.split('=');
            parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });
        return parsedCookies;
    } else {
        return {};
    }
}

/**
 * Language cookie manager, gets language cookie and uses its language for rendering.
 * Creates a new language cookie if the language is not defined or cookie is malformed.
 */
export function getLanguageCookie(req, res, next) {
    const cookies = getCookies(req);
    if (cookies['lang'] && langs.includes(cookies['lang'])) {
        req.app.locals.lang = cookies['lang'];
    } else {
        res.cookie('lang', default_lang, {
            maxAge: langCookieAge
        });
    }
    next();
}

/**
 * Middleware for chaning languages.
 * Reads lang from querysting and sets as the cookie language if the language is supported.
 */
export function changeLanguage(req, res, next) {
    const lang = req.query.lang;
    if (lang && langs.includes(lang)) {
        res.cookie('lang', lang, {
            maxAge: langCookieAge
        });
        res.redirect(req._parsedOriginalUrl.pathname);
    } else {
        next();
    }
}
