let bugImages = [],
  bug,
  bugs,
  rotationAngles = [0, 90, 180, -90],
  score,
  gameTime,
  gameState,
  timerIsDone,
  playTime,
  velocity;

let squishSound, missSound, backgroundMusic, skitter, startSound, endSound;

let port;
let joyX =0, joyY=0, sw=0;
let connectButton;
let circleX, circleY;
let speed = 3;

function preload() {
  for (let i = 0; i < 4; i++) {
    bugImages[i] = loadImage("assets/bug" + i + ".png");
  }
  
  squishSound = loadSound('assets/squish.mp3');
  missSound = loadSound('assets/miss.mp3');
  backgroundMusic = loadSound('assets/background_music.mp3');
  skitter = loadSound('assets/skitter.mp3');
 
}

function setup() {
  port = createSerial()
  createCanvas(800, 800);

  circleX = 30;
  circleY = 30;


  let usedPorts = usedSerialPorts();
  if(usedPorts.length > 0){
    port.open(usedPorts[0], 9600);
  }

  bugs = new Group();
  score = 0;
  gameTime = 30;
  gameState = "start";
  timerIsDone = false;
  velocity = 1;

  squishSound.setVolume(3);
  skitter.setVolume(.2);
  missSound.setVolume(.3);
}

function draw() {
  background(252, 237, 247);
  
  let str = port.readUntil('\n');
  let values = str.split(",");
  if(values.length > 2){
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);

    if(joyX>0){
      circleX+= speed;
    }else if (joyX<0){
      circleX-= speed;
    }

    if(joyY>0){
      circleY+= speed;
    }else if (joyY<0){
      circleY-= speed;
    }
  }

  
    //port.write("0 255 0\n");
  

  bugs.update();
  

  if (gameState === "start") {
    startScreen();
    
    if(sw == 1) {
      
      createBugs(30);
      playTime = millis();
      gameState = "play";
      backgroundMusic.loop();
     
    }
  } else if (gameState === "play") {
    port.write("0 255 0\n");
    timer();
    push();

    if(sw == 1){
      fill('red');
    }else{
      fill("pink")
    }
  
    circle(circleX, circleY,30);

    textSize(15);
    text(`Timer: ${gameTime} / 30`, 30, 50);
    text(`Squished Bugs: ${score}`, 30, 70);
    
    pop();

    bugs.overlap(bugs)

    bugs.forEach(function (bug) {
      if (dist(bug.position.x, bug.position.y, circleX, circleY) < 30 && sw == 1){ // Check if bug is within joystick circle
        squish(bug);
        bugSquished = true;
      }
      
      

      if (bug.x + bug.width / 4 > width) {
        moveLeft(bug);
        skitter.play();
      } else if (bug.x - bug.width / 4 < 0) {
        moveRight(bug);
        skitter.play();
      } else if (bug.y + bug.height / 4 + 50 > height) {
        moveTop(bug);
        skitter.play();
      } else if (bug.y - bug.height / 4 < 0) {
        moveBot(bug);
        skitter.play();
      }
    });

    if (timerIsDone === true) {
      bugs.remove();
      gameState = "end";
      backgroundMusic.stop();
    }

  } else if (gameState === "end") {
    endScreen();
  }
  
  
  
 
}


// function mousePressed() {
//   if(gameState === "play"){
//     missSound.play();
//   }
 
  
// }
function createBugs(num) {
  for (let i = 0; i < num; i++) {

    bug = new Sprite(random(50, 750), random(50, 750), 50, 50);
    bug.isDead = false;
    bug.addAni("alive", bugImages[0], bugImages[1], bugImages[0], bugImages[2]);
    bug.addAni("dead", bugImages[3]);

    bug.ani = "alive";
    bug.scale = 2;
    bug.overlap(bugs);

    bug.rotation = floor(random(rotationAngles));

    if (bug.rotation === 0) {
      bug.velocity.y = -velocity;
    } else if (bug.rotation === 90) {
      bug.velocity.x = velocity;
    } else if (bug.rotation === 180) {
      bug.velocity.y = velocity;
    } else if (bug.rotation === -90) {
      bug.velocity.x = -velocity;
    }

    bugs.add(bug);

  }
}

function startScreen() {
  port.write("0 0 225\n");
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
    `Press the joystick to start the game!`,
    width / 2,
    height / 2
  );
  pop();
  

 
}

function endScreen() {
  port.write("0 0 255\n");
  push();
  fill("pink");
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - 300, height / 2 - 100, 600, 200);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(`Game Over!\nYou squished ${score} bugs!`, width / 2, height / 2 - 30);
  pop();
  
  
  
}

function timer() {
  gameTime = int((millis() - playTime) / 1000);
  if (gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}

function moveTop(bug) { //down
  bug.rotation = 0;
  bug.velocity.y = -velocity;

}

function moveBot(bug) { //up
  bug.rotation = 180;
  bug.velocity.y = velocity;
}

function moveLeft(bug) { //right
  bug.rotation = -90;
  bug.velocity.x = -velocity;

}

function moveRight(bug) { //left
  bug.rotation = 90;
  bug.velocity.x = velocity;
}

function squish(bug) {
  for (let i = 0; i<4; i++){
    port.write("255 0 0\n");
  }
  
  increaseSpeed();
  if (bug.isDead === false) {
    bug.isDead = true;
    bug.ani = "dead";
    bug.vel.x = 0;
    bug.vel.y = 0;
    bug.life = 60;
    score++;
    squishSound.play();
    
  }
  
}

function increaseSpeed() {
  let currentRate = backgroundMusic.rate(); // Get current playback rate
  backgroundMusic.rate(currentRate + .00001); 
  bugs.forEach(function (e) {
    velocity = velocity + 0.004;
    if (e.rotation === 0) {
      e.velocity.y = -velocity;
    } else if (e.rotation === 90) {
      e.velocity.x = velocity;
    } else if (e.rotation === 180) {
      e.velocity.y = velocity;
    } else if (e.rotation === -90) {
      e.velocity.x = -velocity;
    }

  });
}
