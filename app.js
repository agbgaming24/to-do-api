import 'dotenv/config';
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app=express();
const port=process.env.PORT;

app.use(express.json())
app.use('/',authRoutes)
app.use('/',todoRoutes)

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})