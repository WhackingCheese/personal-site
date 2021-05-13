import express from 'express';

export const router = express.Router();

async function createCvPage(req, res) {
    res.render('cv', {
        course_draw: false,
        data: req.app.locals.locales['/cv'],
        projects: req.app.locals.locales.projects,
        show_images: true,
        lang: 'is'
    });
}

async function createCoursePage(req, res) {
    res.render('cv', {
        course_draw: true,
        lang: 'is'
    });
}

router.get('/', createCvPage);
router.get('/courses', createCoursePage);
