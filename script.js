
const startGameBtnEl = document.querySelector(".start__quiz");
const questionsContainerEl = document.querySelector(".questions__container");
const answersContainerEl = document.querySelector(".answers__container");
const questionEl = document.querySelector(".question");
const questionMarkEl = document.querySelector(".questionMark");
const answerEl = document.querySelector(".answer");
const next__questionEl = document.querySelector(".next__question");


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
        case (performance >= 85):
            message = "Excellent, your English level is B1+ !"
            break;
    
        case (performance >= 60):
            message = "Good, your English level is B1 !"
            break;

        default:
        message = "Sorry, Your English level is A1/A2"
    }

    questionMarkEl.style.fontSize = "8rem";

    questionsContainerEl.innerHTML = 
    `
        <p class="ScoreMessage">
            Score:    ${totalCorrect} / ${totalQuestions} questions
            
        </p>
        <span class="finalMessage">${message}</span>
        <br>
        <button  class="button" onclick= window.location.reload()>Start Over</button>
    `
}



const questions = [
    {
        question: "She's married and she has three ____.",
        answers: [
            { text: "childs", correct: false },
            { text: "children", correct: true },
            { text: "child", correct: false },
            { text: "kid", correct: false }
        ]
    },
    {
        question: "I ____ a happy person.",
        answers: [
            { text: "is", correct: false },
            { text: "were", correct: false },
            { text: "are", correct: false },
            { text: "am", correct: true }
        ]
    },
    {
        question: "My brother ____ play the piano when he was 5.",
        answers: [
            { text: "was able to", correct: true },
            { text: "can't", correct: false },
            { text: "will be able to", correct: false },
            { text: "did could", correct: false }
        ]
    },
    {
        question: "Shakespeare was a famous playwright ____ wrote Romeo and Juliet.",
        answers: [
            { text: "which", correct: false },
            { text: "who", correct: true },
            { text: "when", correct: false },
            { text: "whose", correct: false }
        ]
    },
    {
        question: "I've ____ finished a really good book.",
        answers: [
            { text: "yet", correct: false },
            { text: "about", correct: false },
            { text: "just", correct: true },
            { text: "still", correct: false }
        ]
    },
    {
        question: "Lee is good ____ playing bass.",
        answers: [
            { text: "at", correct: true },
            { text: "with", correct: false },
            { text: "in", correct: false },
            { text: "on", correct: false }
        ]
    },
    {
        question: "I was so ____ to see him. He wasn't supposed to be here.",
        answers: [
            { text: "surprising", correct: false },
            { text: "surprisly", correct: false },
            { text: "surprised", correct: true },
            { text: "surprisable", correct: false }
        ]
    },
    {
        question: "Three men ____ after the incident.",
        answers: [
            { text: "was arrested", correct: false },
            { text: "arrested", correct: false },
            { text: "were arrested", correct: true },
            { text: "were being arrested", correct: false }
        ]
    },
    {
        question: "I would rather ____ home than go out",
        answers: [
            { text: "staying", correct: false },
            { text: "to stay", correct: false },
            { text: "stayed", correct: false },
            { text: "stay ", correct: true }
        ]
    },
    {
        question: "Tell me your secreat, I ____ tell anyone !",
        answers: [
            { text: "'m going to'", correct: false },
            { text: "'m not'", correct: false },
            { text: "will", correct: false },
            { text: "won't", correct: true }
        ]
    }
]