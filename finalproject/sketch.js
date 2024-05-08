

//BALLOON IMAGES
let balloon, 
leftBalloon, 
rightBalloon,
 upBalloon, 
 damaged, 
 damagedRight, 
 damagedLeft, 
 damagedUp, 
 brokenUp, 
 broken, 
 brokenRight, 
 brokenLeft;

//BACKGROUNDS
let image1, image2, image3, image1b, image2b, image3b, image1c, image2c, image3c;

//TIMER & PLAYER
let gameTime=0;
let timerIsDone = false;
let gameState, playTime, player;

//OBSTACLES
let obstacles = []; 
let bird, plane, helicopter;
//JOYSTICK & ARDUINO
let port;
let joyX =0, joyY=0, sw=0;

//LED COLORS
let alive = "4 60 0\n";
let dead1 = "168 0 252\n";
let dead2 = "166 47 0\n";
let dead3 = "120 2 0\n";


function setup() {
  port = createSerial();
    createCanvas(windowWidth, windowHeight);
    let usedPorts = usedSerialPorts();
    if(usedPorts.length > 0){
      port.open(usedPorts[0], 57600);
    }

    player = new Player(balloon);
    score = 0;
    gameTime = 30;
    gameState = "welcome";
    timerIsDone = false;

    frameRate(60);
    
}

function preload(){
    balloon = loadImage("assets/balloon.png");
    damaged = loadImage("assets/damaged.png");
    upBalloon = loadImage("assets/upBalloon.png");
    leftBalloon = loadImage("assets/leftBalloon.png");
    rightBalloon = loadImage("assets/rightBalloon.png");
    image1 = loadImage("assets/background1.png")
    image2 = loadImage("assets/background2.png")
    image3 = loadImage("assets/background3.png")
    damagedRight = loadImage("assets/damagedRight.png")
    damagedLeft = loadImage("assets/damagedLeft.png")
    damagedUp = loadImage("assets/damagedUp.png")
    brokenUp = loadImage("assets/brokenUp.png")
    broken = loadImage("assets/broken.png")
    brokenRight = loadImage("assets/brokenRight.png")
    brokenLeft =loadImage("assets/brokenleft.png")
    image1b = loadImage("assets/image1b.png");
    image2b = loadImage("assets/image2b.png");
    image3b = loadImage("assets/image3b.png");
    image1c = loadImage("assets/image1c.png");
    image2c = loadImage("assets/image2c.png");
    image3c = loadImage("assets/image3c.png");
    bird =  loadImage("assets/bird.png");
    plane =  loadImage("assets/plane.png");
    helicopter =  loadImage("assets/helicopter.png");
}
function draw() {
  let str = port.readUntil('\n');
  let values = str.split(",");
  if(values.length > 2){
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);
  }
    if (gameState === "welcome") {
        welcomeScreen();
        
    }else if (gameState === "play") {
        
        
       if(player.lives === 0){
        gameState = "end";
       }
       
       if(player.lives ===3){
        port.write(alive);
       }else if(player.lives ===2){
        port.write(dead1);
       }else if(player.lives ===1){
        port.write(dead2);
       }
       


        if (gameTime%2==0){
            if(player.lives ===3){
                background(image1);
            }else if(player.lives ===2){
                background(image1b);
            }else if(player.lives ===1){
                background(image1c);
            }
            
        }else if(gameTime%5==0){
            if(player.lives ===3){
                background(image2);
            }else if(player.lives ===2){
                background(image2b);
            }else if(player.lives ===1){
                background(image2c);
            }
           
        }else {
            if(player.lives ===3){
                background(image3);
            }else if(player.lives ===2){
                background(image3b);
            }else if(player.lives ===1){
                background(image3c);
            }
        }
        
        timer();
        
        push();
        fill(255);
        noStroke();
        rect(20, 30, 110, 55, 20); 
        
        // Example cloud shape, adjust position and size as needed
        pop();

        // Draw text
        push();
        fill(0); // Black text color
        textSize(12);
        textFont('Courier New'); // Change font to Arial
        text(`Timer: ${gameTime}/30`, 30, 50);
        text(`Lives left: ${player.lives}`, 30, 70);
        pop();

        

        
          
          if (timerIsDone === true) {
            gameState = "end";
        }




        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].display();
            obstacles[i].move();
            obstacles[i].updateSpeed(gameTime);
            if (obstacles[i].collideWithBalloon(player.x, player.y, obstacles[i].diameter) && gameState === "play") {
              obstacles.splice(i, 1);
              sampler.triggerAttackRelease('C4', '8n');
            
              
              i--; 
              
            }
          }
      
      
          if (frameCount % 60 === 0) {
            obstacles.push(new Obstacle());
          }


          player.display(); 
      
    }else if (gameState === "end") {
        port.write(dead3);
        endScreen();
      }

    
}

