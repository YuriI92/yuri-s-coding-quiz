var timerEl = document.querySelector("#countdown")
var mainEl = document.querySelector("main");
var titleArea = document.querySelector("#title-area");
var sectionAreaEl = document.querySelector("#section-area");
var instructionEl = document.querySelector("#instruction");
var startEl = document.querySelector("#start-btn");

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
];

var timeLeft = 75;
var timeInterval = "";
var questionNo = 0;
var scoreList = [];

// starts countdown when the quiz starts (triggered by startQuiz())
var countdown = function() {
    timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timerEl.innerHTML = "Time: " + timeLeft;
            timeLeft--;
        } else {
            finishQuiz();
        }
    }, 1000);
}

// starts the quiz when start button is clicked or executed by nextQuestionHandler();
var startQuiz = function() {
    // confirm if there are instruction and start button to remove
    var confirmInstruction = document.getElementById("instruction");
    var confirmStartBtn = document.getElementById("start-btn");
    if (confirmInstruction && confirmStartBtn) {
        countdown();
        instructionEl.remove();
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
    console.dir(quizQuestions[i]);
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
    // debugger;
    // check if there is an id name "result" and remove the section if there is
    // var resultSection = document.querySelector("#result-section");
    // if (resultSection) {
    //     resultSection.remove();
    // }
    removeResult();

    // create a section to show the result
    var resultSection = document.createElement("section");
    resultSection.className = "section-border";
    resultSection.setAttribute("id", "result-section");
    mainEl.appendChild(resultSection);

    var selectedAnswer = selectedBtn.textContent;
    var answerBtnEl = document.querySelector(".answer-btn");    
    var correctAnswer = quizQuestions[questionNo].correctAnswer;

    questionNo = parseInt(answerBtnEl.getAttribute("data-question-id"));
    
    // if the answer user selected is the correct answer, it will show "Correct" and if it's wrong show "Wrong"
    if (selectedAnswer === correctAnswer) {
        resultSection.innerHTML = "<p class='result'>Correct!</p>";
    } else {
        resultSection.innerHTML = "<p class='result'>Wrong!</p>";
        // subtract time for 15 seconds
        timeLeft -= 10;
    }

    nextQuestionHandler(questionNo);
}

// prepare for the next question and go to startQuiz() (to be executed by confirmAnswer())
var nextQuestionHandler = function() {
    // remove previous question's answers
    // var answersList = document.querySelector(".answer-list");
    // answersList.remove();
    removeAnswersList();

    // start next question
    questionNo += 1;
    if (questionNo === quizQuestions.length) {
        finishQuiz();
    } else {
        startQuiz();
    }
}

// finish quiz when there is no more quiz or the timer hits 0
var finishQuiz = function() {
    if (questionNo >= quizQuestions.length) {
        titleArea.innerHTML = "All done!"
    } else if (timeLeft <= 0) {
        removeAnswersList();
        titleArea.innerHTML = "Game Over!"
    }

    // stop timer and show the final time
    clearInterval(timeInterval);
    if (timeLeft <= 0) {
        timeLeft = 0;
    }
    timerEl.innerHTML = "Time: " + timeLeft;

    // show final score
    var finalScoreEl = document.createElement("p");
    finalScoreEl.className = "final-score";
    finalScoreEl.innerHTML = "Your final score is " + timeLeft + ".";
    sectionAreaEl.appendChild(finalScoreEl);

    // to wrap form and button to display flex
    var formWrapperEl = document.createElement("div");
    formWrapperEl.className = "flex-wrap"

    // create a form to let user submit initial
    var enterInitialEl = document.createElement("form");
    enterInitialEl.className = "initial-form";
    enterInitialEl.innerHTML = "<label for='initial'>Enter initials: </label><input type='text' name='initial' id='initial' onfocus='removeResult()'/>";
    formWrapperEl.appendChild(enterInitialEl);

    // when submit button is clicked, save the score and show high scores
    var submitBtn = document.createElement("button");
    submitBtn.className = "submit-btn";
    submitBtn.setAttribute("onclick", "saveFinalScore()");
    submitBtn.innerHTML = "Submit";
    formWrapperEl.appendChild(submitBtn);

    sectionAreaEl.appendChild(formWrapperEl);
}

// save final score to localStorage
var saveFinalScore = function() {
    var initialInput = document.querySelector("#initial");
    var savedHighScores = localStorage.getItem("scoreList");

    // store the score into an array
    var newScore = {
        userInitial: initialInput.value,
        score: timeLeft
    };

    // if there is no savedHighScores, save new score
    if (!savedHighScores) {
        scoreList.push(newScore);
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
    // if there is savedHighScores, save to the existing scoreList
    } else {
        savedHighScores = JSON.parse(savedHighScores);
        savedHighScores.push(newScore);
        scoreList = savedHighScores;
        // sort score list by scores (high to low)
        scoreList.sort((a, b) => b.score - a.score)
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
    }
    
    showHighScores();
}

// show ranked high scores from the first screen and with submit button
var showHighScores = function() {
    mainEl.className = "main-style";
    // check if any scores stored in the storage and set them to score list
    // if not, set blank array to score list
    scoreList = localStorage.getItem("scoreList");
    if (scoreList) {
        scoreList = JSON.parse(scoreList);
    } else {
        scoreList = [];
    }
    
    // remove final score and submit form elements
    var finalScoreEl = document.querySelector(".final-score");
    if (finalScoreEl) {
        finalScoreEl.remove();
        var initialSubmitForm = document.querySelector(".flex-wrap");
        initialSubmitForm.remove();
    } else {
        instructionEl.remove();
        startEl.remove();
    }
    var viewScoresEl = document.querySelector(".view-scores");
    viewScoresEl.textContent = "";
    var countdownEl = document.querySelector("#countdown");
    countdownEl.textContent = "";

    // replace title area with "high scores"
    titleArea.innerHTML = "High scores";
    
    // create ordered list element to hold score list items
    var highScoresListEl = document.createElement("ol");
    highScoresListEl.className = "high-scores-list";
    
    // create list items until the end of the score list
    for (var i = 0; i < scoreList.length; i++) {
        var savedInitial = scoreList[i].userInitial;
        var savedScore = scoreList[i].score;

        var scoreItemEl = document.createElement("li");
        scoreItemEl.className = "score-item";
        scoreItemEl.innerHTML = savedInitial + " - " + savedScore;
        highScoresListEl.appendChild(scoreItemEl);
    }
    sectionAreaEl.appendChild(highScoresListEl);
    
    // create buttons to go back and clear high scores
    var buttonWrapperEl = document.createElement("div");
    buttonWrapperEl.className = "flex-wrap";

    var goBackBtn = document.createElement("button");
    goBackBtn.className = "secondary-btn";
    goBackBtn.innerHTML = "<a href='./index.html'>Go back</a>";
    buttonWrapperEl.appendChild(goBackBtn);

    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.className = "secondary-btn";
    clearScoresBtn.setAttribute("onclick", "clearHighScores()");
    clearScoresBtn.innerHTML = "Clear high scores";
    buttonWrapperEl.appendChild(clearScoresBtn);

    sectionAreaEl.appendChild(buttonWrapperEl);
}

// clear high scores in localStorage and remove li elements
var clearHighScores = function() {
    var scoreList = localStorage.getItem("scoreList");
    if (scoreList) {
        var clearConfirm = window.confirm("Are you sure you want to clear high scores?");
    } else {
        window.alert("No scores to clear.");
        return false;
    }
    
    // if cancelled by a user, nothing happens
    if (!clearConfirm) {
        return false;
    } else {
        scoreList = JSON.parse(scoreList);

        for (var i = 0; i < scoreList.length; i++) {
            var scoreItemEl = document.querySelector(".score-item");
            scoreItemEl.remove();
        }

        localStorage.removeItem("scoreList");
    }
}

// remove the result of the quiz(correct or wrong)
var removeResult = function() {
    var resultSection = document.querySelector("#result-section");
    if (resultSection) {
        resultSection.remove();
    }
}

// remove answers list for the quiz
var removeAnswersList = function() {
    var answersList = document.querySelector(".answer-list");
    if (answersList) {
        answersList.remove();
    }
}

startEl.addEventListener("click", startQuiz, true);
