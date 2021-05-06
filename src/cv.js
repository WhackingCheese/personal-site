import express from 'express';

export const router = express.Router();

async function createCvPage(req, res) {
    res.render('cv', {
        course_draw: false,
        data: req.app.locals.locales['/cv']['en']
    });
}

async function createCoursePage(req, res) {
    res.render('cv', {
        course_draw: true,
        courses: req.app.locals.courses['en']
    });
}

router.get('/', createCvPage);
router.get('/courses', createCoursePage);
