const express = require('express');
const cors = require('cors');
const app = express();
const {generateFile} = require('./generateFile');
const {executeCpp} = require('./executeCpp');

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//GET
app.get("/", (req, res)=>{
    // res.send("<h1>Doker is running!</h1>");
    res.json({online:'compiler'});
});

//POST
app.post("/run", async(req,res) => {
    const {language = 'cpp', code, input} = req.body;
    if(code === undefined){
        return res.status(404).json({success : false, error:"Code is Missing!"});
    }
    try{
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.json({filePath, output});
    } catch (error){
        res.status(500).json({error: error});
    }
})

app.listen(8080, ()=>{
    console.log("Server is running on port 8080!");
})

