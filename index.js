// Deposit some money
// Determine number of lines to bet on 
// Collect a bet amount
// Spin the slot
// Check if the user won
// Give user their winnings or collect their bet
// Play again

const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;

const symbolsCount = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const symbolValues = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};


const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const floatDeposit = parseFloat(depositAmount);

        // Check that the number is valid; if it's not, log the error.
        if (isNaN(floatDeposit) || floatDeposit <= 0) {
            console.log("Invalid deposit amount, try again!");
        } else {
            return floatDeposit;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        // Check that the number is valid; if it's not, log the error.
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid amount of lines, try again!");
        } else {
            return numberOfLines;
        }
    }
};

const amountOfBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line ");
        const numberBet = parseFloat(bet);

        // Check that the number is valid; if it's not, log the error.
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again!");
        } else {
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbolsCount)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];
    for (let i = 0; i < cols; i++) {
        const reelSymbols = [...symbols];
        for (let y = 0; y < rows; y++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};


const reels = spin();
console.log(reels);
let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = amountOfBet(balance, numberOfLines);





