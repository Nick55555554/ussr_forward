import pkg from 'pg';
import dotenv from 'dotenv'; 

dotenv.config(); 

const { Client } = pkg; 

const client = new Client({
    user:process.env.DBUSRERNAME,
    host:process.env.DBHOST,
    database:process.env.DBDATABASE,
    password:process.env.DBPASASWORD,
    port: process.env.DBPORT,
})

async function runQueries() {
    try {
        await client.connect();
        console.log("Подключение к базе данных успешно!");

    } catch (err) {
        console.error("Ошибка при выполнении запроса:", err);
    }
}


runQueries();

export default client;
