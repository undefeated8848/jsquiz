import data from './data.js'; // 👈 make sure the path is correct

const questionElement = document.querySelector('h2');
const optionsList = document.querySelector('.unorderlist');
const nextBtn = document.querySelector('.btn');

let currentQuestion = 0;
let score = 0;

// Function to load each question 
function loadQuestion() {
  const current = data[currentQuestion];
  questionElement.textContent = `Q${current.id}. ${current.question}`;

  // Clear old options
  optionsList.innerHTML = '';

  // Add options dynamically
  for (let i = 1; i <= 4; i++) {
    const li = document.createElement('li');
    li.textContent = current[`option${i}`];
    li.addEventListener('click', () => selectAnswer(li, current.ans));
    optionsList.appendChild(li);
  }
}

// Function to handle answer selection
function selectAnswer(selectedLi, correctAnswer) {
  const allOptions = document.querySelectorAll('.unorderlist li');
  allOptions.forEach(li => li.style.pointerEvents = 'none'); // disable clicks

  if (selectedLi.textContent === correctAnswer) {
    selectedLi.style.backgroundColor = 'green';
    score++;
  } else {
    selectedLi.style.backgroundColor = 'red';
  }
}

// Handle next button click
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < data.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector('.quiz-container').innerHTML = `
    <h2>You scored ${score} out of ${data.length}!</h2>
    <button onclick="location.reload()">Play Again</button>
  `;
}

loadQuestion(); // Load the first question
