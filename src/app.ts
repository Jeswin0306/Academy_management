import express from "express";
import check from './check/check';

const app = express();
app.use(express.json());

app.use('/api', check);


export default app;
