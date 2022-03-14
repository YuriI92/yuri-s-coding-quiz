var startEl = document.querySelector("#start-btn");

var quizQuestions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: {
            a: "strings",
            b: "booleans",
            c: "alerts",
            d: "numbers",
        }
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answers: {
            a: "quotes",
            b: "curly brackets",
            c: "parenthesis",
            d: "square brackets",
        }
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answers: {
            a: "numbers and strings",
            b: "other arrays",
            c: "booleans",
            d: "all of the above",
        }
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "parenthesis",
        }
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            a: "JavaScript",
            b: "terminal/bash",
            c: "for loops",
            d: "console.log",
        }
    },
]

// console.log(quizQuestions[0]);
// console.log(quizQuestions[0].answers);

var startQuiz = function() {
    var instruction = document.querySelector("#instruction");

    instruction.remove();
    startEl.remove();

    switchQuestion(0);
}

var switchQuestion = function(i) {
    var sectionArea = document.querySelector("#section-area");
    
    var titleArea = document.querySelector("#title-area");
    titleArea.innerHTML = quizQuestions[i].question;

    var answerListEl = document.createElement("ol");
    answerListEl.className = "answer-list";

    for (choice in quizQuestions[i].answers) {
        var listItemEl = document.createElement("li");
        listItemEl.innerHTML = "<button class='answer'>" + quizQuestions[0].answers[choice] + "</button>";
        answerListEl.appendChild(listItemEl);
        console.log(listItemEl);
    }

    sectionArea.appendChild(answerListEl);
}

startEl.addEventListener("click", startQuiz);
