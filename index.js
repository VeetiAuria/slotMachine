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

// Deposit feature
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");

        // Check that the number is valid; if it's not, log the error.
        const floatDeposit = parseFloat(depositAmount);
        if (isNaN(floatDeposit) || floatDeposit <= 0) {
            console.log("Invalid deposit amount, please enter a valid number.");
        } else {
            return floatDeposit;
        }
    }
};

// Amount of lines feature
const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");

        // Check that the number is valid; if it's not, log the error.
        const numberOfLines = parseFloat(lines);
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, please enter a number between 1 and 3.");
        } else {
            return numberOfLines;
        }
    }
};

// Amount of bet feature
const amountOfBet = (balance, lines) => {
    while (true) {
        const bet = prompt(`Enter the bet per line (max ${balance / lines}): `);

        // Check that the number is valid; if it's not, log the error.
        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet amount, please enter a valid number.");
        } else {
            return numberBet;
        }
    }
};

// Spin feature
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbolsCount)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < cols; i++) {
        reels.push([]);
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

// Modify the reels and rows to linear way.
const transpose = (reels) => {
    const rows = [];

    const numRows = reels.length;
    const numCols = reels[0].length;

    for (let i = 0; i < numCols; i++) {
        rows.push([]);
        for (let j = 0; j < numRows; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};

// Function to check if all symbols in a row are the same
const areSymbolsSame = (symbols) => {
    return symbols.every(symbol => symbol === symbols[0]);
}

// Check if user has won and give his winnings
const getWinnings = (rows, bet) => {
    let winnings = 0;

    for (const symbols of rows) {
        if (areSymbolsSame(symbols)) {
            winnings += bet * symbolValues[symbols[0]];
        }
    }

    return winnings;
}

// Print rows with the upward line
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i !== row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

// Game logic
const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of €" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = amountOfBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows1 = transpose(reels);
        printRows(rows1);
        const winnings = getWinnings(rows1, bet);
        balance += winnings;
        console.log("You won €" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n) ?");

        if (playAgain != "y") break;
    }
}

game();





