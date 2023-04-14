const readline = require("readline");
console.log("hi");
//user choice
const getUserChoice = userInput => {
    userInput = userInput.toLowerCase().trim();
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
      return userInput;
    } else {
      console.log('error');
    }
  };


//computer choice
const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "rock";
      break;
    case 1:
      return "paper";
      break;
    case 2:
      return "scissors";
      break;
    default:
      return "try  again";
  }
};
console.log(getComputerChoice());
//determine winner
const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "This is a tie!";
  } else if (userChoice === "rock" && computerChoice === "paper") {
    return "Computer wins!";
  } else if (userChoice === "paper" && computerChoice === "rock") {
    return "You win!";
  } else if (userChoice === "scissors" && computerChoice === "paper") {
    return "You win!";
  } else if (userChoice === "paper" && computerChoice === "scissors") {
    return "Computer wins!";
  } else if (userChoice === "rock" && computerChoice === "scissors") {
    return "You win!";
  } else if (userChoice === "scissors" && computerChoice === "rock") {
    return "Computer wins!";
  } else {
    return "Invalid input!";
  }
};
// Get user input using readline
function getUserInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("please enter user input:rock,scissors,paper", (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}
//play a game og Rock-Paper-Scissors
async function playGame() {
  const userChoice = getUserChoice(await getUserInput());
  const computerChoice = getComputerChoice();
  console.log("You threw: " + userChoice);
  console.log("The computer threw: " + computerChoice);
  console.log(determineWinner(userChoice, computerChoice));
}

playGame();
