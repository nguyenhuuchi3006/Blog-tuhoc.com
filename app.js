const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(port, () => 
    console.log(`Server is listening on port ${port}!`)
);