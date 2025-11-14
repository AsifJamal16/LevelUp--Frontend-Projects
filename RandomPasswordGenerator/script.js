let passwordInput = document.getElementById("password");
let lengthInput = document.getElementById("length");

let lower = document.getElementById("lowercase");
let upper = document.getElementById("uppercase");
let nums = document.getElementById("numbers");
let syms = document.getElementById("symbols");

let generateBtn = document.getElementById("generate");
let copyBtn = document.getElementById("copy");

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numberChars = "0123456789";
let symbolChars = "!@#$%^&*()_+=-{}[]<>?";

generateBtn.addEventListener("click", function () {

    let length = parseInt(lengthInput.value);
    let characters = "";

    if (lower.checked) characters += lowerChars;
    if (upper.checked) characters += upperChars;
    if (nums.checked) characters += numberChars;
    if (syms.checked) characters += symbolChars;

    if (characters.length === 0) {
        alert("please select at least one option");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordInput.value = password;
});

copyBtn.addEventListener("click", function () {
    if (passwordInput.value.length > 0) {
        passwordInput.select();
        document.execCommand("copy");
        alert("password copied");
    }
});
