// Trivia Game

$(document).ready(function() {
  // Event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);
});

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 90, // Increased timer to 90 seconds
  timerOn: false,
  timerId: '',

  // Questions, options, and answers
  questions: {
    q1: "How many colors are there in a rainbow?",
    q2: "What is the only rock regularly eaten by humans?",
    q3: "What is the World's largest ocean?",
    q4: "What was the first toy ever advertised on TV?"
  },

  options: {
    q1: ["Six", "Five", "Seven", "Ten"],
    q2: ["Chocolate rocks", "Salt", "Fudge rocks", "Punk rock"],
    q3: ["Atlantic", "Arctic", "Pacific", "Indian"],
    q4: ["Barbie", "Legos", "Mr. Potato Head", "Teddy Bear"]
  },

  answers: {
    q1: 'Seven',
    q2: 'Salt',
    q3: 'Pacific',
    q4: 'Mr. Potato Head'
  },

  // Start game
  startGame: function() {
    // Restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // Show game section
    $('#game').show();

    // Empty last results
    $('#results').html('');

    $('#timer').text(trivia.timer);

    // Remove start button
    $('#start').hide();

    $('#remaining-time').show();

    // Ask question
    trivia.nextQuestion();
  },

  // Display questions and options
  nextQuestion: function() {
    // Set timer per question
    trivia.timer = 45; // Increased time per question to 45 seconds
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // Get the current question
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    // Get options for the question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // Add options to HTML
    $.each(questionOptions, function(index, key) {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    });
  },

  // Timer countdown
  timerRunning: function() {
    // If timer still has time left and there are still questions left to ask
    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }
    // Out of time
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Sorry, you are out of time! The answer is ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }
    // If all questions have been shown, end the game and show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      // Add game results
      $('#results').html('<h3>Thanks for playing!</h3>' +
        '<p>Correct: ' + trivia.correct + '</p>' +
        '<p>Incorrect: ' + trivia.incorrect + '</p>' +
        '<p>Unanswered: ' + trivia.unanswered + '</p>' +
        '<p>Click to play again!</p>');

      // Hide game section
      $('#game').hide();

      // Show start button to begin a new game
      $('#start').show();
    }
  },

  guessChecker: function() {
    // Game result setTimeout
    var resultId;

    // The answer to the question
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // If the answer is correct
    if ($(this).text() === currentAnswer) {
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 2000); // Increased time to display the correct answer to 2 seconds
      $('#results').html('<h3>Great! Correct answer!</h3>');
    }
    // Wrong answer
    else {
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 2000); // Increased time to display the correct answer to 2 seconds
      $('#results').html('<h3> No, better luck next time!<br><br> The correct answer is: ' + currentAnswer +  '</h3>');
    }
  },

  // Remove previous question
  guessResult: function() {
    // Next question
    trivia.currentSet++;

    // Remove options and results
    $('.option').remove();
    $('#results h3').remove();

    trivia.nextQuestion();
  }
};
