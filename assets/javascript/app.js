//  Trivia Game

$(document).ready(function ()
{

  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {

  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 90,
  timerOn: false,
  timerId: '',


  // questions, options and answers

  questions: {
    q1: "How many colors are there in a rainbow?",
    q2: "What is the only rock regularly eaten by humans?",
    q3: "What is the Worlds largest ocean?",
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
  //Start game
  startGame: function ()
  {
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // show game section
    $('#game').show();

    //  empty last results
    $('#results').html('');

    $('#timer').text(trivia.timer);

    // remove start button
    $('#start').hide();

    $('#remaining-time').show();

    // ask question
    trivia.nextQuestion();

  },
  //  display questions and options
  nextQuestion: function ()
  {

    // set timer per question
    trivia.timer = 30;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);


    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // gets all the questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    //  options for the question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // options to  html
    $.each(questionOptions, function (index, key)
    {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

  },
  // Timer Countdown
  timerRunning: function ()
  {
    // if timer still has time left and there are still questions left to ask
    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }
    // out of time
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Sorry you are Out of time! The answer is ' + " " + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }
    // if all the questions have  shown end the game, show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      // adds results of game
      $('#results')
        .html('<h3>Thanks for playing!</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unanswered: ' + trivia.unanswered + '</p>' +
          '<p>Click to play again!</p>');

      // hide game section
      $('#game').hide();

      // show start button to begin a new game
      $('#start').show();
    }

  },

  guessChecker: function ()
  {

    // gameResult setTimeout
    var resultId;

    // the answer to the  question
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // if answer is right, add correct
    if ($(this).text() === currentAnswer) {

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Great Correct Answer!</h3>');
    }
    // wrong answers
    else {

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>No, Better luck next time! ' + currentAnswer + '</h3>');
    }

  },
  //remove previous question
  guessResult: function ()
  {
    // next question
    trivia.currentSet++;

    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();

    trivia.nextQuestion();

  }

}