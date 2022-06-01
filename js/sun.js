let w;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (width > height) {
    w = height;
  } else {
    w = width;
  }
  strokeWeight(w / 220);

  // how to draw a [sun] in p5.js

  // draw a circle
  ellipse(width / 2, height / 2, w / 2);

   // guidelines
  line(width/2- w/4,height/2, width/2+w/4,height/2); 
  line(width/2,height/2- w/4, width/2,height/2+w/4);   
  
   // chin shape
  arc(width/2, height/2,w/2-10,w/2-10,HALF_PI-.2,HALF_PI+.2)    
  
  // eye shapes
  ellipse(width/2 - w/8, height/2, w/10) 
  ellipse(width/2 + w/8, height/2, w/10)  
  
  // nose
  arc(width/2, height/2,w/8,w/6,HALF_PI-.6,HALF_PI+.6)  
  
  // mouth (don't overdo the detail)
  arc(width/2, height/2,w/3,w/3,QUARTER_PI,HALF_PI+QUARTER_PI)   
  
    fill(0) // shade 'em in
  // eyeballs
    ellipse(width/2 - w/8, height/2, w/20) 
    ellipse(width/2 + w/8, height/2, w/20)
    fill(255);
  
  // draw ears (with details)
  for (let i = -TWO_PI / 60; i < TWO_PI / 15; i = i + TWO_PI / 60) {    
    line(
      width/2 - cos(i) * w/4, height/2 - sin(i) * w/4, 
      width/2 - cos(i) * w/3, height/2 - sin(i) * w/3);
    line(
      width/2 + cos(i) * w/4, height/2 - sin(i) * w/4, 
      width/2 + cos(i) * w/3, height/2 - sin(i) * w/3);
  }  
  
  // eyebrows
  arc(width/2 - w/8, height/2, w/6,w/6,PI+QUARTER_PI,-HALF_PI) 
  arc(width/2 + w/8, height/2, w/6,w/6,-HALF_PI,-QUARTER_PI) 
  
  // eyelids
    arc(width/2 - w/8, height/2, w/10,w/20,PI,0) 
    arc(width/2 + w/8, height/2, w/10,w/20,PI,0)  
  
  // draw hair and final details 
  // to finish it off 
  sun(); 
  
  // now you can code

}

function sun() {
  background(138, 214, 228);
  if (width > height) {
    w = height;
  } else {
    w = width;
  }
  strokeWeight(w / 220);

  for (let i = TWO_PI / 60; i < TWO_PI; i = i + TWO_PI / 60) {
    stroke(255)
    line(
      width / 2, height / 2,
      width / 2 - cos(i) * w / map(mouseY, 0, height, 3, 1), height / 2 - sin(i) * w / map(mouseY, 0, height, 3, 1));

    stroke(10); // added background color
    line(
      width / 2, height / 2,
      width / 2 - cos(i) * w / 3, height / 2 - sin(i) * w / 3);
  }

  fill(255, 210, 70); // added sun tone
  ellipse(width / 2, height / 2, w / 2); //draw a circle
  noFill();

  arc(width / 2, height / 2, w / 2 - w/25, w / 2 - w/25, HALF_PI - .2, HALF_PI + .2) //chin shape

  ellipse(width / 2 - w / 8, height / 2, w / 10) //eye shapes
  ellipse(width / 2 + w / 8, height / 2, w / 10)

  arc(width / 2, height / 2, w / 8, w / 6, HALF_PI - .6, HALF_PI + .6) //nose
  arc(width / 2, height / 2, w / 3, w / 3, QUARTER_PI, HALF_PI + QUARTER_PI) //mouth

  fill(255); // added color
  arc(width / 2 - w / 8, height / 2, w / 10, w / 20, PI, 0) //eyelids
  arc(width / 2 + w / 8, height / 2, w / 10, w / 20, PI, 0) //eyelids
  arc(width / 2 - w / 8, height / 2, w / 10, w / 10, 0, PI);
  arc(width / 2 + w / 8, height / 2, w / 10, w / 10, 0, PI);

  fill(0) // shade 'em in
  ellipse(width / 2 - w / 8, height / 2, w / 20) //eyeballs
  ellipse(width / 2 + w / 8, height / 2, w / 20)
  noFill();

  arc(width / 2 - w / 8, height / 2, w / 6, w / 6, PI + QUARTER_PI, -HALF_PI) //eyebrows
  arc(width / 2 + w / 8, height / 2, w / 6, w / 6, -HALF_PI, -QUARTER_PI)

}

// if enter is pressed, download a png file
function keyPressed() {
  if (keyCode == 13) {
	saveCanvas('sun', 'png');
  } else {
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}