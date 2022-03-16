var mainEl = document.querySelector("main");
var titleArea = document.querySelector("#title-area");
var sectionAreaEl = document.querySelector("#section-area");
var startEl = document.querySelector("#start-btn");

var quizQuestions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answers: [
            "quotes",
            "curly brackets",
            "parenthesis",
            "square brackets"
        ],
        correctAnswer: "parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis"
        ],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        correctAnswer: "console.log"
    }
]

var startQuiz = function() {
    var instruction = document.querySelector("#instruction");
    var confirmInstruction = document.getElementById("instruction");
    var confirmStartBtn = document.getElementById("start-btn");
    var i = 0;

    if (confirmInstruction && confirmStartBtn) {
        instruction.remove();
        startEl.remove();
    
        switchQuestion(i);

        setAnswers(i);
    }
}

var switchQuestion = function(i) {
    mainEl.className = "main-style";

    titleArea.innerHTML = quizQuestions[i].question;
}

var setAnswers = function(i) {
    var answerListEl = document.createElement("ol");
    answerListEl.className = "answer-list";

    for (choice in quizQuestions[i].answers) {
        console.log(choice);
        var answerChoice = quizQuestions[i].answers[choice];
        var listItemEl = document.createElement("button");
        listItemEl.className = "answer-btn";
        listItemEl.innerHTML = "<li class='answer' onclick='confirmAnswer(this)'>" + answerChoice + "</li>";
        
        answerListEl.appendChild(listItemEl);
        console.log(listItemEl);
        
        if (choice === 5) {
            break;
        }
    }
    sectionAreaEl.appendChild(answerListEl);

    // confirmAnswer(i);
}

var confirmAnswer = function(selectedBtn) {

    var resultSection = document.createElement("section");
    resultSection.className = "section-border";
    mainEl.appendChild(resultSection);
    var selectedAnswer = selectedBtn.textContent;
    

    if (selectedAnswer === "alerts") {
        resultSection.innerHTML = "<p>Correct!</p>";
    } else {
        resultSection.innerHTML = "<p>Wrong!</p>";
    }

    console.dir(selectedAnswer);
    console.log(resultSection);
        
    

    // startQuiz();
}

startEl.addEventListener("click", startQuiz, true);
