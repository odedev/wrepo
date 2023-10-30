import express from 'express';
import cors from 'cors'
const app = express();


app.use(cors());
// app.use('/', express.static(staticDir))
app.use('/public', express.static('public'))

export default app;
