import express from 'express';

import { catchErrors, getPages, getSocials } from './util.js';

export const router = express.Router();





async function pageCreate(req, res) {
    res.render('about', {
        pages: getPages(),
        socials: getSocials()
    });
}

router.get('/', catchErrors(pageCreate));
