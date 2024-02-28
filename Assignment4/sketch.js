let 
  bugImages = [],
  bug,
  bugs,
  rotationAngles = [0, 90, 180, -90],
  score,
  gameTime,
  gameState,
  timerIsDone,
  playTime, 
  velocity;

function preload() {
  for (let i = 0; i < 4; i++) {
    bugImages[i] = loadImage("assets/bug" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 800);
  bugs = new Group();
  score = 0;
  gameTime = 30;
  gameState = "start";
  timerIsDone = false;
  velocity= 1;
}

function draw() {
  bugs.update();
  background(252, 237, 247);

  if (gameState === "start") {
    startScreen();
    if (mouseIsPressed) {
      createBugs(30);
      playTime = millis();
      gameState = "play";
    }
  } else if (gameState === "play") {
    timer();
    push();
    textSize(15);
    text(`Timer: ${gameTime} / 30`, 30, 50);
    text(`Squished Bugs: ${score}`, 30, 70);
    pop();
    
    bugs.overlap(bugs)
    
    bugs.forEach(function (bug) {
      if (bug.mouse.pressing()) {
       squish(bug);
      }
      if(bug.x +bug.width/4> width){
        moveLeft(bug);
      }else if(bug.x -bug.width/4< 0){
        moveRight(bug);
      }
      else if(bug.y +bug.height/4 +50>height){
        moveTop(bug);
      }
     else if(bug.y - bug.height/ 4  < 0){
         moveBot(bug);
      }
    });

    if (timerIsDone === true) {
      bugs.remove();
      gameState = "end";
    }
    
  } else if (gameState === "end") {
    endScreen();
  }
}

function createBugs(num) {
  for (let i = 0; i < num; i++) {
    
    bug = new Sprite(random(50, 750), random(50, 750), 50, 50);
    bug.isDead = false;
    bug.addAni("alive", bugImages[0], bugImages[1], bugImages[0],bugImages[2]);
    bug.addAni("dead", bugImages[3]);

    bug.ani = "alive";
    bug.scale =2;
    bug.overlap(bugs);

    bug.rotation = floor(random(rotationAngles));

    if(bug.rotation === 0){
      bug.velocity.y = -velocity;
    }else if(bug.rotation === 90){
      bug.velocity.x = velocity;
    }else if(bug.rotation === 180){
      bug.velocity.y = velocity;
    }else if(bug.rotation === -90){
      bug.velocity.x = -velocity;
    }

    bugs.add( bug);
   
  }
}

function startScreen() {
  push();
  fill("pink");
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - 300, height / 2 - 100, 600, 200);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(
    `Press the mouse to start the game!`,
    width / 2,
    height / 2
  );
  pop();
}

function endScreen() {
  push();
  fill("pink");
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - 300, height / 2 - 100, 600, 200);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text( `Game Over!\nYou squished ${score} bugs!`,width / 2, height / 2 - 30 );
  pop();
}

function timer() {
  gameTime = int((millis() - playTime) / 1000);
  if (gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}


function moveTop(bug){//down
  bug.rotation = 0;
  bug.velocity.y = -velocity;

}
function moveBot(bug){//up
  bug.rotation = 180;
  bug.velocity.y = velocity;
}
function moveLeft(bug){//right
  bug.rotation = -90;
  bug.velocity.x = -velocity;

}
function moveRight(bug){//left
  bug.rotation = 90;
  bug.velocity.x = velocity;
}


function squish(bug) {
  increaseSpeed();
  if (bug.isDead === false) {
    bug.isDead = true;
    bug.ani = "dead";
    bug.vel.x = 0;
    bug.vel.y = 0;
    bug.life = 60;
    score++;
    
  } 
}

function increaseSpeed(){
  bugs.forEach(function (e) {
    velocity= velocity+0.004;
    if(e.rotation=== 0) {
        e.velocity.y = -velocity;
    }else if(e.rotation=== 90){
      e.velocity.x = velocity;
    }else if(e.rotation=== 180){
      e.velocity.y = velocity;
    }else if(e.rotation=== -90){
      e.velocity.x = -velocity;
    }
      
  });
}



