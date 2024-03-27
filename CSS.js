//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
// Enter Name
function returnText(){
    let input =
    document.getElementById("name").value
    alert(input)
}
//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Which of the following are the ingredients of RWD?",
        options: ["Media Queries", "Fluid Grids", "Flexible Visuals", "All of the above"],
        correct: "All of the above",
    },
    {
        id: "1",
        question: "Which of the following helps in easy navigation on a website?",
        options: ["Navigation Bar", "Header", "Footer", "None"],
        correct: "Navigation Bar",
    },
    {
        id: "2",
        question: "Navigation bar comes under _________?",
        options: ["Responsive website", "Static webpage", "Graphical User Interface", "none"],
        correct: "Graphical User Interface",
    },
    {
        id: "3",
        question: "Which of the following language gives styles to html elements?",
        options: ["CSS", "JS", "JAVA", "XML"],
        correct: "CSS",
    },
    {
        id: "4",
        question: "Which CSS property do you use to use flexbox?",
        options: ["position", "content", "box-sizing", "display"],
        correct: "display",
    },
    {
        id: "5",
        question: "Which of the following is not the valid value for flex-wrap?",
        options: ["nowrap", "reverse-wrap", "wrap", "wrap-reverse"],
        correct: "reverse-wrap",
    }, {
        id: "6",
        question: "Which of the following is the valid value for align-content property?",
        options: ["baseline", "column", "wrap", "stretch"],
        correct: "stretch",
    },
    {
        id: "7",
        question: "How many types of position values are there in CSS?",
        options: ["2", "3", "4", "5"],
        correct: "5",
    },
    {
        id: "8",
        question: "Which of the following is the default value of CSS float property?",
        options: ["left", "right", "none", "inherit"],
        correct: "none",
    },
    {
        id: "9",
        question: "which of the following CSS properties is used to position the HTML element?",
        options: ["position", "float", "clear", "display"],
        correct: "float",
    },
];
//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};