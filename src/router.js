import express from 'express';

import { setLocals } from './utils.js';

export const router = express.Router();

async function createIndex(req, res) {
    res.render('index');
}

async function createAbout(req, res) {
    res.render('about');
}

async function createCv(req, res) {
    res.render('cv', {
        course_draw: false,
        cv: req.app.locals.data['/cv'],
        show_images: true
    });
}

async function createCvCourses(req, res) {
    res.render('cv', {
        course_draw: true
    });
}

async function createProjects(req, res) {
    res.render('projects');

}

/**
 * Gets the url params from a urls string.
 */
function getParams(url) {
    if (!url) return null;
    const splits = url.split('?');
    if (splits.length != 2 || splits[1] == '') return null;
    const kvpairs = splits[1].split('&');
    var params = {};
    kvpairs.forEach(pair => {
        var data = pair.split('=');
        if (data[1]) params[data[0]] = data[1];
    });
    return params;
}



router.get('/', createIndex);
router.get('/cv', createCv);
router.get('/cv/courses', createCvCourses);
router.get('/projects', createProjects);
router.get('/about', createAbout);

router.use('/index', (req, res) => res.status(301).redirect('/'));
router.use('/update', (req, res) => { setLocals(req.app); res.status(200).redirect('/'); });
