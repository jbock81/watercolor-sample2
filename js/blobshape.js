var ww = window.innerWidth;
var hh = window.innerHeight;

let canvas
const st_deviation = 50
const layers = 80

let pentagon1;
let pentagon2;

var left_x;
var right_x;
var top_y;
var bottom_y;
var resolution;
var num_columns;
var num_rows;
var grid;
var angleOffset = 225;
var map_PI = 0.0;

const num_steps = 200;
const step_length = 5;

var pp = [[300, -300], [300, -100], [300, 100], [300, 300], [300, 500]];

function createStretchedPentagon(stretchFactor, offset) {
  
  let stretchedPentagon = [
      createVector(910  + randomGaussian(0, stretchFactor) + offset , 320+ offset ),
      createVector(830.9188309203678 + randomGaussian(0, stretchFactor)+ offset , 510.9188309203678+ offset ),
      createVector(640 + randomGaussian(0, stretchFactor)+ offset , 590+ offset ),
      createVector(449.0811690796322 + randomGaussian(0, stretchFactor)+ offset , 510.91883092036784+ offset ),
      createVector(370 + randomGaussian(0, stretchFactor)+ offset ,320.00000000000006+ offset ),
      createVector(449.0811690796321 + randomGaussian(0, stretchFactor)+ offset , 129.0811690796322+ offset ),
      createVector(640 + randomGaussian(0, stretchFactor)+ offset , 50+ offset ),
      createVector(830.9188309203678 + randomGaussian(0, stretchFactor)+ offset , 129.08116907963213+ offset )
  ]
  
  /*
  let stretchedPentagon = [
    createVector(910 + stretchFactor , 320+ offset ),
    createVector(830.9188309203678 + stretchFactor , 510.9188309203678+ offset ),
    createVector(640 + stretchFactor , 590+ offset ),
    createVector(449.0811690796322 + stretchFactor , 510.91883092036784+ offset ),
    createVector(370 + stretchFactor ,320.00000000000006+ offset ),
    createVector(449.0811690796321 + stretchFactor , 129.0811690796322+ offset ),
    createVector(640 + stretchFactor , 50+ offset ),
    createVector(830.9188309203678 + stretchFactor , 129.08116907963213+ offset )
  ]
  */
  
  /*
  let stretchedPentagon = [
    createVector(910 + randomGaussian(0, stretchFactor) , 320+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) , 510.9188309203678+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) , 590+ offset ),
    createVector(449.0811690796322 + randomGaussian(0, stretchFactor) , 510.91883092036784+ offset ),
    createVector(370 + randomGaussian(0, stretchFactor) ,320.00000000000006+ offset ),
    createVector(449.0811690796321 + randomGaussian(0, stretchFactor) , 129.0811690796322+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) , 50+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) , 129.08116907963213+ offset )
  ]
  */
  
  /*
  let stretchedPentagon = [
    createVector(910 + randomGaussian(0, stretchFactor) + stretchFactor , 320+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) + stretchFactor , 510.9188309203678+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) + stretchFactor , 590+ offset ),
    createVector(449.0811690796322 + randomGaussian(0, stretchFactor) + stretchFactor , 510.91883092036784+ offset ),
    createVector(370 + randomGaussian(0, stretchFactor) + stretchFactor ,320.00000000000006+ offset ),
    createVector(449.0811690796321 + randomGaussian(0, stretchFactor) + stretchFactor , 129.0811690796322+ offset ),
    createVector(640 + randomGaussian(0, stretchFactor) + stretchFactor , 50+ offset ),
    createVector(830.9188309203678 + randomGaussian(0, stretchFactor) + stretchFactor , 129.08116907963213+ offset )
  ]*/

  return stretchedPentagon
}

function preload() {
  
}

