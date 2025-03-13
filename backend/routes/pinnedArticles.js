import express from 'express';
import client from "../database/index.js";

const pinnedRouter = express.Router();


pinnedRouter.post('/create', async (req, res) => {
    const { article_id, user_email } = req.body;

    if (!article_id || !user_email) {
        return res.sendStatus(400); 
    }

    try {
        await client.query(`INSERT INTO pinnedArticles (article_id, user_email) VALUES ($1, $2)`, [article_id, user_email]);
        res.status(201).json({ message: 'Article pinned successfully' }); 
    } catch (error) {
        console.error('Ошибка при добавлении статьи:', error);
        res.status(500).send('Ошибка при добавлении статьи');
    }
});


pinnedRouter.post('/remove', async (req, res) => {
    const { article_id, user_email } = req.body;

    if (!article_id || !user_email) {
        return res.sendStatus(400); 
    }

    try {
        const result = await client.query(`
            SELECT EXISTS (
                SELECT 1 
                FROM pinnedArticles 
                WHERE article_id = $1 AND user_email = $2
            ) AS exists;`, 
            [article_id, user_email]
        );
        const isExists = result.rows[0].exists;     
        if (isExists) {
            try {
                await client.query(`DELETE FROM pinnedArticles 
                WHERE article_id=$1 AND user_email=$2`,
                [article_id, user_email]);
                res.status(200).json({ message: 'Article unPinned successfully' }); 
            } catch (error) {
                console.error('Ошибка при добавлении статьи:', error);
                res.status(500).send('Ошибка при добавлении статьи');
            }
        } else {
            res.status(200).json({ message: 'Article did not pinned' }); 
        }
        
    } catch (error) {
        console.error('Ошибка при удалении статьи:', error);
        res.status(500).send('Ошибка при добавлении статьи');
    }
});
pinnedRouter.post('/get', async (req, res) => {
    const {user_email } = req.body;

    if (!user_email) {
        return res.sendStatus(400); 
    }

    try {
        const result = await client.query(`
            SELECT EXISTS (
                SELECT 1 
                FROM pinnedArticles 
                WHERE user_email = $1
            ) AS exists;`, 
            [user_email]
        );
        const isExists = result.rows[0].exists;     
        if (isExists) {
            try {
                const articles = await client.query(`SELECT article_id FROM pinnedArticles WHERE user_email=$1`, [user_email]);
                
                const articleIds = articles.rows.map(row => row.article_id);

                const preResult = await client.query(`SELECT * FROM articles WHERE id = ANY($1::int[])`, [articleIds]);
                const result = preResult.rows
                res.status(200).json({result}); 
            } catch (error) {
                
                console.error('Ошибка при получении статьи:', error);
                res.status(500).send('Ошибка при получении статьи');
            }
        } else {
            res.status(200).json({ message: 'Article did not got' }); 
        }
        
    } catch (error) {
        console.error('Ошибка при удалении статьи:', error);
        res.status(500).send('Ошибка при добавлении статьи');
    }
});



export default pinnedRouter;
