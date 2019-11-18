//  Trivia Game Timer








// $("#target").click(function ()) {
//   alert("You have two minutes to answer three questions");
// };
// setTimeout(gamelost, 120000);


// button.onClick = function () {

//   alert("Are you ready to play?");

// };


// //  Step 2:
// //  after 5 seconds, execute the fiveSeconds function
// //  after 10 seconds, execute the tenSeconds function
// //  after 15 seconds, execute the timeUp function

// setTimeout(fiveSeconds, 1000 * 10);
// setTimeout(tenSeconds, 1000 * 20);
// setTimeout(timeUp, 1000 * 30);

// //  Step 3:
// //  Fill in the blanks to these functions.
// function fiveSeconds () {
//   // in the element with an id of time-left add an h2 saying About 10 Seconds Left!
//   // console log 10 seconds left
//   $("#time-left").append("<h2>About 10 Seconds Left!</h2>");
//   console.log("10 seconds left");
// }

// function tenSeconds () {
//   // in the element with an id of time-left add an h2 saying About 5 Seconds Left!
//   // console log 5 seconds left
//   $("#time-left").append("<h2>About 5 Seconds Left!</h2>");
//   console.log("5 seconds left");
// }



// setTimeout(gamelost, 120000);


//  better attempt at this 

//  Variable that will hold the button alert's timeout when it is clicked.
var ButtonAlert;

//  
//  This alert will run one second after the page has loaded.
var windowTimeout = setTimeout(function () {
  alert("Hi There! Click Start Game to beging your Trivia Game!");
}, 1000);

//  Start on click.
$("#start").on("click", function () {
  //  This button to run timer for three seconds after the function is called.
  delayButtonAlert = setTimeout(function () {
    alert("Alert #2: Called 3 seconds after the start button is clicked.");
  }, 3000);
});

//  Start on click.
$("#start").on("click", function () {
  //  Set the button alert's timeout to run three seconds after the function's called.
  delayButtonAlert = setTimeout(function () {
    alert("Alert #2: Called 3 seconds after the start button is clicked.");
  }, 3000);
});

//  Start on click.
$("#start").on("click", function () {
  //  Set the button alert's timeout to run three seconds after the function's called.
  delayButtonAlert = setTimeout(function () {
    alert("Alert #2: Called 3 seconds after the start button is clicked.");
  }, 3000);
});
function timeUp () {
  // in the element with an id of time-left add an h2 saying Time's Up!

  console.log("done");
  $("#time-left").append("<h2>Time's Up!</h2>");
  console.log("time is up");
  y();
}
//  Cancel window alert on click.
$("#window-cancel").on("click", function () {
  //  Clear the timeout, and stop the window alert.
  clearTimeout(windowTimeout);
});
