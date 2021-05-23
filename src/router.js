/* Imports for the router */
import express from 'express';
import { setLocals } from './utils.js';

/* Router variables */
export const router = express.Router();

/* Index page router function */
async function createIndex(req, res) {
    res.render('index');
}

/* About page router function */
async function createAbout(req, res) {
    res.render('about');
}

/* CV page router function */
async function createCv(req, res) {
    res.render('cv');
}

/* CV Courses page router function */
async function createCvCourses(req, res) {
    res.render('cv', {
        course_draw: true
    });
}

/* Project page router function */
async function createProjects(req, res) {
    res.render('projects');
}

/* Router page definitions */
router.get('/', createIndex);
router.get('/cv', createCv);
router.get('/cv/courses', createCvCourses);
router.get('/projects', createProjects);
router.get('/about', createAbout);

/* Router redirect and update page definitions */
router.use('/index', (req, res) => res.status(301).redirect('/'));
router.use('/update', (req, res) => { setLocals(req.app); res.status(200).redirect('/'); });
