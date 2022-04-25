//-----------------------------------------------
//Imports
const http = require('https');
const fs = require('fs');
const timeManager = require('./timeManager');

//-----------------------------------------------
//Constants
const dataCurrency="./data/curreny.xls";
const dataListCurrency="./data/curreny_list.xls";
const url="https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt;jsessionid=41E8B05DD6ABF015834C4AB146533598?date=";

//-----------------------------------------------
//Download data from CNB
function downloadCurrencyData(kod){
    const file = fs.createWriteStream(dataCurrency);
    const request = http.get(url+timeManager.getTodayDate(), function(resp) {
        resp.pipe(file);
        file.on("finish", () => {
            file.close();
        });
    });
    let content = fs.readFileSync(dataCurrency).toString();
    if(timeManager.isDateToday(timeManager.parseDate(getCurrentEuro().split("-")[1]))){
        return true;
    }
    if(!timeManager.isDateToday(timeManager.parseDate(content.split(" ")[0]))){
        return;
    }
    content.split(/\r?\n/).forEach(element => {
        if(element.includes(kod)){
            fs.appendFileSync(dataListCurrency,element+"|"+content.split(/\r?\n/)[0]+"\n",function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              return;
        }
    });
    return true;
}

//-----------------------------------------------
//Return history of EURO
function getHistoryEuro(){
    let content = fs.readFileSync(dataListCurrency).toString();
    let res="<table border=\"1\" cellspacing=\"0\" cellpadding=\"10\">";
    content.split(/\r?\n/).forEach(element => {
        if(element.includes("EUR")){
            const text=element.split("|");
            res+="<tr><td style=\"padding: 10px;\">"+text[4]+"</td> <td style=\"padding: 10px;\">"+text[5].split(" ")[0]+"</td></tr>";
        }
    });
    res+="</table>"
    return res;
}

//-----------------------------------------------
//Returns the current euro exchange rate
function getCurrentEuro(){
    let content = fs.readFileSync(dataListCurrency).toString();
    let text=content.split(/\r?\n/)[content.split(/\r?\n/).length-2];
    text=text.split("|");
    return text[4]+" - "+text[5].split(" ")[0];
}

//-----------------------------------------------
//Export
module.exports = { getHistoryEuro, getCurrentEuro, downloadCurrencyData };