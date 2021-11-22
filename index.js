const express = require('express');
const app = express();
const multer = require("multer");
const {request, response} = require("express");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));// parse url parameters to request body

const filestorage = multer.diskStorage({
    destination: (request, file, callback)=>{
        callback(null, "./uploads");
    },
    filename: (request, file, callback)=>{
        callback(null,Date.now().toString()+"_"+ file.originalname);
    }
});

const upload = multer({storage: filestorage});

app.get('/', (request, response)=>{
    return response.render('index');
})

app.post('/api/upload', upload.single("image"), (request, response)=>{
    console.log(request.file);
    response.send("File Upload Success");
});

app.listen(5000);