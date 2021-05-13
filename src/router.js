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
        data: req.app.locals.locales['/cv'],
        projects: req.app.locals.locales.projects,
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




router.get('/', createIndex);
router.get('/cv', createCv);
router.get('/cv/courses', createCvCourses);
router.get('/projects', createProjects);
router.get('/about', createAbout);

router.use('/index', (req, res) => res.status(301).redirect('/'));
router.use('/update', (req, res) => { setLocals(req.app); res.status(200).redirect('/'); });
