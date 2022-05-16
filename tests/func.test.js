//-----------------------------------------------
//Imports
const currency = require("../currency");
const timeManager = require("../timeManager");
const messageManager = require("../messageManager");
const { expect } = require("chai");

//-----------------------------------------------
//Constatns
const help= "Get my name - Keywords WHAT and NAME"+"<br><br>"+
             "Get actual time -Keywords WHAT and TIME"+"<br><br>"+
             "Get the current euro exchange rate - Keywords EUR, EXCHANGE and RATE "+"<br><br>"+
             "Get a recommendation to buy euro- Keywords EUR, CURRENT and FAVORABLE "+"<br><br>"+
             "Get the history of the euro- Keywords EUR and HISTORY "+"<br><br>"+
             "Help commands - write HELP";
const name = "Adrian";

//-----------------------------------------------
//Tests
describe("Test message manager", function() {
    it("Test - Get name", function() {
        expect(messageManager.requestReview("What is your name ?", name)).to.deep.equal("My name is " + name + ".");
        expect(messageManager.requestReview("What name", name)).to.be.equal("My name is " + name + ".");
        expect(messageManager.requestReview("Give me your name.", name)).to.be.equal(help);
    });
    it("Test - Get time", function() {
        expect(messageManager.requestReview("What time is it?", name)).to.be.equal("The time now is " + timeManager.getTime());
        expect(messageManager.requestReview("What time", name)).to.be.equal("The time now is " + timeManager.getTime());
        expect(messageManager.requestReview("Give me time.", name)).to.be.equal(help);
    });
    it("Test - Get euro current exchange rate", function() {
        expect(messageManager.requestReview("What is the current euro exchange rate?", name)).to.be.equal("The current euro exchange rate is " + currency.getCurrentEuro());
        expect(messageManager.requestReview("Give me current euro exchange rate", name)).to.be.equal("The current euro exchange rate is " + currency.getCurrentEuro());
        expect(messageManager.requestReview("Give me acutal euro.", name)).to.be.equal(help);
    });
    it("Test - Get euro recommendation", function() {
        expect(messageManager.requestReview("Is the current euro fovarable ?", name)).to.be.ok;
        expect(messageManager.requestReview("Eur current favorable ?", name)).to.be.ok;
        expect(messageManager.requestReview("Recommend me euro", name)).to.be.equal(help);
    });
    it("Test - Get euro history", function() {
        expect(messageManager.requestReview("Give me euro history.", name)).to.be.equal(currency.getHistoryEuro());
        expect(messageManager.requestReview("Eur history.", name)).to.be.equal(currency.getHistoryEuro());
        expect(messageManager.requestReview("History", name)).to.be.equal(help);
    });
    it("Test - Get help", function() {
        expect(messageManager.requestReview("help", name)).to.be.equal(help);
    });
    it("Test - Wrong input", function() {
        expect(messageManager.requestReview("Nevim", name)).to.be.equal(help);
        expect(messageManager.requestReview("What is your name > ?", name)).to.be.equal("Invalid input.");
        expect(messageManager.requestReview("<script>", name)).to.be.equal("Invalid input.");
    });
});
//-----------------------------------------------
describe("Test time manager", function() {
    it("Test - Parse time", function() {
        expect(timeManager.parseDate("28.08.2019")).to.be.ok;
        expect(timeManager.parseDate("08.08.2010")).to.be.ok;
    });
    it("Test - Check today date", function() {
        expect(timeManager.isDateToday("08 28 2019")).to.be.equal(false);
        expect(timeManager.isDateToday(new Date())).to.be.equal(true);
    });
    it("Test - Get actual time", function() {
        expect(timeManager.getTime()).to.be.ok;
    });
    it("Test - Get today day", function() {
        expect(timeManager.getTodayDate()).to.be.ok;
    });
});
//-----------------------------------------------
describe("Test currency", function() {
    it("Test - Get history of euro", function() {
        expect(currency.getHistoryEuro()).to.be.ok;
    });
    it("Test - Get euro current exchange rate", function() {
        expect(currency.getCurrentEuro()).to.be.ok;
    });
    it("Test - Download data", function() {
        expect(currency.downloadCurrencyData()).to.be.false;
        expect(currency.downloadCurrencyData(null)).to.be.not.ok;
        expect(currency.downloadCurrencyData("Nevim")).to.be.false;
        //expect(currency.downloadCurrencyData("EUR")).to.be.false;
    });
    it("Test - Decreasing", function() {
        expect(currency.decreasing([parseFloat("24.42"),parseFloat("24.415"),parseFloat("24.314")])).to.be.ok;
        expect(currency.decreasing([parseFloat("24.42"),parseFloat("24.415"),parseFloat("25.314")])).to.be.not.ok;
        expect(currency.decreasing([parseFloat("1"),parseFloat("0"),parseFloat("0.5")])).to.be.not.ok;
    });
    it("Test - Average", function() {
        expect(currency.average([parseFloat("24.42"),parseFloat("24.415"),parseFloat("24.314")])).to.be.ok;
        expect(currency.average([parseFloat("24.42"),parseFloat("24.415"),parseFloat("29.314")])).to.be.not.ok;
        expect(currency.average([parseFloat("1"),parseFloat("0"),parseFloat("0.5")])).to.be.not.ok;
    });

    it("Test - Recommend", function() {
        expect(currency.recommendEuro()).to.be.ok;
    });
    
});
