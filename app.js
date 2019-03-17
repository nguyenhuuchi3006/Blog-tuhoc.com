const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var _ = require('lodash');

const port = 3000;


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));


// ----------install database-----
mongoose.connect('mongodb://localhost:27017/blogtuhoc', {
    useNewUrlParser: true
});

const postSimple = {
    title: String,
    content: String,
    imageUrl: String
}

const PostSimple = mongoose.model("PostSimple", postSimple);

// ------------------------------------
         
app.get('/', (req, res) => {

    PostSimple.find((err, posts) => {
        res.render("index", {
            posts: posts
        })
    })

    
});


app.get('/post', (req, res)=>{
    res.render("post");
});


app.get('/post/:postID', (req,res) => {
    
    const requestedPostID = req.params.postID;
    PostSimple.findOne({_id: requestedPostID}, (err, post) => {
        res.render("post", {
            post: post
        });
    })

});

app.get('/compose', (req,res) => {
    res.render("compose");
})

app.post('/compose', (req, res) => {

    const post = new PostSimple({
        title: req.body.postTitle,
        content: req.body.postBody,
        imageUrl: req.body.postImage
    })
    post.save();
    res.redirect("/");


})









app.listen(port, () =>
    console.log(`Server is listening on port ${port}!`)
);