function setup() {
  
  pentagon1 = [
      createVector(910, 320),
      createVector(830.9188309203678, 510.9188309203678),
      createVector(640, 590),
      createVector(449.0811690796322, 510.91883092036784),
      createVector(370 ,320.00000000000006),
      createVector(449.0811690796321, 129.0811690796322),
      createVector(640, 50),
      createVector(830.9188309203678, 129.08116907963213)
  ]

  pentagon2 = [
    createVector(910, 860),
    createVector(830.9188309203678, 1050.9188309203678),
    createVector(640, 1130),
    createVector(449.0811690796322, 1050.91883092036784),
    createVector(370 ,860.00000000000006),
    createVector(449.0811690796321, 669.0811690796322),
    createVector(640, 590),
    createVector(830.9188309203678, 669.08116907963213)
  ]
  
  noStroke();
  canvas = createCanvas(ww, hh);
  //canvas.mouseClicked(clickOnSave)

  left_x = Math.round(ww * -0.5)
  right_x = Math.round(ww * 1.5)
  top_y = Math.round(hh * -0.5)
  bottom_y = Math.round(hh * 1.5) 
  
}

function draw() {
  angleOffset = random(0, 360);
  map_PI = TWO_PI * random(1, 4);
  resolution = random(Math.round(ww * 0.01) / 2, Math.round(ww * 0.01))
  num_columns = Math.round((right_x - left_x) / resolution)
  num_rows = Math.round((bottom_y - top_y) / resolution)
  
  grid = new Array(num_columns);
  for (var i=0; i<num_columns; i++)
    grid[i] = new Array(num_rows);
  
  background(random(0, 255), random(0, 255), random(0, 255), 50);
  
  for (var i=0; i<5; i++) {
    drawCustomShape(createStretchedPentagon(pp[i][0], pp[i][1]), [random(0,255), random(0,255), random(0,255), 10])
  }
  
  //colorMode(HSB)

  blendMode(BLEND)
  for(let i=0; i<R.randNum(10,40); i++) {
      blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),20,600,1,1)
  }

  blendMode(SCREEN)
  for(let i=0; i<30; i++) {
      blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),50,800,1,1)
  }

  blendMode(BLEND)
  for(let i=0; i<R.randNum(10,40); i++) {
      blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),50,800,1,1)
  }

  blendMode(OVERLAY)
  for(let i=0; i<R.randNum(20,50); i++) {
      blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),10,300,1,1)
  }

  blendMode(SCREEN)
  for(let i=0; i<20; i++) {
      blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),400,800,1,1)
  }

  blendMode(BLEND)

  // saveCanvas();
  frameRate(0.3);
}

function myFlowField(x, y, num_steps){
  for (var n = 0; n < num_steps; n++) {
    var x_offset = x - left_x;
    var y_offset = y - top_y;
    
    var column_index = Math.round(x_offset / resolution);
    var row_index = Math.round(y_offset / resolution);
    if (column_index >= num_columns)
      column_index = num_columns - 1;
    if (row_index >= num_rows)
      row_index = num_rows - 1;
    // NOTE: normally you want to check the bounds here
    var grid_angle = grid[column_index][row_index];
    var x_step = Math.abs(step_length * cos(grid_angle));
    var y_step = Math.abs(step_length * sin(grid_angle));
    // push();
    // translate(x, y);
    // arc(0, 0, x_step * 10, y_step * 10, 0, grid_angle, CHORD);
    // pop();
    
    ellipse(x, y, x_step * 30, y_step * 30);
    x = x + x_step;
    y = y + y_step;    
    
  }
}

function drawCustomShape(shapeArchetype, color) {
  for (let j = 0; j < layers; j += 1) {
    let shape = polygon(shapeArchetype, 1)
    fill(color)
    beginShape();
    for (let i of shape) {
      vertex(i.x, i.y)
    }
    
    //blendMode('darken');
    let pxmax = getXmax(shape);
    let pymax = getYmax(shape);
    
    for (let k = 0; k < 100; k += 1) {
      let px = random(0, pxmax);
      let py = random(0, pymax);
      let wh = Math.abs(randomGaussian(pxmax, 0.03) - randomGaussian(pxmax, 0.02)) * 1000;
      
      ellipse(px, py, wh, wh);  
    }
    
    endShape(CLOSE);
  }
}

function getXmax(shape) {
  let retX = shape[0].x;
  for (let i = 0; i < shape.length; i += 1) {
    if (retX < shape[i].x)
      retX = shape[i].x;
  }
  return retX;
}

function getYmax(shape) {
  let retY = shape[0].y;
  for (let i = 0; i < shape.length; i += 1) {
    if (retY < shape[i].y)
      retY = shape[i].y;
  }
  return retY;
}

