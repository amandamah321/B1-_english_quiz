
const startGameBtnEl = document.querySelector(".start__quiz");
const questionsContainerEl = document.querySelector(".questions__container");
const answersContainerEl = document.querySelector(".answers__container");
const questionEl = document.querySelector(".question");
const questionMarkEl = document.querySelector(".questionMark");
const answerEl = document.querySelector(".answer");
const next__questionEl = document.querySelector(".next__question");
const scoreEl = document.querySelector(".score");


let currentQuestionIndex = 0
let totalCorrect = 0


startGameBtnEl.addEventListener("click" , startGame)
next__questionEl.addEventListener("click", displayNextQuestion)

function startGame() {
    startGameBtnEl.classList.add("hide")
    questionsContainerEl.classList.remove("hide")
    questionMarkEl.style.fontSize = "3rem";

    displayNextQuestion()
}

function displayNextQuestion() {

    resetState()
    
    if (questions.length == currentQuestionIndex) {
       return finishGame()
    }


    questionEl.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answers => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answers")
        newAnswer.textContent = answers.text
        if (answers.correct) {
            newAnswer.dataset.correct = answers.correct
        }
        answersContainerEl.appendChild(newAnswer)

        newAnswer.addEventListener('click' , selectAnswer)
    })

    displayScore()

}

function displayScore() {

    scoreEl.innerHTML = `${currentQuestionIndex + 1} / ${questions.length}`
    
}

function resetState() {

    while (answersContainerEl.firstChild) {
        answersContainerEl.removeChild(answersContainerEl.firstChild)
    }

    document.body.removeAttribute("class")
    next__questionEl.classList.add("hide")

}

function selectAnswer(event) {
    const answerCliked = event.target

    if (answerCliked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++

    } else {
        document.body.classList.add("incorrect")
    }
    
    document.querySelectorAll(".answers").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })
    
    next__questionEl.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestions = questions.length
    const performance = Math.floor(totalCorrect *100 / totalQuestions)

    let message = ""

    switch (true) {
        case (performance >= 60):
            message = "Excellent, you know a lot about recycling and environment !"
            break;
    
        case (performance >= 40):
            message = "Your knowledge is ok, but you should study a bit more !"
            break;

        default:
        message = "Study about recycling and environment !"
    }

    scoreEl.remove();

    questionMarkEl.style.fontSize = "8rem";

    questionsContainerEl.innerHTML = 
    `
        <p class="ScoreMessage">
            Score:    ${totalCorrect} / ${totalQuestions} questions
            
        </p>
        <span class="finalMessage">${message}</span>
        <br>
        <button  class="button" onclick= window.location.reload()>Start Over</button>
        <p>
        <a class='link' href="https://www.greenpeace.org/usa/">Learn more about recycling</a>
        </p>
    `
}



const questions = [
    {
        question: "How long does it take for a plastic bottle to decompose?",
        answers: [
            { text: "300 years", correct: false },
            { text: "450 years", correct: true },
            { text: "10 years", correct: false },
            { text: "105 years", correct: false }
        ]
    },
    {
        question: "What country has the best recycling rate in the world ?",
        answers: [
            { text: "Japan", correct: false },
            { text: "USA", correct: false },
            { text: "Brazil", correct: false },
            { text: "Germany", correct: true }
        ]
    },
    {
        question: "What is the green recycling bin for in the UK ?",
        answers: [
            { text: "Glass", correct: true },
            { text: "Cartoon", correct: false },
            { text: "Paper", correct: false },
            { text: "Books", correct: false }
        ]
    },
    {
        question: "What part of a computer is the most difficult to recycle ?",
        answers: [
            { text: "Screen", correct: false },
            { text: "Battery", correct: true },
            { text: "Mouse", correct: false },
            { text: "keyboard", correct: false }
        ]
    },
    {
        question: "What is the advantage of recycling ?",
        answers: [
            { text: "Spend less time taking the garbage out", correct: false },
            { text: "Avoid wasting water", correct: false },
            { text: "Create a healthier planet for ourselves and future generations", correct: true },
            { text: "There is no advantage", correct: false }
        ]
    },
    {
        question: "How much waste is generated per person per day?",
        answers: [
            { text: "740 grams", correct: true },
            { text: "2 kilograms", correct: false },
            { text: "1 ton", correct: false },
            { text: "5 kiligrams", correct: false }
        ]
    },
    {
        question: "What is the most recycled material in the world ?",
        answers: [
            { text: "paper and carton", correct: false },
            { text: "water", correct: false },
            { text: "Iron and steel", correct: true },
            { text: "glass and food", correct: false }
        ]
    }
]