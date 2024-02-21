let 
  bugImages = [],
  bug,
  bugs,
  rotationAngles = [0, 90, 180, -90],
  alive,
  squished,
  score,
  gameTime,
  gameState,
  timerIsDone,
  playTime, 
  velocity;

function preload() {
  for (let i = 0; i < 4; i++) {
    bugImages[i] = loadImage("assets/bugsprite" + i + ".png");
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
  for (let bug of bugs) {
    bug.update();
  }
  background(255);

  if (gameState === "start") {
    startScreen();
    if (mouseIsPressed) {
      createBugs(20);
      playTime = millis();
      gameState = "play";
    }
  } else if (gameState === "play") {
    timer();
    push();
    textSize(15);
    text(`Time Remaining: ${gameTime} / 30`, 30, 50);
    text(`Bugs Squished: ${score}`, 30, 70);
    pop();
    
    bugs.overlap(bugs)
    

    bugs.forEach(function (bug) {
      if (bug.mouse.pressing()) {
       
       bug.squish();
      }

      if(bug.x +bug.width/4> width){
        
        bug.teleLeft();
      }else if(bug.x -bug.width/4< 0){
        
        bug.teleRight();
      }
      else if(bug.y +bug.height/4 >height){
        bug.teleTop();
      }
     else if(bug.y - bug.height/ 4< 0){
        bug.teleBot();
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


    bugs.add( new Bug());
  }
}

function startScreen() {
  push();
  fill("gray");
  stroke(0);
  strokeWeight(5);
  rect(width / 2 - 300, height / 2 - 100, 600, 200);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(
    `Click the bugs to clear the Infestation\nClick as many as you can in 30 seconds!\nGood Luck!`,
    width / 2,
    height / 2 - 30
  );
  pop();
}

function endScreen() {
  push();
  fill("gray");
  stroke(0);
  strokeWeight(5);
  rect(width / 2 - 300, height / 2 - 100, 600, 200);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(
    `Time is up!\nYou squished ${score} bugs!\nPress RETURN to play again!`,
    width / 2,
    height / 2 - 30
  );
  pop();
}

function timer() {
  gameTime = int((millis() - playTime) / 1000);
  if (gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}




function increaseSpeed(){
  bugs.forEach(function (e) {
    velocity= velocity+0.002;
    switch (e.rotation) {
      case 0:
        e.velocity.y = -velocity;
        break;
      case 90:
        e.velocity.x = velocity;
        break;
      case 180:
        e.velocity.y = velocity;
        break;
      case -90:
        e.velocity.x = -velocity;
        break;
      default:
        break;
    }
  });
}



class Bug{

  constructor(){
    this.bug = new Sprite(random(50, 750), random(50, 750), 50, 50);
    this.bug.isDead = false;
    
    this.bug.addAni("alive", bugImages[0], bugImages[1], bugImages[0], bugImages[2]);
    this.bug.addAni("dead", bugImages[3]);

    this.bug.changeAni("alive");
    this.bug.scale = 0.5;
    this.bug.overlap(bugs);
    this.bug.rotation = floor(random(rotationAngles));
    this.setRotation();

  }
  
  setRotation(){
    switch (this.bug.rotation) {
      case 0:
        this.bug.velocity.y = -velocity;
        break;
      case 90:
        this.bug.velocity.x = velocity;
        break;
      case 180:
        this.bug.velocity.y = velocity;
        break;
      case -90:
       this.bug.velocity.x = -velocity;
        break;
      default:
        this.bug.rotation = 0;
        this.bug.velocity.y = velocity;
        break;
    }
  }
    

    
   squish() {
    increaseSpeed();
    if (this.bug.isDead === false) {
      this.bug.isDead = true;
      this.bug.ani = "dead";
      this.bug.vel.x = 0;
      this.bug.vel.y = 0;
      this.bug.life = 60;
      score++;
      
    }
    if (bugs.size() < 1) {
      createBugs(20);
    }
  }
    

   teleTop(){//down
  
    this.bug.rotation = 0;
    this.bug.velocity.y = -velocity;
  
  }
   teleBot(){//up
    
    this.bug.rotation = 180;
    this.bug.velocity.y = velocity;
  }
   teleLeft(){//right
    
    this.bug.rotation = -90;
    this.bug.velocity.x = -velocity;
  
  }
   teleRight(){//left
  
    this.bug.rotation = 90;
    this.bug.velocity.x = velocity;
  }
    
  
}