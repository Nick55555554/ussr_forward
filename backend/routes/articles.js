import express from 'express';
import client from "../database/index.js";

const router = express.Router();

router.get('/',async(req,res) => {
    try {
        const result = await client.query('SELECT * FROM articles');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/send', async(req,res) => {
    try {
        
        const { author, theme, content, title, image} = req.body;

        const result = await client.query(
            'INSERT INTO articles (author, theme, content, title, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [author, theme, content, title, image]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Не удалось создать статью' });
        }
        
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const {user_email} = req.body;
    try {
        const articleQuery = await client.query('SELECT * FROM articles WHERE id = $1', [id]); 
        const itsPinned = await client.query('SELECT * FROM pinnedArticles WHERE article_id = $1 AND user_email=$2', [id, user_email]);
        const itsRated = await client.query('SELECT degree FROM ratedArticles WHERE article_id = $1 AND user_email=$2', [id, user_email]);
        
        const [articleResult, itsPinnedResult, itsRatedResult] = await Promise.all( [articleQuery,itsPinned,itsRated] )

        if (articleResult.rows.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }

        const degree = itsRatedResult.rows.length > 0 ? itsRatedResult.rows[0].degree : null

        res.json({
            article: articleResult.rows[0],
            itsPinned: itsPinnedResult.rows.length > 0,
            degree
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
