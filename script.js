//Create a timer function
//Create an array of questions and answers
    //Create an index variable 
        //if answer if chosen correctly index increases by 1 switching the question and answers
        //if answer is chsoen incorrectly time decreases
    //Text must be removed and appended to html through javascript
//After last answer is complete a pop up will be displayed asking for intials 
//Initials and score will be stored in a highscores array which will be displayer when button is selected
var index = 0
var questions = ['What is the main way to define a variable in Javascript?', 'Which is the proper syntax for an if statement?']
var allAnswers = [['have','make','def','var'],['if(x < 0){code here}', 'if x < 0 {code here}', ' if {x < 0} (code here)','if x < 0: code here']]
var correctInput = [3,0];
var timer = document.getElementById("timer");
var startButton = document.querySelector('#startButton');
var content = document.querySelector('#content');
var answers;


// var question = document.querySelector('#question')
var secondsLeft = 90;
timer.textContent = secondsLeft; 

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      //sendMessage();
    }

  }, 1000);
}
//check answer function
    //if answer is correct the index goes up (ie next question) and correct appears
    //if answer is incorrect time is decreased      
function checkAnswer(answer){
    console.log('Hello');
    answerIndex = answers.indexOf(answer);
    if (answerIndex == correctInput[index]){
        index = index + 1;
        //Print correct under question
        return
    }
   else {
        secondsLeft = secondsLeft - 10;
    }
}

//When button is clicked div contents are removed and populated with first question
startButton.addEventListener('click', function(){
    setTime();
    //startButton.remove(); 

    //Removes initial content in content div
    content.innerHTML = ""
    //Creates Question header and answer list elements
    var question = document.createElement('h1');
    var list = document.createElement('ol');
    var ans1 = document.createElement('li');
    var ans2 = document.createElement('li');
    var ans3 = document.createElement('li');
    var ans4 = document.createElement('li');
    content.appendChild(question);
    content.appendChild(list);
    list.appendChild(ans1);
    list.appendChild(ans2);
    list.appendChild(ans3);
    list.appendChild(ans4);



    //Loop through all questions
  
        //populate with question
        question.textContent = questions[index];

        answers = allAnswers[index];
       
        //populate answers
        ans1.textContent =  answers[0];
        ans2.textContent =  answers[1];
        ans3.textContent =  answers[2];
        ans4.textContent =  answers[3];

        //Add event listener for click which calls check answer function
        ans1.addEventListener("click",checkAnswer(answers[0]));
        ans2.addEventListener("click",checkAnswer(answers[1]));
        ans3.addEventListener("click",checkAnswer(answers[2]));
        ans4.addEventListener("click",checkAnswer(answers[3]));
    
    //question.textContent = 'Javascript question';

});

