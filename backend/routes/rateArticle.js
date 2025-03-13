import express from 'express';
import client from "../database/index.js";

const rateRouter = express.Router();

rateRouter.post('/', async (req,res)=> {
    const {article_id, user_email,degree} = req.body;


    if (!degree) {
        return res.sendStatus(400); 
    }
    
    try {
        const result = await client.query(`
            SELECT EXISTS (
                SELECT 1 
                FROM ratedArticles 
                WHERE article_id = $1 AND user_email = $2
            ) AS exists;`, 
            [article_id, user_email]
        );
        const isExists = result.rows[0].exists;     
        
        if (!isExists){    
            await client.query(`INSERT INTO ratedArticles (article_id, user_email, degree) VALUES ($1, $2,$3);`, [article_id, user_email,degree,]);
            res.status(201).json({ message: 'Article rated successfully' });
        }else{
            await client.query(`UPDATE ratedArticles SET degree = $1 WHERE article_id=$2 AND user_email=$3;`, [degree, article_id, user_email]);
            res.status(200).json({ message: 'Article rating updated successfully' });
        }
        
        
    } catch (error) {
        console.error('Ошибка при оценке статьи:', error);
        res.status(500).send('Ошибка при оценке статьи');
    }
});
rateRouter.get('/getAll', async (req,res)=> {
    try {
        const preResult = await client.query(`SELECT * FROM ratedArticles;`);
        const result = preResult.rows
        res.status(201).json({result});
        
    } catch (error) {
        console.error('Ошибка при оценке статьи:', error);
        res.status(500).send('Ошибка при оценке статьи');
    }
});
export default rateRouter;