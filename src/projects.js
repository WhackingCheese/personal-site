import express from 'express';

export const router = express.Router();

async function pageCreate(req, res) {
    res.render('projects');
}

router.get('/', pageCreate);
