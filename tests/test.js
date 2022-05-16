function validate(input) {
    const forbiddenChars = ["<", ">", "script", "%"];
    var result = true;
    forbiddenChars.forEach(element => {
        if (input.includes(element)) {
            result = false;
        }
    });
    return result;
}


describe("Validation",()=>{
    it("Validation",()=>{
        expect(validate("scr>")).toBe(false);
        expect(validate("<?scr>")).toBe(false);
        expect(validate("ahoj%")).toBe(false);
        expect(validate("<script>")).toBe(false);
        expect(validate("What time is it ?")).toBe(true);
    })
})