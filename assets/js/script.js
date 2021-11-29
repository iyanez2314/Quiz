const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = []
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var avaliableQuestions =[]

var questions = [
    {
        question: "Who was the first President of the United States?",
        choice1: "George Washington",
        choice2: "Thomas Jefferson",
        choice3: "Elon Musk",
        choice4: "Tom Brady",
        answer: 1,
    },
    {
        question: "What is pi?",
        choice1: "3.141",
        choice2: "I love Pie",
        choice3: "20",
        choice4: "0.1456",
        answer: 1,
    },
    {
        question: "What is wrong with the following code? <strong>Hi<strong>",
        choice1: "Nothing, It looks good to me.",
        choice2: "strong is not a element in HTML",
        choice3: "The closing tag is Missing /",
        choice4: "the S has to be capitalized",
        answer: 3,
    },
    {
        question: "Where do you babies come from?",
        choice1: "when a mommy and daddy love eachother very much... nvm",
        choice2: "storks",
        choice3: "aliens",
        choice4: "a tree",
        answer: 1,
    },
]

var SCORE_POITS = 100 
var MAX_QUESTIONS = 4

startGame = () =>{
    score = 0
    questionCounter = 0 
    avaliableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore' ,score)

        return window.location.assign('/end.html')
    }

        questionCounter ++
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

        const questionIndex = Math.floor(Math.random()* avaliableQuestions.length)
        currentQuestion = avaliableQuestions[questionIndex]
        question.innerText = currentQuestion.question

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        avaliableQuestions.splice(questionIndex, 1)
    
    acceptingAnswers = true
}

choices.forEach(choice => {
choice.addEventListener('click', e => {
    if (!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct'){
            incrementScore (SCORE_POITS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()