// ====== DOM Element Selection ======
const choices = document.querySelectorAll(".choice");
const userScoreEl = document.querySelector("#user-score");
const compScoreEl = document.querySelector("#comp-score");
const messageEl = document.querySelector(".msg");
const resetBtn = document.querySelector("#reset"); // <- RESET button

// ====== Score Tracking Variables ======
let userScore = 0;
let compScore = 0;

// ====== Get Computer's Choice Randomly ======
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// ====== Display Draw Result ======
function handleDraw() {
  messageEl.innerText = "It's a Draw! You both picked the same.";
  messageEl.style.boxShadow = "0 0 15px gray";
}

// ====== Display Winner Result ======
function handleWinner(userWins, userChoice, compChoice) {
  if (userWins) {
    userScore++;
    userScoreEl.innerText = userScore;
    messageEl.innerText = `You Win! ${capitalize(userChoice)} beats ${capitalize(compChoice)}.`;
    messageEl.style.boxShadow = "0 0 15px green";
  } else {
    compScore++;
    compScoreEl.innerText = compScore;
    messageEl.innerText = `You Lose! ${capitalize(compChoice)} beats ${capitalize(userChoice)}.`;
    messageEl.style.boxShadow = "0 0 15px red";
  }
}

// ====== Capitalize First Letter Helper ======
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// ====== Determine Winner Logic ======
function checkWinner(userChoice, compChoice) {
  if (userChoice === compChoice) {
    handleDraw();
    return;
  }

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const userWins = winConditions[userChoice] === compChoice;
  handleWinner(userWins, userChoice, compChoice);
}

// ====== Main Game Function ======
function playGame(userChoice) {
  const compChoice = getComputerChoice();
  checkWinner(userChoice, compChoice);
}

// ====== Event Listeners for Choices ======
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    playGame(userChoice);
  });
});

// ====== Reset Button Logic ======
resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScoreEl.innerText = userScore;
  compScoreEl.innerText = compScore;
  messageEl.innerText = "Play Your Move";
  messageEl.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.5)";
});
