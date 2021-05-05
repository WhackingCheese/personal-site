/**
 * Imports for the app.
 */
import express from 'express';
import dotenv from 'dotenv';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { router as indexRouter } from './src/index.js';
import { router as aboutRouter } from './src/about.js';
import { router as cvRouter } from './src/cv.js';

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
 * Binds the public folder as the static folder.
 * As well as all the views subdirectories to the view engine.
 */
app.use(express.static(join(path, 'public')));
app.set('views', [ join(path, 'views/errors'), join(path, 'views/pages'), join(path, 'views/errors')]);
app.set('view engine', 'ejs');









app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/cv', cvRouter);









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
