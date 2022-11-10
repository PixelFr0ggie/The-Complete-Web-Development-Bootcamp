// --- Initialization ---

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

startOver();

// --- Inputs ---

$(".btn").click(function() {

  if (started) {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }

});

$(document).keypress(function() {

  if (!started) {

    started = true;
    nextSequence();
  }

});

// --- Game Logic ---

function startOver() {

  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];

}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $('#level-title').text("Level " + level)

  var randNum = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randNum];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  }
  else
  {
    console.log("fail");

    playSound("wrong");

    var body = $("body");
    body.addClass("game-over");

    setTimeout(function() {

        body.removeClass("game-over");

        startOver();

    }, 100);

    $('#level-title').text("Game Over, Press Any Key to Restart");
  }

}

// --- Sounds & Animations ---

function playSound(name) {

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {

  var btn = $("#" + currentColour);
  btn.addClass("pressed");

  setTimeout(function() {
      btn.removeClass("pressed");
  }, 100);
}
