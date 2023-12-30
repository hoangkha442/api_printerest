import express from 'express';
import cors from 'cors';
import rootRoute from './routes/rootRoutes.js';

const app = express()
// chèn middleware
// Định dạng
app.use(express.json())
app.listen(8080)
// CORS - cho phép FE gọi BE
app.use(cors())

// middleware - định vị thư mục load tài nguyên
app.use(express.static("."))

app.use(rootRoute)