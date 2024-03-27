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
        question: "HTML is what type of language?",
        options: ["Scripting language", "Programming language", "Network Protocol language", "Markup language"],
        correct: "Markup language",
    },
    {
        id: "1",
        question: "HTML uses which of the following?",
        options: ["User Defined Tags", "Pre-specified Tags", "Fixed Tags Defined by the Language", "Tags only for Linking"],
        correct: "Fixed Tags Defined by the Language",
    },
    {
        id: "2",
        question: "The year in which HTML was Created?",
        options: ["1993", "1980", "2000", "1995"],
        correct: "1993",
    },
    {
        id: "3",
        question: "Which of the following language gives styles to html elements?",
        options: ["CSS", "JS", "JAVA", "XML"],
        correct: "CSS",
    },
    {
        id: "4",
        question: "What tag is used to display a picture in a HTML  page?",
        options: ["picture", "image", "img", "src"],
        correct: "img",
    },
    {
        id: "5",
        question: "HTML web pages can be read and rendered by?",
        options: ["Compiler", "Server", "Web Browser", "Interpreter"],
        correct: "Web Browser",
    }, {
        id: "6",
        question: "Which of the following is not a browser?",
        options: ["Microsoft's Bing", "Netscape Navigator", "Mozilla Firefox", "Opera"],
        correct: "Microsoft's Bing>",
    },
    {
        id: "7",
        question: "What is the purpose of using div tags in HTML?",
        options: ["For creating Different styles", "For creating different sections", "For adding headings", "For adding titles"],
        correct: "For creating different sections",
    },
    {
        id: "8",
        question: "Which attribute is used to name an element uniquely?",
        options: ["id", "class", "dot", "name"],
        correct: "id",
    },
    {
        id: "9",
        question: "You should save HTML files with which file extension?",
        options: [".htm", ".index", ".webpage", ".html"],
        correct: ".html",
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


