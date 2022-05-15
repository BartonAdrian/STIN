//-----------------------------------------------
//Imports
const http = require('https');
const fs = require('fs');
const timeManager = require('./timeManager');
const res = require('express/lib/response');

//-----------------------------------------------
//Constants
const dataCurrency = "./data/curreny.xls";
const dataListCurrency = "./data/curreny_list.xls";
const url = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt;jsessionid=41E8B05DD6ABF015834C4AB146533598?date=";

//-----------------------------------------------
//Download data from CNB
function downloadCurrencyData(kod) {
    const file = fs.createWriteStream(dataCurrency);
    const request = http.get(url + timeManager.getTodayDate(), function(resp) {
        resp.pipe(file);
        file.on("finish", () => {
            file.close();
        });
    });
    let content = fs.readFileSync(dataCurrency).toString();
    content.split(/\r?\n/).forEach(element => {
    if (element.includes(kod) &&
        timeManager.isDateToday(timeManager.parseDate(content.split(" ")[0])) &&
        !timeManager.isDateToday(timeManager.parseDate(getCurrentEuro().split("-")[1]))) {
        fs.appendFileSync(dataListCurrency, element + "|" + content.split(/\r?\n/)[0] + "\n", function(err) {
            if (err) throw err;
            console.log('Saved!');
        });
        fs.close;
        return true;
    }
    else{
        return false;
    }
    });
    return false;
}

//-----------------------------------------------
//Return history of EURO
function getHistoryEuro() {
    let content = fs.readFileSync(dataListCurrency).toString();
    let res = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"10\">";
    content.split(/\r?\n/).forEach(element => {
        if (element.includes("EUR")) {
            const text = element.split("|");
            res += "<tr><td style=\"padding: 10px;\">" + text[4] + "</td> <td style=\"padding: 10px;\">" + text[5].split(" ")[0] + "</td></tr>";
        }
    });
    res += "</table>"
    return res;
}

//-----------------------------------------------
//Recomendation of euro
function recommendEuro(){
    let content = fs.readFileSync(dataListCurrency).toString();
    let cnt = content.split(/\r?\n/);
    let res="";

    if(cnt.length<4)
        return "Insufficient data";

    let llday=cnt[cnt.length-4];
    let lday=cnt[cnt.length-3];
    let day=cnt[cnt.length-2];

    let rates=[parseFloat(llday.split("|")[4].replace(",",".")),parseFloat(lday.split("|")[4].replace(",",".")),parseFloat(day.split("|")[4].replace(",","."))];

    if(decreasing(rates)){
        return "I recommend buying the euro (declining for three days).";
    }else{
        res += "Not declining for three days. ";
    }

    if(average(rates)){
        return "I recommend buying the euro (The last increase does not exceed 10% of the average).";
    }else{
        res += "The latest increase exceeds 10% of the average.";
    }
    
    return "I do not recommend buying the euro ("+res+")";
}

function decreasing(rates){
    if(rates[0]>rates[1] && rates[1]>rates[2]){
        return true;
    }
    return false;
}

function average(rates){
    let avg=((rates[0]+rates[1]+rates[2])/3)/10;
    if(Math.abs(rates[2]-rates[1])<avg){
        return true;
    }
    return false;
}

//-----------------------------------------------
//Returns the current euro exchange rate
function getCurrentEuro() {
    let content = fs.readFileSync(dataListCurrency).toString();
    let text = content.split(/\r?\n/)[content.split(/\r?\n/).length - 2];
    text = text.split("|");
    return text[4] + " - " + text[5].split(" ")[0];
}

//-----------------------------------------------
//Export
module.exports = {recommendEuro, decreasing, average, getHistoryEuro, getCurrentEuro, downloadCurrencyData };