import express from "express";
import check from './check/check';
import register from './register/router'

const app = express();
app.use(express.json());

app.use('/api', check);
app.use('/api', register);


export default app;
