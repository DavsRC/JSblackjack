let option = 0;

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