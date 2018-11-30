# Movie Trivia Game

# what the game is
1. The movie trivia game prompts the user to hit a start button which begins the game. Once the game is started
the user will have 30 seconds to select one of 4 answers to a question with a timer being displayed. After a 
selection is made the screen will transition to a screen that informs the user if they were right, wrong, or ran 
out of time as well as displaying the correct answer for several seconds before transitioning to the next question
and the timer resets. After all questions are answered the results are shown for a few seconds and the game resets.

# how the game is organized
2. The game works by storing all questions and answers in individual objects with the same variable names (ie. question:
answer1: answer2:...) but different answers and questions stored as strings. The question objects are stored in an array and the game object will call these questions sequentially as the game progresses. All functions are stored in the game object except for two click events, one that starts the game when the start button is clicked and the other when an answer is clicked on. Comments are left in the app.js code to explain how each function works within the game object.