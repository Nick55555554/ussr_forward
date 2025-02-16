import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/articles.js';
import pinnedRouter from './routes/pinnedArticles.js'
import rateRouter from './routes/rateArticle.js'
import periodsRouter from "./routes/periods.js"

dotenv.config(); 

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
    credentials: true 
}));
app.options('*', cors());

app.use(express.json()); 

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; img-src 'self' https://disk.yandex.ru; style-src 'self' blob;");

    res.setHeader('X-Content-Type-Options', 'nosniff');

    res.setHeader('X-Frame-Options', 'DENY');
    

    res.setHeader("Cache-Control", "public, max-age=3600");

    res.setHeader("ETag", "some-unique-value"); 

    res.setHeader("Last-Modified", new Date().toUTCString()); 
    
    console.log(`${req.method} ${req.url}`);

    next();
});
app.use("/api/articles", router);

app.use('/api/pinArticle',pinnedRouter)

app.use('/api/rateArticle',rateRouter)

app.use('/api/periods',periodsRouter)


export default app;
