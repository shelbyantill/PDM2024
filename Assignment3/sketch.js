let sprite1;
let sprite2;
let sprite3;


function preload(){
  sprite1 = new Sprite(200,200, 80, 80);
  sprite1.spriteSheet = 'assets/SpelunkyGuy.png';

  sprite2 = new Sprite(300,200, 80, 80);
  sprite2.spriteSheet = 'assets/Green.png';

  sprite3 = new Sprite(400,200, 80, 80);
  sprite3.spriteSheet = 'assets/Cyclops.png';


  let animations = {
    stand: { row: 0, frames: 1}, 
    walkRight: {row:0, col: 1, frames: 8},
    walkUp: {row: 5, frames:6},
    walkDown: {row:5, col: 6, frames: 6}
  };

  sprite1.anis.frameDelay=8;
  sprite1.addAnis(animations);
  sprite1.changeAni('walkRight');

  sprite2.anis.frameDelay=8;
  sprite2.addAnis(animations);
  sprite2.changeAni('walkRight');

  sprite3.anis.frameDelay=8;
  sprite3.addAnis(animations);
  sprite3.changeAni('walkRight');

  
}


function setup(){
  createCanvas(800,800);
}

function draw(){
  background(0);
  
  if(kb.pressing(RIGHT_ARROW) ){
    walkRight();
  }else if(kb.pressing(LEFT_ARROW) ){
    walkLeft();
  }else if(kb.pressing(UP_ARROW)){
    walkUp();
  }else if(kb.pressing(DOWN_ARROW)){
    walkDown();
  }else{
    stop();
  }


  if( sprite3.x +sprite3.width/4 > width ){
    walkLeft();
  }else if (sprite1.x -sprite1.width/4< 0){
    walkRight();
  }else if(sprite1.y -sprite1.height/4 <0){
    walkDown();
  }else if(sprite1.y +sprite1.height/4 >height){
    walkUp();
  }
  
}



function stop(){
  sprite1.vel.x=0;
  sprite1.vel.y=0;
  sprite1.changeAni('stand');

  sprite2.vel.x=0;
  sprite2.vel.y=0;
  sprite2.changeAni('stand');

  sprite3.vel.x=0;
  sprite3.vel.y=0;
  sprite3.changeAni('stand');
}

function walkLeft(){
  sprite1.changeAni('walkRight');
  sprite1.vel.x = -1;
  sprite1.scale.x = -1;
  sprite1.vel.y = 0;

  sprite2.changeAni('walkRight');
  sprite2.vel.x = -1;
  sprite2.scale.x = -1;
  sprite2.vel.y = 0;

  sprite3.changeAni('walkRight');
  sprite3.vel.x = -1;
  sprite3.scale.x = -1;
  sprite3.vel.y = 0;
}

function walkRight(){
  sprite1.changeAni('walkRight');
  sprite1.vel.x = 1;
  sprite1.scale.x = 1;
  sprite1.vel.y = 0;

  sprite2.changeAni('walkRight');
  sprite2.vel.x = 1;
  sprite2.scale.x = 1;
  sprite2.vel.y = 0;

  sprite3.changeAni('walkRight');
  sprite3.vel.x = 1;
  sprite3.scale.x = 1;
  sprite3.vel.y = 0;
}

function walkUp(){
  sprite1.changeAni('walkUp');
  sprite1.vel.y = -1;
  sprite1.vel.x = 0;

  sprite2.changeAni('walkUp');
  sprite2.vel.y = -1;
  sprite2.vel.x = 0;

  sprite3.changeAni('walkUp');
  sprite3.vel.y = -1;
  sprite3.vel.x = 0;
}

function walkDown(){
  sprite1.changeAni('walkDown');
  sprite1.vel.y = 1;
  sprite1.vel.x = 0;

  sprite2.changeAni('walkDown');
  sprite2.vel.y = 1;
  sprite2.vel.x = 0;

  sprite3.changeAni('walkDown');
  sprite3.vel.y = 1;
  sprite3.vel.x = 0;
}

