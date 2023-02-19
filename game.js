var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=-1;
var started=false;

// document.addEventListener("keypress",sequence);    //code written in javascript
$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      sequence();
      started = true;
    }
  });                   //code written in jquery

function sequence(){
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level + 1;
    $("h1").text("level "+level);
};

$(".btn").click(handler);

function handler(){
    var userChosenColour= this.id;
    userClickedPattern.push(userChosenColour); 
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    
}
function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){ $("."+currentColour).removeClass("pressed")
},200);
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log(gamePattern);
    console.log(userClickedPattern);
    console.log("won");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){sequence()},1000);
      userClickedPattern=[];
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},200);
    $("h1").text("GAME OVER, Press A Key to Start");
    gamePattern=[];
    userClickedPattern=[];
    level=-1;
    started=false;

  }
}
