import {data} from "./data.js";

const question = document.getElementById("question")
const ansSection = document.getElementById("answers-btns")
const nextBtn = document.getElementById("next-btn")
console.log();

let currentQuestionindex = 0;
let score = 0;

function startQuiz() {
    currentQuestionindex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = data[currentQuestionindex];
    let questionNo = currentQuestionindex+1;
    question.innerHTML=questionNo+"."+currentQuestion.question;
    console.log(currentQuestion);
    

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansSection.appendChild(button)
        if (answer.isCorrect) {
            button.dataset.isCorrect=answer.isCorrect;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState() {
    nextBtn.style.display="none";
    while (ansSection.firstChild) {
        ansSection.removeChild(ansSection.firstChild)
    }
}

function selectAnswer(event){
    const choice = event.target;
    const isCorrect = choice.dataset.isCorrect==="true";
    if (isCorrect) {
        choice.classList.add("correct")
        score++;
    }else{
        choice.classList.add("incorrect")
    }
    Array.from(ansSection.children).forEach(button=>{
        if (button.dataset.isCorrect==="true") {
            button.classList.add("correct")
        }
        button.disabled=true;
    })
    nextBtn.style.display="block"
}

function showScore() {
    resetState();
    question.innerHTML=`You scored ${score} out of ${data.length}`
    nextBtn.innerHTML="Try again..."
    nextBtn.style.display="block"
}

function moveForward(){
    currentQuestionindex++;
    if (currentQuestionindex<data.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if (currentQuestionindex<data.length) {
        moveForward();
    }else{
        startQuiz();
    }
})
startQuiz();