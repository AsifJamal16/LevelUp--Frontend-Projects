let questions = [
    {
        question: "Which tag is used to link a CSS file in HTML?",
        options: ["&lt;css&gt;", "&lt;style&gt;", "&lt;link&gt;", "&lt;stylesheet&gt;"],
        answer: "&lt;link&gt;"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Django", "Flask", "Laravel"],
        answer: "React"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Type Multi Language",
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Text Multi Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: ["font-color", "color", "text-color", "font-style"],
        answer: "color"
    },
    {
        question: "Which attribute is used to open a link in a new tab?",
        options: ["target='_blank'", "open='_tab'", "link='new'", "new='tab'"],
        answer: "target='_blank'"
    },
    {
        question: "Which of the following is not a semantic tag in HTML5?",
        options: ["&lt;footer&gt;", "&lt;article&gt;", "&lt;div&gt;", "&lt;section&gt;"],
        answer: "&lt;div&gt;"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["set", "def", "let", "define"],
        answer: "let"
    },
    {
        question: "CSS stands for?",
        options: [
            "Cascading Style Sheets",
            "Computer Styled Sections",
            "Creative Styling System",
            "Color Style Sheet"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which tag is used to insert a line break in HTML?",
        options: ["&lt;lb&gt;", "&lt;break&gt;", "&lt;br&gt;", "&lt;hr&gt;"],
        answer: "&lt;br&gt;"
    },
    {
        question: "Which of these is a valid HTML5 element?",
        options: ["&lt;container&gt;", "&lt;section&gt;", "&lt;box&gt;", "&lt;frame&gt;"],
        answer: "&lt;section&gt;"
    }
];

let index = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let selected = false;
let chosenOption = null;

let qBox = document.getElementById("questionBox");
let buttons = document.querySelectorAll(".btn");
let scoreBoard = document.getElementById("score");
let time = document.getElementById("time");
let nextBtn = document.getElementById("nextBtn");

function loadQ() {
    if (index < questions.length) {
        let q = questions[index];
        qBox.innerHTML = (index + 1) + ". " + q.question;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "inline-block";
            buttons[i].innerHTML = q.options[i]; // safe now
            buttons[i].classList.remove("selected");
        }

        scoreBoard.innerHTML = "Question " + (index + 1) + " / " + questions.length;
        selected = false;
        chosenOption = null;
        timeLeft = 15;
        time.innerHTML = timeLeft;
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        endQuiz();
    }
}

function choose(btn) {
    if (!selected) {
        buttons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selected = true;
        chosenOption = btn.innerHTML;
    }
}

function next() {
    if (chosenOption === questions[index].answer) {
        score++;
    }
    index++;
    clearInterval(timerInterval);
    loadQ();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerHTML = timeLeft;
    } else {
        clearInterval(timerInterval);
        next();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    document.querySelector(".title").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.querySelector(".options").style.display = "none";
    nextBtn.style.display = "none";

    let box = document.querySelector(".quiz-box");
    box.innerHTML = `
        <div class="end-screen">
            <h2>Quiz Completed!</h2>
            <p><b>Your Final Score:</b> ${score} / ${questions.length}</p>
        </div>
    `;
}
loadQ();
