let selectedColor;
let squares; 
let dragging = false; 
let x;
let y;
let isInSquare = false;


function setup() {
  createCanvas(800, 800);
  
  selectedColor = color('white');

  squares = [
  new Square(0, 0, color('red')),  
  new Square(0,20, color('orange')), 
  new Square(0,40, color('yellow')),
  new Square(0,60, color('green')), 
  new Square(0,80, color('cyan')), 
  new Square(0,100, color('blue')),
  new Square(0,120, color('magenta')),
  new Square(0,140, color('brown')),
  new Square(0,160, color('white')),
  new Square(0,180, color('black'))];
  

}


function draw() {
  
  for(let i=0; i<squares.length; i++){
    squares[i].draw();
  }
  fill(selectedColor);
  stroke(selectedColor);
  
  if (dragging) {
    circle(x, y, 20);
  }
  
}


function mousePressed(){
  let isInSquare = false;

  for(let i=0; i<squares.length; i++){
    if(squares[i].contains(mouseX, mouseY)){
      selectedColor = squares[i].fill;
      isInSquare = true;
    }
  }
  if(!isInSquare){ 
    dragging = true;
    x = mouseX;
    y= mouseY;  
  }
 
}
function mouseReleased(){
  dragging = false;
   
}
function mouseDragged(){
  if(dragging){
    x += mouseX - pmouseX; 
    y += mouseY - pmouseY;
   
  }
  
}

class Square{
  
 
  constructor(x, y, fill){
    this.x = x;
    this.y = y;
    this.fill = fill;
    this.squareLength = 20;
  }

  draw(){
    stroke(255);
    fill(this.fill);
    square(this.x,this.y,this.squareLength);
    
  }

  contains(x,y){
    let insideX = x >= this.x && x<= this.x + this.squareLength;
    let insideY = y >=this.y && y <=this.y + this.squareLength;

    return insideX && insideY;
  }
}




