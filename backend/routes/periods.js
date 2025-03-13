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
periodsRouter.post('/send', async(req,res) => {
    try {
        
        const { name, start_date, end_date, title_image} = req.body;
        

        const result = await client.query(
            'INSERT INTO periods (name, start_date, end_date, title_image) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, start_date, end_date, title_image]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Не удалось создать пероид' });
        }
        
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

periodsRouter.post('/person/send', async(req,res) => {
    try {
        
        const { name, period_id, title_image} = req.body
        const result = await client.query(
            'INSERT INTO personalities (name, period_id, title_image) VALUES ($1, $2, $3) RETURNING *',
            [name, period_id, title_image]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Не удалось создать персону' });
        }
        
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

periodsRouter.post('/book/send', async(req,res) => {
    try {
        
        const { title, period_id, title_image,author} = req.body;
        
        if (!title || !period_id || !title_image || !author) {
            return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
        }

        const result = await client.query(
            'INSERT INTO books (title, period_id, title_image, author) VALUES ($1, $2, $3, $4) RETURNING * ',
            [title, period_id, title_image,author]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Не удалось создать книгу' });
        }
        
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

periodsRouter.post('/movie/send', async(req,res) => {
    try {
        const { name, period_id, title_image, director} = req.body;
        
        const result = await client.query(
            'INSERT INTO movies (name, period_id, title_image, director) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, period_id, title_image, director]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Не удалось создать фильм' });
        }
        
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

periodsRouter.get('/:id/:section', async (req, res) => {
    const { id, section } = req.params;
    try{
        const result = await client.query(`SELECT * FROM ${section} WHERE period_id = $1`,[id])
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default periodsRouter;