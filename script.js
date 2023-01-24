//Create a timer function
//Create an array of questions and answers
    //Create an index variable 
        //if answer if chosen correctly index increases by 1 switching the question and answers
        //if answer is chosen incorrectly time decreases
    //Text must be removed and appended to html through javascript
//After last answer is complete a pop up will be displayed asking for intials 
//Initials and score will be stored in a highscores array which will be displayed when button is selected


var index = 0
var questions = ['What is the main way to define a variable in Javascript?', 'Which is the proper syntax for an if statement?', 'How do you specify strict equality?', 'What is it called when events trigger other events (also known as bubbling)?'];
var allAnswers = [['have','make','def','var'],['if(x < 0){code here}', 'if x < 0 {code here}', ' if {x < 0} (code here)','if x < 0: code here'],['==','===','!=','==!'],['Lifting','Multiply','Propogation','Generation']];
var correctInput = [3,0,1,2];
var timer = document.getElementById("timer");
var startButton = document.querySelector('#startButton');
var content = document.querySelector('#content');
var highscores = document.querySelector('#highScores');

var answers;
var question;
var ans1;
var ans2;
var ans3;
var ans4;
var user;

//Pull previous scores and add values to an array of scores and users
var scores = [];
var users = [];
var currentScores = JSON.parse(localStorage.getItem('score'))
console.log(currentScores)

//Prevents errors if nothing is in local storage
 if (currentScores != null){
     scores.push(currentScores.userscore);
     users.push(currentScores.name);
       }

//set up timer
var secondsLeft = 60;
timer.textContent = secondsLeft; 

//localStorage.clear();


//Standard Timer Function
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if(secondsLeft <= 0) {
        secondsLeft = 0;
        timer.textContent = secondsLeft;
        gameOver();
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      //sendMessage();
    }

  }, 1000);
}



//Function to change display to game over state when time is 0
function gameOver(){
    content.innerHTML = "";
    content.appendChild(question);
    question.textContent = 'Game Over!';

    startButton = document.createElement('button');
    content.appendChild(startButton);
    startButton.textContent = 'Start';
    startButton.setAttribute('id','startButton')
    
    startButton.addEventListener('click', function(){
        secondsLeft = 60;
        index = 0;
        start();       
    });
    
}



//check answer function
//if answer is correct the index goes up (ie next question) and correct appears
//if answer is incorrect time is decreased      

function checkAnswer(answer){
    
    answerIndex = answers.indexOf(answer);
 
    if (answerIndex == correctInput[index]){


        //If the answer is correct and the last answer it logs the score and ends the timer
        if (index === questions.length - 1){
           
            var score = secondsLeft;  
            secondsLeft = 0;    
            gameOver();
            var initials = window.prompt('Please enter your intials');
            

           
            //adds new user and score onto existing arrays            
             scores.push(score);
             users.push(initials);
            
         //Creates an object with users name and score
                 user = {
                     name: users,
                     userscore: scores
                 };

            
                //Stores the user object on local storage
            localStorage.setItem("score", JSON.stringify(user));
            
                }
            
 
        index = index + 1;
        //Print correct under question
        //console.log('index is' + index);
        setText(index);
        return
    }

    else {
        secondsLeft = secondsLeft - 10;
    }
}



//Function to populate text with new question and answers
function setText(index){
  
    //populate with question
    question.textContent = questions[index];

    answers = allAnswers[index];
       
    //populate answers
    ans1.textContent =  answers[0];
    ans2.textContent =  answers[1];
    ans3.textContent =  answers[2];
    ans4.textContent =  answers[3];
}


//Main function to run when startbutton is pressed
function start(){
    setTime();
    //startButton.remove(); 

    //Removes initial content in content div
    content.innerHTML = ""
    //Creates Question header and answer list elements
    question = document.createElement('h1');
    list = document.createElement('ol');
    ans1 = document.createElement('li');
    ans2 = document.createElement('li');
    ans3 = document.createElement('li');
    ans4 = document.createElement('li');
    content.appendChild(question);
    content.appendChild(list);
    list.appendChild(ans1);
    list.appendChild(ans2);
    list.appendChild(ans3);
    list.appendChild(ans4);

    //Call setText function to populate question and answers
    setText(index);


    //Add event listener for click which calls check answer function
    ans1.addEventListener("click",function(){checkAnswer(answers[0])});
    ans2.addEventListener("click",function(){checkAnswer(answers[1])});
    ans3.addEventListener("click",function(){checkAnswer(answers[2])});
    ans4.addEventListener("click",function(){checkAnswer(answers[3])});
}



//When button is clicked div contents are removed and populated with first question
startButton.addEventListener('click', function(){
    start();       
});



//When highscore button is clicked pulls high score from local storage and displays it

        //Still need to create a sorting function to put high scores in order and limit to 3

highscores.addEventListener('click',function(){
    content.innerHTML = ""
    list = document.createElement('ul');
    content.appendChild(list);
    //Pulls highscores out of local storage and splits into arrays
    user = JSON.parse(localStorage.getItem('score'));
    users = user.name;
    scores = user.userscore
    
    //goes through each highschore and prints
    for(var i = 0; i < users.length; i++){
        var userText = document.createElement('li');
    

        list.appendChild(userText);
        
        console.log(user[i])
        userText.textContent = users[i] + ' scored ' + scores[i];
    }

    // Creates start button at bottom of highscores
    startButton = document.createElement('button');
    content.appendChild(startButton);
    startButton.textContent = 'Start';
    startButton.setAttribute('id','startButton')
    

    startButton.addEventListener('click', function(){
        secondsLeft = 60;
        index = 0;
        start();       
    });
    
})