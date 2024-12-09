// script.js
let score = 0;
let timer = 30;
let currentAnswer;
let timerInterval;

// Elementos do DOM
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");

// Função para gerar uma nova pergunta
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  currentAnswer = eval(`${num1} ${operation} ${num2}`);
  questionElement.textContent = `${num1} ${operation} ${num2}`;
}

// Função para verificar a resposta do jogador
function checkAnswer() {
  const playerAnswer = parseInt(answerInput.value);
  if (playerAnswer === currentAnswer) {
    feedbackElement.textContent = "Correto! 🎉";
    feedbackElement.style.color = "green";
    score++;
  } else {
    feedbackElement.textContent = "Errado! 😞";
    feedbackElement.style.color = "red";
  }
  scoreElement.textContent = score;
  answerInput.value = "";
  generateQuestion();
}

// Função para iniciar o cronômetro
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    if (timer === 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Função para finalizar o jogo
function endGame() {
  questionElement.textContent = "Fim de jogo!";
  feedbackElement.textContent = `Sua pontuação final: ${score}`;
  submitButton.style.display = "none";
  restartButton.style.display = "block";
}

// Função para reiniciar o jogo
function restartGame() {
  score = 0;
  timer = 30;
  scoreElement.textContent = score;
  timerElement.textContent = timer;
  feedbackElement.textContent = "";
  submitButton.style.display = "block";
  restartButton.style.display = "none";
  generateQuestion();
  startTimer();
}

// Inicializa o jogo
generateQuestion();
startTimer();

// Eventos
submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartGame);
