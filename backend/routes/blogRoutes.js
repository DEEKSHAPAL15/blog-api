const express = require("express");
const { getBlogs, addBlog, getBlog, updateBlog, removeBlog } = require("../controllers/blogControllers");
const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file , cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        const customFileName = Date.now() + "." + file.originalname.split(".")[1];
        cb(null, customFileName);
    },
});

const upload = multer({storage: storage});


const router = express.Router();

router.get("/",getBlogs);

router.post("/", upload.single("coverImage"),addBlog);

router.get("/:id",getBlog);

router.put("/:id",updateBlog);

router.delete("/:id",removeBlog);

module.exports = router;

