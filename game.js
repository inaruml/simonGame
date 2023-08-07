let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

// What to do when user presses keyboard key for the first time
// 1. if a keypress is detected anywhere in the doc, call func
// 2. if the game didn't start (gameHasStarted is false), call nextSequence and flip the var to true

let gameHasStarted = false; // to determine the state of game
let level = 0;

$(document).keypress(function () {
  if (!gameHasStarted) {
    nextSequence();
    $("#level-title").text("Level " + level);
    gameHasStarted = true;
  }
});

// What to do when a user clicks a button
// 1. the id of the button (button color) is saved to userChosenColor
// 2. the userChosenColor is pushed to userClickedPattern array, which holds on the user clicks for 1 sequence
// 3. the playSound func will trigger with the parametr of for e.g. "green"
// 4. the animatePress func will trigger -//-
// 5. checkAnswer will be called with the index of the last answer chosen by user
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// The Game logic no. 1
// 1. generates random number from 0-3
// 2. chosen number is used to determine the position of buttonColors arr that holds the colors
// 3. the previous action is saved to randomChosenColour
// 4. randomChosenColour is pushed into gamePattern arr which holds the sequence for 1 game

// 5. the button of the randomly generated color is selected
// 6. is made to "flash"

// 7. selects the corresponding button sound and plays it

function nextSequence() {
  // resets the array of the userClickedPattern for a new level

  userClickedPattern = [];

  // increases the level each time nextSequence is called

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
// The Game logic no. 2
// 1. checkAnswer will be called with the last index from the userClickedPattern (the btn the user pressed last)
// 2. the index will be passed as the currentLevel param and if the btn clicked matches the one the game picked, then the rest of the pattern
// is checked if it matches by the lenght of it and if yes, then call the nextSequence() with a 1000ms delay
// 3. if the last index doesn't match the pressed btn, then wrong :(

function checkAnswer(currentLevel) {
  // What to do when user gets it RIGHT
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // What to do, when user gets it WRONG

    // plays wrong audio
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    // adds and removes class after 1000ms with red bg
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // changes the h1 title
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // calls the startOver func
    startOver();
  }
}

// Button sound when clicked
// plays the sound of the corresponding button that is clicked by the user
// when user clicks (above), the func will be triggered with parameter for e.g. "green"
// this will be used as name and trigger the corresponding sound

function playSound(name) {
  $("#" + name)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation when a button is pressed
// when a btn is pressed (above), this func is triggered with for e.g. "green" param
// it will add a pressed class from styles.css

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100); // will remove the class after a second
}

// func that gets called if the user gets an answer wrong
// 1. resets the values of level, gamePattern and resets the game start to false
function startOver() {
  level = 0;
  gamePattern = [];
  gameHasStarted = false;
}
