
//Global variables
let buttonColour = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
bestScore = Number(bestScore);

// Show saved best score when the page loads
$("#best-score").text("Best Score: " + bestScore);


// Generates the next step in the sequence
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    // Update best score if current level is higher
    if (level > bestScore) {
        bestScore = level;
        localStorage.setItem("bestScore", bestScore);
        $("#best-score").text("Best Score: " + bestScore);
    }

}

// Handles button clicks from the player
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)

});

// Plays the sound for a given color name
function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3")
    audio.play()

}

// Adds a short pressed effect to a button
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed")
    }, 100)
}

// Starts the game when any key is pressed
$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("level" + level);
        nextSequence();
        started = true
    }
})

// Checks whether the player's answer is correct
function checkAnswer(currentLevel) {
    let userAnwser = userClickedPattern[currentLevel];
    let gameAnwser = gamePattern[currentLevel];

    if (userAnwser === gameAnwser) {
        console.log("log")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence()
            }, 1000)


        }

    } else {
        let wrong = new Audio("./sounds/wrong.mp3")
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over")

        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()

        console.log("wrong")
    }
}

// Resets all game variables after losing
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];

}