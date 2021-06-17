import express, {Request, Response} from "express";
import dbcontext from './shared/dbcontext';
import cors from 'cors';
//routers
import data from './Routes/data';
const port = process.env.port || 8000;

dbcontext.authenticate()
.then(()=> console.log("connected"))
.catch(()=> console.log("error connecting the db"));

//application constants
const app = express();

app.use(cors())
app.use('/data', data);
app.listen(port,()=> {
    console.log(`server running on http://localhost:${port}`)
})