import express from 'express';

export const router = express.Router();

async function pageCreate(req, res) {
    res.render('cv');
}

router.get('/', pageCreate);
