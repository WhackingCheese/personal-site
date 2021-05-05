import express from 'express';

import { catchErrors } from './util.js';

export const router = express.Router();

async function pageCreate(req, res) {
    res.render('index');
}




router.get('/', catchErrors(pageCreate));