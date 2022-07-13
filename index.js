const Player = require('./src/player');
const CardDeck = require('./src/cardDeck');
var prompt = require('prompt-sync')();

let players = [];
let gameCards = [];
let option = 0;
let cardDeck = new CardDeck();
cardDeck.createCardDeck();
let score = 0;
let aceDecisionPlayer;

function mainMenu(){

    do {
        console.log("Wolcome To this Game of Blackjack\n")
        console.log("1. Select to create a player")
        console.log("2. You arleady exist? So select to continue")
        console.log("0. Leave.\n")
        option = prompt('Enter number of the option selected to continue: ');
        options(option);
    } while (option != 0);    

}

function options(userOption){

    console.log("///////////////////");

    switch(userOption){
        case "1":
            createPlayer();
            break;
        case "2":
            startGame();
            break;
        case "0":
            console.log("See you next time")
            break;
        default:
            console.log("Please choose a valid option");
            break;
    };
  
    console.log("///////////////////");
}

function createPlayer(){
    let idPlayer = prompt('Player ID: ');
    let playerName = prompt('Player Name: ');

    let newPlayer = new Player({
        id: idPlayer,
        name: playerName,
        prize: 0
    });
    players.push(newPlayer);

    console.log("\nNow You are a Player, Good Luck!\n")
}

function startGame(){
    let idPlayer = prompt('Please enter player ID to start the game: ');
    let decision = true;

    if (validatePlayer(idPlayer)) {
        let player = searchPlayer(idPlayer);
        console.log("\nWellcome " + player.name + "Good Luck in your game\n");

        player.prize = 0;

        do {
            let gameResult = playGame();
            if (gameResult === "You win") {
                player.prize += 1000;
                decision = validateDecisionContinue();
            }else{
                decision = false;
            }
            
        } while (decision);
        console.log("\nGame ended. Total cash: " + player.prize + " USD." );
    }else{
        console.log("Caution!!! The id entered is not registered. go to option 1 to create a new player and then come back.\n")
    }
}

function playGame(){

    gameCards = [];
    score = 0;
    let gameStatus = "Continue";

    console.log("Starting New Game\n")
  
    do {
        let cardGame = drawCardGame();
        console.log("You got the card: " + cardGame.name + " of " + cardGame.suit);
        if (cardGame.name === "Ace") {
            score += Number(validateAceDecision());
        }
        score += cardGame.value;
        console.log("New score is: " + score);
        gameStatus = validateScore(score);
        if (gameStatus === "Continue") {
            console.log("\nNext card ")
        }
    } while (gameStatus === "Continue" );
  
    if (gameStatus === "win") {
        console.log("\n Niceeee! you win! Your Prize for this game is 1,000 USD.\n")
        return gameStatus;
    }else{
        console.log("\n You lost, good luck next time :(\n")
        return gameStatus;
    }

}

function validateDecisionContinue(){
    let decision = prompt("Choose if you wanto to continue playing? Select Y/N : ");
    decision = decision.toUpperCase();
    if(decision ===  "Y"){
        return true;
    }else if(decision === "N"){
        return false
    }else{
        validateDecisionContinue();
    }
}

function validatePlayer(idPlayer){
    return players.some(player => player.id === idPlayer)
}

function searchPlayer(idPlayer){
    let player = players.filter(player => player.id === idPlayer);
    return player[0];
}

function drawCard(){
    let newCardIndex = Math.floor(Math.random() * cardDeck.cards.length);
    let newCard = cardDeck.cards[newCardIndex];
    return newCard;
}

function drawCardGame(){
    let cardGame = drawCard();

    if (gameCards.some(card => card.name === cardGame.name)) {
        drawCardGame();
    }
    gameCards.push(cardGame);
    return cardGame;
}

function validateAceDecision(){
    aceDecisionPlayer = prompt('Select the value you want for the ACE card: ');

    switch (aceDecisionPlayer) {
        case "1":
            return 1;
        case "11":
            return 11;
        default:
            console.log('Read again, select one option: ')
            validateAceDecision();
    }

}

function validateScore(score){
    if (score >= 18 && score <=21) {
        return "WIN";
    }else if(score > 21){
        return "LOSE"
    }
    return "Continue";
  }

mainMenu();