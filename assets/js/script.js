var mainEl = document.querySelector("main");
var titleArea = document.querySelector("#title-area");
var sectionAreaEl = document.querySelector("#section-area");
var startEl = document.querySelector("#start-btn");

var quizQuestions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers"
        },
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answers: {
            1: "quotes",
            2: "curly brackets",
            3: "parenthesis",
            4: "square brackets"
        },
        correctAnswer: 3
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answers: {
            a: "numbers and strings",
            b: "other arrays",
            c: "booleans",
            d: "all of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "parenthesis"
        },
        correctAnswer: "c"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            a: "JavaScript",
            b: "terminal/bash",
            c: "for loops",
            d: "console.log"
        },
        correctAnswer: "d"
    }
]

console.log(quizQuestions[0]);
console.log(quizQuestions[0].answers);

var startQuiz = function() {
    var instruction = document.querySelector("#instruction");

    // if (startEl === "<button id='start-btn'>Start Quiz</button>") {
        instruction.remove();
        startEl.remove();
    
        switchQuestion(0);        
    // }
}

// var idCounter = 1;

var switchQuestion = function(i) {
    mainEl.className = "main-style";

    // for (var i = 0; i < quizQuestions.length; i++) {
        titleArea.innerHTML = quizQuestions[i].question;

        var answerListEl = document.createElement("ol");
        answerListEl.className = "answer-list";

        for (choice in quizQuestions[i].answers) {
            var listItemEl = document.createElement("button");
            listItemEl.className = "answer-btn"
            listItemEl.innerHTML = "<li class='answer'>" + quizQuestions[i].answers[choice] + "</li>";
            // listItemEl.innerHTML = "<li class='answer' id='" + idCounter + "'>" + quizQuestions[i].answers[choice] + "</li>";
            answerListEl.appendChild(listItemEl);     
            

            // if (quizQuestions[i].answers[choice] === quizQuestions[i].correctAnswer) {
            //     document.getElementsByClassName("answer").setAttribute("id", "correct-answer");
            // }
            // idCounter++;
            console.log(listItemEl);
        }

        sectionAreaEl.appendChild(answerListEl);

        confirmAnswer(i);
    // }
}

var confirmAnswer = function(questionNo) {
    var answerChoices = document.querySelectorAll(".answer-btn");
    
    for (var i = 0; i < answerChoices.length; i++) {
        answerChoices[i].addEventListener("click", function(event) {
            var selectedAnswer = this.textContent;
            var resultSection = document.createElement("section");
            resultSection.className = "section-border";
            mainEl.appendChild(resultSection);

            if (selectedAnswer === quizQuestions[questionNo].correctAnswer) {
                resultSection.innerHTML = "<p>Correct!</p>";
            } else {
                resultSection.innerHTML = "<p>Wrong!</p>";
            }

            console.dir(selectedAnswer);
            console.log(resultSection);
        });
    }
}

startEl.addEventListener("click", startQuiz, true);
