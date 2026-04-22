//Global variables

let buttonColour = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
bestScore = Number(bestScore);

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

}

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)

});

function playSound(name) {
    let audio = new Audio("/sounds/" + name + ".mp3")
    audio.play()

}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed")
    }, 100)
}

$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("level" + level);
        nextSequence();
        started = true
    }
})

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
        let wrong = new Audio("/sounds/wrong.mp3")
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over")

        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        starOver()

        console.log("wrong")
    }
}


function starOver() {
    level = 0;                      // yo se que aqui limpiamos todo variables para cuando el usuario pierda, se reinicie todo 
    gamePattern = [];
    started = false;
    userClickedPattern = [];

}