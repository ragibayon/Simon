const buttonColors = ['red', 'green', 'blue', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let score = 0;
let highScore = 0;

// checks if the game is stated when a key is pressed
$(document).keydown(function () {
  if (!started) {
    $('#level-title').text('Level' + level);
    $('#score').text('Score: ' + score);
    setTimeout(function () {
      nextSequence();
    }, 200);

    started = true;
  }
});

// computer generated pattern for each level
const nextSequence = () => {
  userClickedPattern = []; //clear for new level

  level++;

  $('#level-title').text('Level ' + level);

  let randomNumber = getRandomNumberInt(0, 3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

//player interaction
$('.btn').click(function (e) {
  if (started) {
    let userChosenColour = $(e.currentTarget).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  // check each level's element
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      changeScore();
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  score = 0;
  gamePattern = [];
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $('.' + currentColour).addClass('pressed');
  setTimeout(() => {
    $('.' + currentColour).removeClass('pressed');
  }, 100);
}

function getRandomNumberInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function compareArrays(a, b) {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

function changeScore() {
  score++;
  $('#score').text('Score:' + score);
  if (score > highScore) {
    highScore = score;
    $('#high-score').text('High Score:' + highScore);
  }
}
