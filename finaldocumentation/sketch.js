let bgSound, collisionSound, leftSound, upSound;




let welcome, gameimg, end, obi1, obi2, obi3, balloon, balloonleft, balloonright, balloonup;
let balloon2, balloonleft2, balloonright2, balloonup2, balloon3, balloonleft3, balloonright3, balloonup3;
let videoA, videoB, joystick, led, play;

function setup() {
  
  createCanvas(windowWidth, 3000);
  
}

  function preload(){
    welcome = loadImage("assets/welcome.png");
    gameimg =  loadImage("assets/gameimg.png");
    end =  loadImage("assets/end.png");
    obi1= loadImage("assets/plane.png");
    obi2=loadImage("assets/bird.png");
    obi3= loadImage("assets/helicopter.png");
    balloon = loadImage("assets/balloon.png");
    balloonleft = loadImage("assets/leftBalloon.png");
     balloonright = loadImage("assets/rightBalloon.png");
      balloonup = loadImage("assets/upBalloon.png");

      balloon2 = loadImage("assets/damaged.png");
      balloonleft2 = loadImage("assets/damagedLeft.png");
      balloonright2 = loadImage("assets/damagedRight.png");
      balloonup2 = loadImage("assets/damagedUp.png");

      balloon3 = loadImage("assets/broken.png");
      balloonleft3 = loadImage("assets/brokenLeft.png");
      balloonright3 = loadImage("assets/brokenRight.png");
      balloonup3 = loadImage("assets/brokenUp.png");

      videoA= loadImage("assets/videoa.png");
      videoB= loadImage("assets/videoB.png");

      bgSound = loadSound('assets/background.m4a');
      upSound = loadSound('assets/up.m4a');
      leftSound = loadSound('assets/left.m4a');
      collisionSound = loadSound('assets/collision.m4a');

      joystick = loadImage("assets/joystick.png");
      led = loadImage("assets/leddiagram.png");
      play= loadImage("assets/playbtn.png");
     
  }  
  
  
  
  function draw() {
  
  background(136, 175, 191);
  noStroke();
  fill(255);
  rect(width/2-190, 20, 400, 60, 10);
  textFont('Courier New');
  textSize(14);
  textAlign(CENTER);
  fill(0);
  textStyle(BOLD);
    text(
      `Soar' in\nProject Documentation`,
      width / 2,
     40
    );


    
  
  
  fill(255);
  rect(width/2-625, 100, 1250, 270, 10);
  textFont('Courier New');
  textSize(14);
  textAlign(CENTER);
  fill(0);
  textStyle(BOLD);
    text(
      `Narrative\n`,
      width / 2,
     120
    );
    textStyle(NORMAL)
    text(
      ` In Soar' in, you will embark on a journey soaring in the sky on a colorful hot air balloon.\n
      As your ride kicks off, you'll find yourself dodging the obstacles approaching you. \n
      Helicopters, planes, and hawks are swooping dangerously close.\n
      With each collision your balloon has with these obstacles, the balloon's speed slows and your balloon begins to catch fire.
      As time ticks away, the challenge escalates, with obstacles multiplying in number and velocity.\n
      You only have 30 seconds on the clock and 3 collisions allowed before your balloon begins free falling.\n
      Can you survive the journey? The challenge awaits, soaring high above the clouds.\n`,
      width / 2,
     138
    );



    fill(255);
  rect(width/2-625, 410, 1250, 310, 10);
  textFont('Courier New');
  textSize(14);
  textAlign(CENTER);
  fill(0);
  textStyle(BOLD);
    text(
      `Game Rules\n`,
      width / 2,
     430
    );
    textStyle(NORMAL)
    text(
      ` Navigate your hot air balloon with the joystick through a hazardous sky for 30 seconds, dodging obstacles and preserving your 3 lives!\n
      The balloon starts with 3 lives. Colliding with obstacles reduces the lives by one. If the balloon loses 3 lives before the time limit, you lose. \n
      The time limit is 30 seconds. Helicopters, planes, and birds populate the sky as obstacles.\n
      The number and speed of obstacles increase as time progresses, ramping up the challenge.\n
      The balloon's speed decreases with each collision and catches on fire.\n
      An LED will change according to the number of lives remaining ...\n
      Green: Three lives remaining, Purple: Two lives remaining, Orange: One life remaining, Red: Zero lives remaining\n
      To win, you must survive for the entire 30-second duration\n`,
      width / 2-10,
     460
    );

    textStyle(BOLD)
    fill(255);
    text("Welcome Screen", 100, 740);
      image(welcome, 20, 750, 440, 300)
      text("Game Screen", 560, 740);
      image(gameimg, 480, 750, 460, 300)
      text("End Screen", 1020, 740);
      image(end, 960, 750, 440, 300)
      
    fill(255);
    rect(width/2-625, 1100, 1250, 215, 10);
    textFont('Courier New');
    textSize(14);
    textAlign(CENTER);
    fill(0);
    textStyle(BOLD);
      text(
        `Additional Features:\n`,
        width / 2,
        1120
      );
      textStyle(NORMAL)
      text(
        `The background music speeds up as the game progresses.\n
        The balloon makes swooshing/moving sounds when navigating left/right or up/down. \n
        A collision sound is made when the balloon is hit.\n
        The background darkens and the balloon becomes visibly more damaged with each life lost.\n
        Each obstacle starts with varying speeds and trajectories.\n`,
        width / 2,
        1140
      );

      textStyle(BOLD)
        fill(255);

      text("Obstacles:", 165 , 1350) 
      image(obi1, 110, 1360, 50, 50)
      image(obi2, 190, 1360, 50, 50)
      image(obi3, 270, 1360, 50, 50)

      text("Balloon (3 lives):", 455 , 1350) 
      image(balloon, 360, 1360, 50, 50)
      image(balloonleft, 440, 1360, 50, 50)
      image(balloonright, 520, 1360, 50, 50)
      image(balloonup, 590, 1360, 50, 50)


      text("Balloon (2 lives):", 750 , 1350) 
      image(balloon2,660, 1360, 50, 50)
      image(balloonleft2, 740, 1360, 50, 50)
      image(balloonright2, 820, 1360, 50, 50)
      image(balloonup2, 890, 1360, 50, 50)

      text("Balloon (1 life):", 1040 , 1350) 
      image(balloon3,960, 1360, 50, 50)
      image(balloonleft3, 1040, 1360, 50, 50)
      image(balloonright3, 1120, 1360, 50, 50)
      image(balloonup3, 1200, 1360, 50, 50)

      text("Game Demo Videos: (press on the images to watch the videos)", width/2 , 1470) 
      image(videoA,  165 , 1500, 500, 300)
      image(videoB,  765 , 1500, 500, 300)
      
      
    fill(255);
    rect(400, 1900, 600, 215, 10);
    textFont('Courier New');
      fill(0);
      text("Tone.js Audio Demos:", 710, 1920)
      textAlign(LEFT);

      fill(50, 168, 82);
      image(play, 572, 1948, 20, 20)
      rect(595, 1955, 300, 5, 40);

      fill(163, 54, 134);
      image(play, 605, 1987, 20, 20)
      rect(630, 1995, 300, 5, 40);

      fill(230, 138, 80);
      image(play, 585, 2028, 20, 20)
      rect(610, 2035, 300, 5, 40);

      fill(96, 175, 235);
      image(play, 525, 2067, 20, 20)
      rect(550, 2075, 300, 5, 40);

      fill(0);
      text("Background music:", 425, 1960)
      text("Left/Right Movements:", 425, 2000)
      text("Up/Down Movements:", 425, 2040)
      text("Collisions:", 425, 2080)
      
      textAlign(CENTER);
      fill(255);
      text("Arduino Diagrams:", 700, 2170)
      fill(255);
      rect(160, 2198, 410, 310, 10);
      image(joystick,  165 , 2200, 400, 300, )
      rect(760, 2198, 510, 310, 10);
      image(led,  765 , 2200, 500, 300)




    rect(200, 2600, 1050, 210, 10);  
    fill(0) 
    text("Future Development", 700, 2620)    
    textStyle(NORMAL);
    text(`For future development, we could possibly add multiple levels to the game\n
     to increase the user's playtime and intensify the difficulty of the game. We could also add\n
      power-ups so the user could gain more lives. For physical computing, utilizing a fan could be \n
      a nice addition to the user experience. The fan could slow in speed as the balloon begins to fall.`, 700, 2670) 

}
function mousePressed(){
  if (mouseY >= 1500 && mouseY <= 1800 && mouseX >= 165 && mouseX <= 665){ 
    window.open("https://youtu.be/VP8Zz1-h_QA");
  }

  if (mouseY >= 1500 && mouseY <= 1800 && mouseX >= 765 && mouseX <= 1265){ 
    window.open( "https://youtu.be/wAi05fr-teE");
  }

  
  if (mouseY >= 1948 && mouseY <= 1968 && mouseX >= 572 && mouseX <= 592){ 
    bgSound.play();

  }


  if (mouseY >= 1987 && mouseY <= 2007 && mouseX >= 605 && mouseX <= 625){ 
    leftSound.play();
    

  }


  if (mouseY >= 2028 && mouseY <= 2048 && mouseX >= 585 && mouseX <= 605){ 
    
    upSound.play();

  }
  if (mouseY >= 2067 && mouseY <= 2087 && mouseX >= 525 && mouseX <= 545){ 
    collisionSound.play();

  }
}



