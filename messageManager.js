//-----------------------------------------------
//Imports
const currency = require("./currency");
const timeManager= require("./timeManager")

//-----------------------------------------------
//Constatns
const help= "Get my name - Keywords WHAT and NAME"+"<br><br>"+
             "Get actual time -Keywords WHAT and TIME"+"<br><br>"+
             "Get the current euro exchange rate - Keywords EUR, EXCHANGE and RATE "+"<br><br>"+
             "Get the history of the euro- Keywords EUR and HISTORY "+"<br><br>"+
             "Help commands - write HELP";

//-----------------------------------------------
//Review the request and submit the response
function requestReview(msg,name){
    msg=msg.toLowerCase();
    if(!validate(msg))return "Invalid input.";
    if(msg.includes("what") && msg.includes("name")){
        return "My name is "+name+".";
    }else if(msg.includes("what") && msg.includes("time")){
        return "The time now is "+timeManager.getTime();
    }else if(msg.includes("eur") && msg.includes("history")){
        return currency.getHistoryEuro();
    }else if(msg.includes("eur") && msg.includes("exchange") && msg.includes("rate")){
        return "The current euro exchange rate is " + currency.getCurrentEuro();
    }else if(msg.includes("help")){
        return help;
    }else{
        return help;
    }
}

//-----------------------------------------------
// Validate the input
function validate(input){
    const forbiddenChars= ["<",">","script","%"];
    var result=true;
    forbiddenChars.forEach(element => {
        if(input.includes(element)){
            result= false;
        }
    });
    return result;
}

//-----------------------------------------------
//Export
module.exports = { requestReview};