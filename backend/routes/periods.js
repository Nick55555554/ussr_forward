import express from 'express';
import client from "../database/index.js";

const periodsRouter = express.Router();


periodsRouter.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM periods');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default periodsRouter;