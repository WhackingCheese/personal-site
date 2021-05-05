/**
 * Imports for the app.
 */
import express from 'express';
import dotenv from 'dotenv';
import favicon from 'serve-favicon';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { router as indexRouter } from './src/index.js';
import { router as aboutRouter } from './src/about.js';
import { router as cvRouter } from './src/cv.js';
import { catchErrors, getPages, getSocials } from './src/util.js';

/**
 * Gets environment variables for host and port from .env file.
 * Uses fallback values if .env or the variables within are not present.
 */
dotenv.config();
const {
    HOST: host = 'localhost',
    PORT: port = 3000,
} = process.env;

/**
 * Creates the express app and generates a path to the project.
 * The path is later used for binding and getting resources.
 */
const app = express();
const path = dirname(fileURLToPath(import.meta.url));

/**
 * Sets the path and allows serving of the favicon.
 * Binds the public folder as the static folder.
 * Bind all the view subdirectories to the view list.
 * Selects EJS as the servers view engine.
 */
app.use(favicon(join(path, 'public', 'favicon.ico')));
app.use(express.static(join(path, 'public')));
app.set('views', [ join(path, 'views/errors'), join(path, 'views/pages'), join(path, 'views/errors')]);
app.set('view engine', 'ejs');










app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/cv', cvRouter);

// global ejs variables
app.locals.pages = getPages();
app.locals.socials = getSocials();

// error catching global middleware
app.use(catchErrors);










/**
 * Handler for 404 Not Found HTTP Status Codes.
 * Renders and servers the user the "404.ejs" error page.
 */
function notFoundHandler(req, res, next) {
    res.status(404).render('404');
}
app.use(notFoundHandler);

/**
 * Handler for 500 Server Error HTTP Status Codes.
 * Renders and servers the user the "500.ejs" error page.
 */
function errorHandler(err, req, res, next) {
    res.status(500).render('500');
}
app.use(errorHandler);

/**
 * Starts the app and listens on port.
 */
app.listen(port, () => {
    console.info(`Server running at http://${host}:${port}/`);
});