function timer() {
    gameTime = int((millis() - playTime) / 1000);
    if (gameTime == 30) {
      timerIsDone = true;
    }
    return gameTime;
}

  function welcomeScreen() {
    
    push();
    background(image1);

    fill(136, 175, 191);
    stroke(255, 255, 255);
    strokeWeight(3);
    rect(width / 2 -280, height / 2 -50, 600, 200, 6);

  
    noStroke();
    fill(0);
    textAlign(CENTER);
    fill(255, 255, 255);
    textFont('Courier New');
    textSize(20);
    text(
      `Soar' in\n
      Press the joystick to start the game!\n
      Use the joystick to dodge obstacles!`,
      width / 2,
      height / 2
    );
    pop();
    port.write(alive);
  

    if(sw == 1){
      playTime = millis();
      gameState = "play"; 
      Tone.Transport.start();
    }
}

function endScreen() {
  if(player.lives ===0){
    push();
    background(image1);

    fill(136, 175, 191);
    stroke(255, 255, 255);
    strokeWeight(3);
    rect(width / 2 -280, height / 2 -50, 600, 200, 6);


    noStroke();
    fill(0);
    textAlign(CENTER);
    fill(255, 255, 255);
    textFont('Courier New');
    textSize(20);
    text(
      `Game Over!\n \nYou lost!`,
      width / 2,
      height / 2
    );
    pop();
  }else{
    push();
    background(image1);

    fill(136, 175, 191);
    stroke(255, 255, 255);
    strokeWeight(3);
    rect(width / 2 -280, height / 2 -50, 600, 200, 6);


    noStroke();
    fill(0);
    textAlign(CENTER);
    fill(255, 255, 255);
    textFont('Courier New');
    textSize(20);
    text(
      `Game Over!\n
      You won with ${player.lives} lives left \n`,
      width / 2,
      height / 2
    );
    pop();
  }
  
    backgroundLoopPattern.stop();
    backgroundLoop.stop();


}



class Obstacle { //birds, planes, and misiles
  constructor() {
    this.x = random(width);
    this.y = random(0,5);
    this.shape = random(["bird", "plane", "helicopter"]);
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);

   
    
  }
 

  updateSpeed(gameTime) {
    this.speedX += gameTime * 0.0001; 
    this.speedY += gameTime * 0.0001; 
  }

  display() {
    push();
    fill(255, 0, 0); 
    noStroke();
    if (this.shape === "bird") {
      this.diameter= 60;
      let angle = atan2(this.speedY, this.speedX); 
      if (this.speedX < 0) { 
        angle += PI;
      }
      translate(this.x, this.y); 
      rotate(angle); 
      
      if (this.speedX > 0) {
        scale(-1, 1); 
      }
      
      imageMode(CENTER);
      image(bird, 0, 0, this.diameter, this.diameter);

      
      

      
    } else if (this.shape === "plane") {
      this.diameter= 80;
      let angle = atan2(this.speedY, this.speedX); 
      if (this.speedX < 0) { 
        angle += PI;
      }
      translate(this.x, this.y); 
      rotate(angle); 
      
      if (this.speedX > 0) {
        scale(-1, 1); 
      }
      
      imageMode(CENTER);
      image(plane, 0, 0, this.diameter, this.diameter);
    } else if (this.shape === "helicopter") {
      this.diameter= 60;
      let angle = atan2(this.speedY, this.speedX); 
      if (this.speedX < 0) { 
        angle += PI;
      }
      translate(this.x, this.y); 
      rotate(angle); 
      
      if (this.speedX > 0) {
        scale(-1, 1); 
      }
      
      imageMode(CENTER);
      image(helicopter, 0, 0, this.diameter, this.diameter);
    }
    pop();
  }

  move() {
    this.x += this.speedX; 
    this.y += this.speedY;

    if (this.x > width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height;
    }
  }

  collideWithBalloon(x, y, diameter) {
    
    let distance = dist(this.x, this.y, x, y);
    if (distance < diameter ) {
       player.lives--;
       Tone.Transport.bpm.value += 15;
       
      return true;

    } else {
      return false;
    }
  }
}

