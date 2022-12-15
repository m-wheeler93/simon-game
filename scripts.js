const colors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;
let userPattern = [];
let pattern = [];

// START GAME
$("#start").click(function () {
	started = true;
	newSequence();
	$("#start").attr("disabled", "true");
});

// COLOR AUDIO
function colorSound(color) {
	let audio = new Audio(`sounds/${color}.mp3`);
	audio.play();
}

// FLASH ANIMATION
function animateFlash(currentColor) {
	$(`#${currentColor}`).fadeOut(100);
	$(`#${currentColor}`).fadeIn(100);
}

// NEXT COLOR, RESET USER PATTERN, ANIMATE, SOUND
function newSequence() {
	let randomNumber = Math.floor(Math.random() * 4);
	let randomColor = colors[randomNumber];

	userPattern = [];

	pattern.push(randomColor);

	animateFlash(randomColor);
	colorSound(randomColor);

	level += 1;
	$("#level").text(level);
}

// PLAYER CHOOSE COLOR, ADD TO USER PATTERN, ANIMATE, SOUND
$(".game-square").click(function () {
	let chosenColor = this.id;
	userPattern.push(chosenColor);

	checkSequence(userPattern[userPattern.length - 1]);

	animateFlash(chosenColor);
	colorSound(chosenColor);
});

// CHECK ANSWER AGAINST SEQUENCE
function checkSequence(currentLevel) {
	currentLevel = 0;
	if (userPattern[currentLevel] === pattern[currentLevel]) {
		currentLevel += 1;

		if (userPattern.length === pattern.length) {
			setTimeout(function () {
				newSequence();
			}, 1000);
		}
	} else {
		let gameOverSound = new Audio("sounds/wrong.mp3");
		gameOverSound.play();

		$("body").addClass("game-over");

		$("#title").text("Game Over, refresh the page to play again!");

		restart();
	}
}
