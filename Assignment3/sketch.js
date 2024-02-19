let sprite1;
let sprite2;
let sprite3;
let characters = [];

function preload(){
  

  let animations = {
    stand: { row: 0, frames: 1}, 
    walkRight: {row:0, col: 1, frames: 8},
    walkUp: {row: 5, frames:6},
    walkDown: {row:5, col: 6, frames: 6}
  };

  characters.push(new Character(200,200, 80, 80, "assets/SpelunkyGuy.png", animations));
  characters.push( new Character(300,200, 80, 80, "assets/Green.png", animations)); 
  characters.push(new Character(400,200, 80, 80, "assets/Cyclops.png", animations));
  

  

  
}


function setup(){
  createCanvas(700,500);
}

function draw(){
  background(0);
  
  characters.forEach((character) =>{
    if(kb.pressing(RIGHT_ARROW) ){
      character.walkRight();
    }else if(kb.pressing(LEFT_ARROW) ){
      character.walkLeft();
    }else if(kb.pressing(UP_ARROW)){
      character.walkUp();
    }else if(kb.pressing(DOWN_ARROW)){
      character.walkDown();
    }
    else{
      character.stop();
    }

    if(character.sprite.x +character.sprite.width/4> width){
      character.walkLeft();
  
    }else if (character.sprite.x -character.sprite.width/4< 0){
      character.walkRight();
    }

  } )
  
}



class Character{
  constructor(x,y,width, height, spriteSheet, animations){
  this.sprite = new Sprite(x,y, width, height);
  this.sprite.spriteSheet = spriteSheet;
  this.sprite.anis.frameDelay=8;
  this.sprite.addAnis(animations);
  this.sprite.changeAni('stand');
  }


  stop(){
    this.sprite.vel.x=0;
    this.sprite.vel.y=0;
    this.sprite.changeAni('stand');
  }
   walkLeft(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.scale.x = -1;
    this.sprite.vel.y = 0;
  }
  
   walkRight(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.scale.x = 1;
    this.sprite.vel.y = 0;
  }
  
   walkUp(){
    this.sprite.changeAni('walkUp');
    this.sprite.vel.y = -1;
    this.sprite.vel.x = 0;
  }
  
   walkDown(){
    this.sprite.changeAni('walkDown');
    this.sprite.vel.y = 1;
    this.sprite.vel.x = 0;
    }
}

