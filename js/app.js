
/* TODO
pull out the response into a function
add "warmer/colder" style messagings
*/

$(document).ready(function(){
	
	var answer;
	var guessNumber = 0;
	var lastGuess = null;
	newGame();
	
	$('.new').on('click', function() {
		newGame();
	});

	function newGame() {
		answer = Math.floor(Math.random() * 100+ 1);
		console.log(answer);
		$('#count').html("0");
		guessNumber = 0;
		lastGuess = null;
		$('#feedback').html("Let's play. Make your Guess!"); // set initial message
		$('.text').val(''); // Reset guess placeholder
		$('#guessList').empty(); // Empty the list of guesses
	}

	$('#guessButton').on('click', function(event) {
		event.preventDefault();
		var guess = $('.text').val();

		if (validateInput(guess)) {
			guessNumber++;
			$('#count').html(guessNumber);

			listGuesses(guess);

			guessResponse(guess, lastGuess);
		}
		lastGuess = guess;
	}); 

	function listGuesses(guess) {
		$('#guessList').append("<li>"+guess+"</li>");
	} 	

	function validateInput(guess) {
		guess = parseInt(guess, 10);
		if (guess%1===0 && guess<101 && guess>0) {
			return true;
		}
		$('#feedback').html("Please enter an integer between 1 and 100");
		return false;
	}

	function guessResponse(guess, lastGuess) {
		var currentDistance = Math.abs(guess-answer);
		var lastDistance = Math.abs(lastGuess-answer);

		// For first guess
		if (lastGuess == null) {
			if (guess<answer) {
				$('#feedback').html("Too low");
			} else if (guess>answer) {
				$('#feedback').html("Too high");
			} else {
				$('#feedback').html("You got it!");
			}
			return;
		}

		// For guesses > 1 
		if (currentDistance<5) {
			$('#feedback').html("So close!");
		} else if (currentDistance < lastDistance && guess < answer) {
			$('#feedback').html("Getting closer but too low");
		} else if (currentDistance < lastDistance && guess > answer) {
			$('#feedback').html("Getting closer but too high");
		} else if (lastDistance > currentDistance) {
			$('#feedback').html("Colder");
		} else {
			$('#feedback').html("You got it!");
		}
	}

	/*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);
	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});
});


