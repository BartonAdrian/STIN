const express = require('express');
const path = require('path');
const app = express();
let cookieParser = require('cookie-parser');
var bodyparser=require('body-parser');
var session=require('express-session');

const name="Shfaron";
const help= "Get my name - Keywords WHAT and NAME"+"<br><br>"+
             "Get actual time -Keywords WHAT and TIME"+"<br><br>"+
             "Get the current euro exchange rate - Keywords EUR, EXCHANGE and RATE "+"<br><br>"+
             "Get the history of the euro- Keywords EUR and HISTORY "+"<br><br>"+
             "Help commands - write HELP";

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
    msg=msg.toLowerCase();
    if(msg.includes("what") && msg.includes("name")){
        return "My name is "+name+".";
    }else{
        return help;
    }
}


app.listen(3000, () => {
    console.log('Our express server is up on port 3000');
  });