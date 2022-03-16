var mainEl = document.querySelector("main");
var titleArea = document.querySelector("#title-area");
var sectionAreaEl = document.querySelector("#section-area");
var startEl = document.querySelector("#start-btn");

var questionNo = 0

// store questions, answers, and correct answer in an array 
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

// starts the quiz when start button is clicked or executed by nextQuestionHandler();
var startQuiz = function() {
    var instruction = document.querySelector("#instruction");
    var confirmInstruction = document.getElementById("instruction");
    var confirmStartBtn = document.getElementById("start-btn");

    // confirm if there are instruction and start button to remove
    if (confirmInstruction && confirmStartBtn) {
        instruction.remove();
        startEl.remove();
    }

    // set up question
    setQuestion(questionNo);
    // set up answers
    setAnswers(questionNo);
}

// set up a question by overwriting a title (to be executed by startQuiz())
var setQuestion = function(i) {
    // set up a class name to change the default main section's style
    mainEl.className = "main-style";

    // set a question to the place there was a title of the quiz
    titleArea.innerHTML = quizQuestions[i].question;
}

// set up answers for the assigned question number (to be executed by startQuiz())
var setAnswers = function(i) {
    // create an ordered list element
    var answerListEl = document.createElement("ol");
    answerListEl.className = "answer-list";

    // create button and list item elements of the answers
    for (choice in quizQuestions[i].answers) {
        var answerChoice = quizQuestions[i].answers[choice];
        var listItemEl = document.createElement("button");
        listItemEl.className = "answer-btn";
        listItemEl.setAttribute("data-question-id", i)
        listItemEl.innerHTML = "<li class='answer' onclick='confirmAnswer(this)'>" + answerChoice + "</li>";
        
        answerListEl.appendChild(listItemEl);
        
        if (choice === 5) {
            break;
        }
    }

    // set button and list elements as children to ordered list element
    sectionAreaEl.appendChild(answerListEl);
}

// check answer to see if it's correct or not (to be executed when an answer is clicked)
var confirmAnswer = function(selectedBtn) {
    // check if there is an id name "result" and remove the section if there is
    var confirmResultSection = document.getElementById("result");

    if (confirmResultSection) {
        var resultSection = document.querySelector("#result");
        resultSection.remove();
    }

    // create a section to show the result
    var resultSection = document.createElement("section");
    resultSection.className = "section-border";
    resultSection.setAttribute("id", "result");
    mainEl.appendChild(resultSection);

    var selectedAnswer = selectedBtn.textContent;
    console.log(selectedAnswer);
    var answerBtnEl = document.querySelector(".answer-btn");
    var questionNo = answerBtnEl.getAttribute("data-question-id");
    
    var correctAnswer = quizQuestions[questionNo].correctAnswer;
    console.dir(correctAnswer);
    
    // if the answer user selected is the correct answer, it will show "Correct" and if it's wrong show "Wrong"
    if (selectedAnswer === correctAnswer) {
        resultSection.innerHTML = "<p>Correct!</p>";
    } else {
        resultSection.innerHTML = "<p>Wrong!</p>";
    }

    nextQuestionHandler();
}

// prepare for the next question and go to startQuiz() (to be executed by confirmAnswer())
var nextQuestionHandler = function() {
    var answersList = document.querySelector(".answer-list");

    answersList.remove();

    questionNo += 1;
    startQuiz();
}

startEl.addEventListener("click", startQuiz, true);