class Player {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.diameter = 100;
        this.lives = 3;

      }

      display(){
        if (joyX<0) { //keyIsDown(LEFT_ARROW)
          synth1.triggerAttackRelease('C4', '8n');

            
            if (this.lives === 3){
              this.x = this.x - 7;
                image(leftBalloon, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
            }else if(this.lives === 2){
                image(damagedLeft, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
                this.x = this.x - 5;
              }else if(this.lives === 1){
                this.x = this.x - 3;
              image(brokenLeft, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 

            }
            

          }
          else if (joyX>0) {//keyIsDown(RIGHT_ARROW)
            synth1.triggerAttackRelease('C4', '8n');

            
            if (this.lives === 3){
              this.x = this.x + 7;
                image(rightBalloon, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 

            }else if(this.lives === 2){
                image(damagedRight, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
                this.x = this.x + 5;
            }else if(this.lives === 1){
              
              this.x = this.x + 3;
                image(brokenRight, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
            }
            
          }
          else if (joyY<0 ) {//keyIsDown(UP_ARROW)
            synth2.triggerAttackRelease('C4', '8n');

            if (this.lives === 3){
              this.y = this.y - 7;
                image(upBalloon, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
            }else if(this.lives === 2){
                image(damagedUp, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
                this.y = this.y - 5;
            }else if(this.lives === 1){
              this.y = this.y - 3;
                image(brokenUp, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 

            }
        
            
          }
          else if (joyY>0) {//keyIsDown(DOWN_ARROW)
            synth2.triggerAttackRelease('C4', '8n');
            if (this.lives === 3){
              this.y = this.y + 7;
                 image(balloon, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
                
            } else if(this.lives === 2){
              this.y = this.y + 5;
                image(damaged, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 

            }else if(this.lives === 1){
              this.y = this.y + 3;
                image(broken, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 

            }
           
            
          }else{
            if (this.lives === 3){
                image(balloon, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 
            }else if(this.lives === 2){
                image(damaged, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 

            }else if(this.lives === 1){
                image(broken, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); 

            }
            

          }


        
          
      }
}

//SOUNDS
const backgroundLoop = new Tone.Synth({
  oscillator: {
    type: 'sine' 
  },
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 1
  }
}).toDestination();

const backgroundLoopPattern = new Tone.Sequence(
  (time, note) => {
    backgroundLoop.triggerAttackRelease(note, '4n', time);
  },
  [ 'C4', 'E4','A4', 'G4'], 
  '4n' 
);
backgroundLoop.volume.value = -6;
backgroundLoopPattern.start();
Tone.Transport.bpm.value = 120; 


const sampler = new Tone.Sampler({
  'C4': 'assets/collision.mp3', 
}).toDestination();


const reverb = new Tone.Reverb({
  decay: 2,
  wet: 0.5
}).toDestination();

const delayTimeEnvelope = new Tone.Envelope({
  attack: 0.1,
  decay: 0.5,
  sustain: 0.5,
  release: 0.1,
  attackCurve: 'exponential'
});

const delay = new Tone.FeedbackDelay({
  delayTime: 0.5,
  feedback: 0.5,
  wet: 0.3
}).toDestination();

delayTimeEnvelope.connect(delay.delayTime);

const synth1Envelope = new Tone.Envelope({
  attack: 0.01,
  decay: 0.2,
  sustain: 0.3,
  release: 1
});

const synth1 = new Tone.FMSynth({
  harmonicity: 3,
  modulationIndex: 10,
  detune: 0,
  oscillator: {
      type: 'sine'
  },
  envelope: synth1Envelope
}).connect(reverb);
synth1.volume.value = -20;

const synth2Envelope = new Tone.Envelope({
  attack: 0.01,
  decay: 0.2,
  sustain: 0.3,
  release: 1
});

const synth2 = new Tone.MembraneSynth({
  envelope: synth2Envelope
}).connect(delay);

synth2.volume.value = -35;

  