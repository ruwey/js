function init() {
    var time = 7;
    var guesses = [];
    var code = genCode();
    console.log("Code: ", code);

}

function genCode() {
    let code = "";
    for (let i = 0; i < 3; i++) {
	code += Math.floor(Math.random() * 3.0 + 1);
    }
    return code;
}

