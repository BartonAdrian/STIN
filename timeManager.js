//-----------------------------------------------
//Parse string to Date
function parseDate(datum){
    const datumTxt=datum.split(".");
    return new Date(datumTxt[1] + " " + datumTxt[0]+" "+datumTxt[2]);
}

//-----------------------------------------------
//Check actual date
function isDateToday(date) {
    const otherDate = new Date(date);
    const todayDate = new Date();

    if (
        otherDate.getDate() === todayDate.getDate() &&
        otherDate.getMonth() === todayDate.getMonth() &&
        otherDate.getYear() === todayDate.getYear()
    ) {
        return true;
    } else {
        return false;
    }
}

//-----------------------------------------------
//Return actual time in DD.MM.YYYY format
function getTodayDate(){
    const date = new Date();
  
    const formatData = (input) => {
    if (input > 9) {
        return input;
    } else return `0${input}`;
    };

    const format = {
        DD: formatData(date.getDate()),
        MM: formatData(date.getMonth()+1),
        YYYY: formatData(date.getFullYear()), 
    };

    return (`${format.DD}.${format.MM}.${format.YYYY}`);
}

//-----------------------------------------------
//Return actual time in HH:MM format
function getTime(){
    const date = new Date();
  
    const formatData = (input) => {
    if (input > 9) {
        return input;
    } else return `0${input}`;
    };

    const format = {
        HH: formatData(date.getHours()),
        MM: formatData(date.getMinutes()),
    };

    return (`${format.HH}:${format.MM}`);
}

//-----------------------------------------------
//Export
module.exports = { getTime, isDateToday,getTodayDate, parseDate };