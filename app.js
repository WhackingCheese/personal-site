/**
 * Imports for the app.
 */
import express from 'express';
import dotenv from 'dotenv';
import favicon from 'serve-favicon';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { router as appRouter } from './src/router.js';

import { setLocals } from './src/utils.js';

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
 * Loads and sets the global variables for the EJS template engine.
 */
app.use(favicon(join(path, 'public', 'favicon.ico')));
app.use(express.static(join(path, 'public')));
app.set('views', [ join(path, 'views/errors'), join(path, 'views/pages')]);
app.set('view engine', 'ejs');
setLocals(app);

/**
 * Creates and sets a main router for page routing.
 */
app.use('/', appRouter);

/**
 * Handler for 404 Not Found HTTP Status Codes.
 * Renders and servers the user the "404.ejs" error page.
 */
function notFoundHandler(req, res, next) {
    res.status(404).render('error', {
        error_message_1: "404",
        error_message_2:  "Page Not Found",
        title: "404 Not Found"
    });
}
app.use(notFoundHandler);

/**
 * Handler for 500 Server Error HTTP Status Codes.
 * Renders and servers the user the "500.ejs" error page.
 */
function errorHandler(err, req, res, next) {
    res.status(500).render('error', {
        error_message_1: "500",
        error_message_2: "Internal Server Error",
        title: "500 Internal Server Error"
    });
}
app.use(errorHandler);

/**
 * Starts the app and listens on port.
 */
app.listen(port, () => {
    console.info(`Server running at http://${host}:${port}/`);
});
