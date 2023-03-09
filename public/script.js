

const startButton = document.getElementById('start')
const nextButton = document.getElementById('next')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
let shuffledQuestions, currentQuestionIndex

const answerButtonElement = document.getElementById('answer-buttons')

startButton.addEventListener('click', StartTrivia)

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNext()
})

const questions = [
  {
    q: 'What did the bride steal from the orderly after she killed him?',
    answers: [
      { text: 'Car', correct: true },
      { text: 'Phone', correct: false },
      { text: 'Watch', correct: false },
      { text: 'Dress', correct: false },
    ],
  },
  {
    q: 'Actual name of the bride is ?',
    answers: [
      { text: 'Ellie', correct: false },
      { text: ' Beatrix Kiddo.', correct: true },
      { text: 'Mamba', correct: false },
      { text: 'Athena', correct: false },
    ],
  },
  {
    q: ' Who was first on her hit list?',
    answers: [
      { text: 'Bill', correct: false },
      { text: 'Vernita', correct: false },
      { text: ' O-Ren Ishii', correct: true },
      { text: 'Budd', correct: false },
    ],
  },
  {
    q: 'What is the name of the truck bride drives?',
    answers: [
      { text: 'Black Mamba', correct: false },
      { text: 'Bill', correct: false },
      { text: 'kiddo', correct: false },
      { text: 'Pussy Wagon', correct: true },
    ],
  },
  {
    q: 'What was her daughers name?',
    answers: [
      { text: 'CC', correct: false },
      { text: 'Emma', correct: false },
      { text: 'Kiddo', correct: false },
      { text: 'BB', correct: true },
    ],
  },
]

function StartTrivia() {
  console.log('started')
  startButton.classList.add('hide')
  questionContainer.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  setNext()
}

function setNext() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.q

  question.answers.forEach((answer) => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('button')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonElement.appendChild(button)
  })
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

//Tone analyzer api call

const url = 'https://text-sentiment.p.rapidapi.com/analyze';
const data = new URLSearchParams()
const text = "very Bad, I hate it. It gives me negative vibes. so violent"
data.append('text', text)


const boxes = document.querySelector('.boxes');
const divs = boxes.querySelectorAll('div');

divs.forEach((div) => {
  const data = `text=${div.textContent}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'c8980e1c1emsh72c7690daa82591p1fcdbbjsn6bfd8e716d4a',
      'X-RapidAPI-Host': 'text-sentiment.p.rapidapi.com'
    },
    body: data,
  })
    .then(response => response.json())
    .then(data => {
      if (data.pos > data.neg) {
        div.style.backgroundColor = '#019E69';
      } else {
        div.style.backgroundColor = ' #EE2708';
      }
      console.log(data);
    })
    .catch(error => console.error(error));
});




