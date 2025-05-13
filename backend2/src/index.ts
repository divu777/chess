import e from 'express';

import cors from 'cors';
import addJobs from './queue';


const app=e();

app.use(cors());

app.use(e.json())

app.post("/addJobsToQueue",async(req,res)=>{
    console.log("before adding the jobs")
    console.log(req.body);
    await addJobs(req.body)
    console.log("recieved request");
})

app.listen(3001,()=>{
    console.log("app is running on port 3001");
})