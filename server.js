const express = require('express');
const path = require('path');
const app = express();
let cookieParser = require('cookie-parser');
var bodyparser=require('body-parser');
var session=require('express-session');

const name="Shfaron";

app.use(express.static(path.join(__dirname+"/public")));

app.use(express.json());
app.use(cookieParser());
app.use(session({
secret:'secret',
resave:false,
saveUninitialized:false,
cookie:{
maxAge:10000
}}));
 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
app.post('/', (req, res) => {
    const { message } = req.headers;
    const response=checkQuestion(message);
    console.log(req.cookies);
    //console.log(message);
    let conversation={
        question: message,
        answer: response,
    }
    res.cookie('cookieName',{conversation});
    res.send({
      name,
      response,
    });
});

function checkQuestion(msg){
    return "odpoved";
}



app.listen(3000, () => {
    console.log('Our express server is up on port 3000');
  });