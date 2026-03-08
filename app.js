import 'dotenv/config';
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app=express();
const port=process.env.PORT;

app.use(express.json())
app.use('/',authRoutes)
app.use('/',todoRoutes)

app.get('/test', (req, res) => {
  res.json({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  })
})

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})