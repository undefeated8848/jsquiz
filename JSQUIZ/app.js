import data from './data.js';

const questionElement = document.querySelector("h2");
const optionList = document.querySelector(".unorderlist");
const nextBtn = document.querySelector('.btn');

let currentQuestion = 0;
let score = 0;

//function to load each question
function loadQuestion(){
    const current = data[currentQuestion];
    questionElement.textContent = `Q${current.id}.${current.question}`;

    //clear old options
    optionList.innerHTML = '';

    //add option dynamically
    for(let i = 1; i<=4; i++){
        const li = document.createElement("li");
        li.textContent = current[`option${i}`];
        li.addEventListener('click', ()=> selectAnswer(li,current.ans));
        optionList.appendChild(li)
    }
}

//function to handle answer selection

function selectAnswer(selectedLi, correctAnswer){
    const allOptions = document.querySelectorAll(".unorderlist li");
    allOptions.forEach(li => li.computedStyleMap.pointerEvents = 'none');

    if(selectedLi.textContent === correctAnswer){
        selectedLi.style.backgroundColor = 'green';
        score++;
    }else{
        selectedLi.style.backgroundColor = 'red'
    }
}

//handle next button click

nextBtn.addEventListener('click', ()=>{
    currentQuestion++;
    if(currentQuestion < data.length){
        loadQuestion();
    }
    else{
        showResult();
    }
})

function showResult(){
    document.querySelector('.quiz-container').innerHTML = `
     <h2>You Scored ${score} out of ${data.length}!</h2>
     <button onClick='location.reload()'>Play Again</button>
    `
}
loadQuestion();//load the first question