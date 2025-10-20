var buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;


//detecting keyboard press to start the game
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }   
});

//detecting button click
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//detecting keyboard press to start the game
function nextSequence() {
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // play the full sequence (old + new)
    playSequence();
}

//function to play the whole sequence
function playSequence() {
    userClickedPattern = []; // reset user input for the new level

    var i = 0;
    var interval = setInterval(function() {
        var currentColour = gamePattern[i];
        $("#" + currentColour).fadeIn(200).fadeOut(200).fadeIn(200);
        playSound(currentColour);
        i++;
        if (i >= gamePattern.length) {
            clearInterval(interval);
        }
    }, 600); // adjust delay for pacing
}
   
//function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function to animate button when clicked
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

//   set a timeout to remove the class after 100 milliseconds
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//function to check the answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }   
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//function to restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}





   
