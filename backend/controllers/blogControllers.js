const asyncHandler = require("express-async-handler")
const Blog = require("../models/blogModel");


const getBlogs = asyncHandler(async (req, res) =>{
    const blogs = await Blog.find();

    if(!blogs){
        res.status(404);
        throw new Error("Blogs Not Found!!")
    }
    res.status(200);
    res.json(blogs);
});

const getBlog = asyncHandler(async (req, res)=>{
    const blog = await Blog.findById(req.params.id);

    if(!blog){
        res.status(404);
        throw new Error("Blog Not Found!!")
    }
    res.status(200);
    res.json(blog);
});

const addBlog =asyncHandler( async (req, res) =>{
      // Check If Requierd Fields
    const { title, description, author, isPublished } = req.body;
    
    if(!req.file || req.file.fieldname !== "coverImage") {
        res.status(400);
        throw new Error("Please Fill All Details");
    }

    if(!title || !description || !author || !isPublished) {
        res.status(400);
        throw new Error("Please Fill All Details!!")
    }


     // Create New Document In DB
     const blog = await Blog.create({
        title , 
        description , 
        author, 
        isPublished,
        coverImage: req.file.path,
    });

    if(!blog){
        res.status(400);
        throw new Error("Blog Not Created!!")
    }
    res.status(200);
    res.json(blog);
});

const updateBlog = asyncHandler(
    async (req, res)=>{
        // Find  Document by ID
        const updatedTodo= await Blog.findByIdAndUpdate(req.params.id, req.body,{new:true,});
    
        if(!updatedTodo){
            res.status(400);
            throw new Error("Blog Not Updated!!")
        }
        res.status(200);
        res.json(updatedTodo);
    });

const removeBlog =asyncHandler( async (req, res) =>{
    // Delete Document by ID
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
    success: true,
    });
});

module.exports ={ getBlog , getBlogs , addBlog, updateBlog, removeBlog};