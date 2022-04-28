/*
const { expect } = require("chai");
const script = require("../public/script");

describe("Frontend Tests", function() {
    it("Validation input test", function() {
        expect(script.validate("<script>")).to.be.false;
        expect(script.validate("What is your name >")).to.be.false;
        expect(script.validate(null)).to.be.not.ok;
        expect(script.validate("What is your name ?")).to.be.true;
    });
    it("Message rendering", function() {
        expect(script.renderMessage("me", "What is your name ?")).to.be.ok;
    });
});
*/