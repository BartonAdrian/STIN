//-----------------------------------------------
//Imports
const express = require('express');
const path = require('path');
const app = express();
var CronJob = require('cron').CronJob;
const currency = require("./currency");
const timeManager= require("./timeManager");
const messageManager=require("./messageManager");
//-----------------------------------------------
//Aplication
app.use(express.static(path.join(__dirname+"/public")));
app.use(express.json());

//-----------------------------------------------
//Constatns
const name ="Tuppee";

//-----------------------------------------------
//Start
currency.downloadCurrencyData("EUR");

//-----------------------------------------------
//Cron Job- every day between 12-15 at 5 minute intervals
const job = new CronJob('0 */5 14-15 * * MON-FRI', function() {
    var date=timeManager.parseDate(currency.getCurrentEuro().split("-")[1]);
    if(timeManager.isDateToday(date)==false){
        currency.downloadCurrencyData("EUR");
    }
});
job.start();
//-----------------------------------------------

//-----------------------------------------------
//GET METHOD
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//-----------------------------------------------
//POST METHOD
app.post('/', (req, res) => {
    const { message } = req.headers;
    const response=messageManager.requestReview(message,name);
    res.send({
      name,
      response,
    });
});

//-----------------------------------------------
//Port listening
app.listen(3000, () => {
    console.log('Our express server is up on port 3000');
  });
//-----------------------------------------------