function polygon(currentShape, dep) {
  if (dep >= 7) {
    return currentShape
  } else {
    const nextShape = []
    for (let i in currentShape) {
      nextShape.push(currentShape[i])
      let next = int(i) + 1
      try {
        const midVector = createVector( (currentShape[next].x + currentShape[i].x) / 2
          , (currentShape[next].y + currentShape[i].y) / 2)
        const dx = randomGaussian(0, st_deviation)
        const dy = randomGaussian(0, st_deviation)
        midVector.add(dx, dy)
        nextShape.push(midVector)
      } catch(e) {
        // Handle end of array
        const midVector = createVector( (currentShape[0].x + currentShape[i].x) / 2
          , (currentShape[0].y + currentShape[i].y) / 2)
        const dx = randomGaussian(0, st_deviation)
        const dy = randomGaussian(0, st_deviation)
        midVector.add(dx, dy)
        nextShape.push(midVector)
      }
    }
    return polygon(nextShape, dep + 1)

  }
}

function clickOnSave() {
  saveCanvas();
}

function blobShape(startX,startY,midX,midY,minScale,maxScale,maxTranslateX,maxTranslateY) {
  push()
  fill(R.randNum(10,200),R.randNum(20,100),R.randNum(30,70), R.randNum(.1,.4))
  translate(R.randNum(-maxTranslateX,maxTranslateX)*width,R.randNum(-maxTranslateY,maxTranslateY)*height)
  scale(R.randNum(minScale,maxScale))
  
  for (let i=0; i<R.randNum(1,3); i++) {
      strokeWeight(R.randNum(.0008,.008))
      stroke(31,R.randNum(0,100),4, R.randNum(0.2,0.7))
      beginShape()
      curveTightness(R.randNum(-0.02,0.04))
      curveVertexWiggle(startX,startY)
      curveVertexWiggle(startX,startY)
      curveVertexWiggle(R.randNum(.14,.2),R.randNum(.6,.8))  
      curveVertexWiggle(R.randNum(.3,.65),R.randNum(.73,.88))
      curveVertexWiggle(midX,midY)
      curveVertexWiggle(midX,midY)
      endShape()

      beginShape()
      curveTightness(R.randNum(-.03,.04))
      curveVertexWiggle(midX,midY)
      curveVertexWiggle(midX,midY)
      curveVertexWiggle(.6,.22)
      curveVertexWiggle(startX,startY)
      curveVertexWiggle(startX,startY)
      endShape()
  }  

  pop()
}

function curveVertexWiggle(px, py) {
  let pRange = R.randNum(.005,.01)
  px += R.randNum(-pRange,pRange)
  py += R.randNum(-pRange,pRange)
  return curveVertex(px,py)
}

// Foundation stuff from here down

class Random {
  constructor(seed) {
      this.seed = seed
      this.originalSeed = seed
  }
  randDec() {
      this.seed ^= this.seed << 13
      this.seed ^= this.seed >> 17
      this.seed ^= this.seed << 5
      return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
  }
  randNum(a, b) {
      return a+(b-a)*this.randDec()
  }
  randInt(a, b) {
      return Math.floor(this.randNum(a, b+1))
  }

  reset() {
      this.seed = this.originalSeed
  }
}

function random_hash() {
  let x = "0123456789abcdef", hash = '0x'
  for (let i = 64; i > 0; --i) {
    hash += x[Math.floor(Math.random()*x.length)]
  }
  return hash
}

tokenData = {
  //hash: "0x11ac16678959949c12d5410212301960fc496813cbc3495bf77aeed738579738", 
  hash: random_hash(),
  tokenId: "123000456"
}

function windowResized() {
  tempHeight = window.innerHeight
  tempWidth = tempHeight*ratio
  const dim = Math.min(tempWidth, tempHeight)
  M = dim / defaultSize
  console.log(`M: ${M}`)
  R.reset()
  resizeCanvas(tempWidth, tempHeight);
}

const defaultSize = 1000
const ratio = 1.77
let tempHeight = window.innerHeight
let tempWidth = tempHeight*ratio
let dim = Math.min(tempWidth, tempHeight)
let M = dim / defaultSize
console.log(`M: ${M}`)

const seed = parseInt(tokenData.hash.slice(0, 16), 16)
console.log(`Seed: ${seed}`)
const R = new Random(seed)