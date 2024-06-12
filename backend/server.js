const express = require("express");
const connectDB = require("./config/db_config");
require("dotenv").config();
const colors = require("colors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000; 

// DB Connection 
connectDB();

// Body Paraser Middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}))


// Multer Config

const storage = multer.diskStorage({

    destination: (req, file , cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        const customFileName = Date.now() + "." + file.originalname.split(".")[1];

        cb(null, customFileName);
    },
});

const upload = multer({storage: storage})

// Entry Route

app.get("/",(req, res) =>{
    res.status(200);
    res.json({
        msg: "WELCOME TO CRUD API 1.0",
    });
});

app.post("/uploads",upload.single("file"), (req, res)=>{
    console.log(req.file);
    res.json({
        msg:"File Uploaded",
    });
});

// Blog Routes

app.use("/api/blog", require("./routes/blogRoutes"))

app.listen(PORT ,()=>{
    console.log(`Server is running at PORT ${PORT}`)
});
