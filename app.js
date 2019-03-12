const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var _ = require('lodash');


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));


// ----------install database-----
mongoose.connect('mongodb://localhost:27017/blog-tuhoc', {
    useNewUrlParser: true
});

const postSimple = {
    title: String,
    content: String
}

const PostSimple = mongoose.model("PostSimple", postSimple);




app.get('/', (req, res) => {
    const test = _.kebabCase('Điều gì xảy ra khi gõ một đường dẫn lên browser');

    res.render("index", {
        test: test
    });
});


app.get('/post', (req,res)=>{
    res.render("post");
});

app.get('/post/:postName', (req,res) => {
    const postName = req.params.postName;
    //_.kebabCase(postName)
    res.render("post");

});













app.listen(port, () =>
    console.log(`Server is listening on port ${port}!`)
);