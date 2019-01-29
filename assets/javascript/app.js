$(document).ready(function() {
  // time variables to be used in a recurring question timer
  var intervalId;
  var time = 30;
  // the number variable will be used to select question objects from an array to be displayed(see bottom)
  var number = 0;
  // variable for question's correct answer number and users selected answer
  var correctAnswer;
  var selectedAnswer;
  var displayAnswer;
  // variables for logging incorrect and correct answers
  var correct = 0;
  var incorrect = 0;

  // the functions for the game are stored in the game object below
  var game = {
    start: function() {
      // hit start button to display first question and begin timer, timer button is removed to prevent
      // multiple intervals after clicked (see click event directly below "game" object)
      game.questionSelect(questionArray[number]);
      intervalId = setInterval(game.count, 1000);
      $("#game-result").hide();
    },

    count: function() {
      // start the timer and display time remainging on page
      time--;
      $("#timer").text(time);
      if (time === 0) {
        // if timer hits zero then move on to next question
        game.result();
      }
    },

    // nextQuestion function will do three things:
    // 1. reset the timer
    // 2. after a choice has been made OR time expires: display the correct answer for five seconds,
    //    and show if the user was correct or incorrect
    // 3. move to the next question, after displaying the results from 2, and begin the timer
    nextQuestion: function() {
      // reset timer
      clearInterval(intervalId);
      time = 30;
      $("#timer").text(time);
      // increase questionArray selector by one to select next question
      number++;
      if (number < questionArray.length) {
        // if there are still question objects in the question array then display the question and begin the timer
        game.questionSelect(questionArray[number]);
        game.start();
      } else {
        // if all questions have been answered the reset function is called and results are displayed
        game.hide();
        $("#game-result").show();
        $("#game-result").text(
          "Game Over! You got " +
            correct +
            " questions correct! You got " +
            incorrect +
            " questions wrong. :("
        );
        setTimeout(function() {
          game.reset();
        }, 5000);
      }
    },

    questionSelect: function(question) {
      // input the next question from the questionArray, display question and answers on the page, and store the correct answer id in a variable
      $("#question-header").text(question.question);
      $("#answer1").text(question.answer1);
      $("#answer2").text(question.answer2);
      $("#answer3").text(question.answer3);
      $("#answer4").text(question.answer4);
      displayAnswer = question.correctAnswer.textContent;
      correctAnswer = $(question.correctAnswer).attr("id");
    },

    // used to hide the given question and choices when not on display
    hide: function() {
      $("#question-container").hide();
    },

    // used to show the given question and choices to be put on display
    show: function() {
      $("#question-container").show();
    },

    // take user input from click event and test if it is right, wrong, or if time expires. Log results in correct/incorrect variable then setTimeout function
    // display results and correct answer before moving to next question.
    result: function(selectedAnswer) {
      clearInterval(intervalId);
      game.hide();
      $("#game-result").show();
      if (time === 0) {
        incorrect++;
        $("#game-result").text(
          "You ran out of time. :(  The correct answer is: " + displayAnswer
        );
      } else if (selectedAnswer === correctAnswer) {
        correct++;
        $("#game-result").text(
          "The correct answer is: " +
            displayAnswer +
            ". Congratulations! You got it right!!!"
        );
      } else if (selectedAnswer !== correctAnswer) {
        incorrect++;
        $("#game-result").text(
          "The correct answer is: " + displayAnswer + ". You got it wrong. :("
        );
      }
      setTimeout(function() {
        game.show();
        game.start();
        game.nextQuestion();
      }, 5000);
    },

    // reset function that will reset the game after completion
    reset: function() {
      $("#start").show();
      $("#game-result").hide();
      game.hide();
      number = 0;
      correct = 0;
      incorrect = 0;
      time = 30;
    }
  };

  $("#start").on("click", function() {
    // call the start function in the "game" object and remove start button to prevent multiple intervals
    game.start();
    game.show();
    $("#start").hide();
  });

  $(document).on("click", ".answer", function() {
    // the click event logs which answer has been selected and tests if correctAnswerId number matches
    // the answer clicked on.
    selectedAnswer = $(this).attr("id");
    game.result(selectedAnswer);
  });
  // question objects
  var question1 = {
    question: "Who directed The Departed?",
    answer1: "Pual Thomas Anderson",
    answer2: "Coen Brothers",
    answer3: "Martin Scorsese",
    answer4: "Quentin Tarantino",
    correctAnswer: answer3
  };

  var question2 = {
    question: "What year did Gladiator come out?",
    answer1: "2000",
    answer2: "1998",
    answer3: "2001",
    answer4: "2003",
    correctAnswer: answer1
  };

  var question3 = {
    question: "Which movie won the Academy Award for best picture?",
    answer1: "Pulp Fiction",
    answer2: "Braveheart",
    answer3: "The Two Towers",
    answer4: "Goodfellas",
    correctAnswer: answer2
  };

  var question4 = {
    question: "Which western was NOT a spaghetti western?",
    answer1: "A Fistful of Dollars",
    answer2: "Hang Em High",
    answer3: "The Good, The Bad, and The Ugly",
    answer4: "Once upon a Time in the West",
    correctAnswer: answer2
  };

  // store all question objects in an array to be called in the game
  var questionArray = [question1, question2, question3, question4];
  // hide the question and answers HTML elements on page load
  game.hide();
});
