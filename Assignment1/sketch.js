function setup() {
  createCanvas(600, 1000);
}

function draw() {
  //drawing 1
  background(220);
  noStroke();
  fill(50,205, 50);
  rect(20, 20, 200, 100);
  stroke(0);
  strokeWeight(1); 
  fill(255);
  circle(72, 70, 80);
  square(132, 32, 75);

  //drawing 2
  noStroke();
  fill('white');
  square(35, 200, 170);
  fill(255,0,0, 85);
  circle(120, 260, 85);
  fill(0,0,255, 85);
  circle(90, 310, 85);
  fill(0, 255,0, 85);
  circle(150, 310, 85);

  //drawing 3
  noStroke();
  fill('black');
  rect(30, 450, 180, 100);
  fill('yellow');
  arc(70, 500, 70, 70, PI+PI/4, PI-PI/4, PIE); 
  
  fill(255,40,40);
  arc(160, 500, 70, 70, PI,0, PIE); 
  rect(125,500, 70, 35)
  fill('white');
  circle(145,500, 22);
  circle(175,500, 22);
  fill('blue');
  circle(145,500, 14);
  circle(175,500, 14);

  //drawing 4
  fill(5, 29, 153);
  square(35, 630, 160);
  stroke('white');
  strokeWeight(2); 
  fill('green');
  circle(115,710, 88);

  
  fill('red');
  strokeWeight(4); 
  beginShape(); //get the write outline
    vertex(90, 745);
    vertex(115, 668); 
    vertex(140, 745);
    vertex(75,700);
    vertex(154,700);
  endShape(CLOSE);
   
  noStroke();
  beginShape();//fill in outline with red
    vertex(90, 745);
    vertex(115, 668); 
    vertex(140, 745);
    vertex(75,700);
    vertex(154,700);
  endShape(CLOSE);
}
