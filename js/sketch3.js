var ww = 600;
var hh = 720;
var layerCnt = 5;
var stepsLayer = 50;
var pp = [[-200, -150], [200, -100], [0, -300], [-100, 200], [200, 350]];

let increment = 0.05; // Spatial noise increment
let alpha = 255;

// Noise offsets
let xoff = 0.0;
let yoff = 0.0;
let zoff = 0.0;

// Resolution: nominal dot size
let res = 5;
let rows, cols;

function setup() {
    // noLoop();
    // createCanvas(windowWidth, windowHeight)
    createCanvas(600, 720);
    noStroke();


}

/*
fill(209, 49, 89, 10)
fill(238, 255, 0, 10)
*/

function draw() {
    colorMode(RGB);
    blendMode(NORMAL);
    var fill_colors = new Array(layerCnt);
    for (var fcn = 0; fcn < layerCnt; fcn++) {
        fill_colors[fcn] = new Object;
        fill_colors[fcn].rr = random(1, 255);
        fill_colors[fcn].gg = random(1, 255);
        fill_colors[fcn].bb = random(1, 255);
    }

    var layerLen = 0;
    var myLayers = new Array(layerCnt);
    for (fcn = 0; fcn < layerCnt; fcn++) {
        myLayers[fcn] = new Array(stepsLayer).fill().map((x, i) => deform(poly(random(200, 300), noise(i) * 20), 8, 0.5));
        layerLen += stepsLayer;
    }

    push();
    // translate(width / 2, height / 2)
    translate(ww / 2, hh / 2);
    background(250, 225, 195);
    let std = random(10, 30); //20  
    for (let i = 0; i < layerLen; i++) {
        var idxLayer = Math.floor(i / 5) % layerCnt;
        fill(fill_colors[idxLayer].rr, fill_colors[idxLayer].gg, fill_colors[idxLayer].bb, 10);
        push();
        translate(randomGaussian(0, std) + pp[idxLayer][0], randomGaussian(0, std) + pp[idxLayer][1]);
        drawPoly(myLayers[idxLayer][i % stepsLayer]);
        pop();
    }
    pop();

    colorMode(HSB);
    blendMode(SCREEN);
    for (let i = 0; i < 20; i++) {
        blobShape(R.randNum(0, .4), R.randNum(0, .4), R.randNum(.6, .8), R.randNum(.62, .82), 60, 100, 1, 1);
    }

    blendMode(OVERLAY);
    for (let i = 0; i < 20; i++) {
        blobShape(R.randNum(0, .4), R.randNum(0, .4), R.randNum(.6, .8), R.randNum(.62, .82), 80, 120, 1, 1);
    }
    
    blendMode(BLEND);
    for (let i = 0; i < 20; i++) {
        blobShape(R.randNum(0, .4), R.randNum(0, .4), R.randNum(.6, .8), R.randNum(.62, .82), 100, 140, 1, 1);
    }

    blendMode(OVERLAY);
    for (let i = 0; i < 20; i++) {
        blobShape(R.randNum(0, .4), R.randNum(0, .4), R.randNum(.6, .8), R.randNum(.62, .82), 120, 160, 1, 1);
    }

    blendMode(SCREEN);
    for (let i = 0; i < 20; i++) {
        blobShape(R.randNum(0, .4), R.randNum(0, .4), R.randNum(.6, .8), R.randNum(.62, .82), 140, 200, 1, 1);
    }
    
    // blendMode(BLEND)
    // saveCanvas();
    frameRate(0.5);
}

function rep(fn, d, n) {
    let res = d
    for (let i = 0; i < n; i++) res = fn(res)
    return res
}

function deform(poly, n, variance) {
    if (n == 0) return poly
    let res = []
    for (let i = 0; i < poly.length - 1; i++) {
        let curr = poly[i].slice()
        let next = poly[i + 1].slice()
        let len = Math.sqrt(Math.pow(curr[0] - next[0], 2),
            Math.pow(curr[1] - next[1], 2))
        let mid = [(curr[0] + next[0]) / 2, (curr[1] + next[1]) / 2];
        mid[0] = randomGaussian(mid[0], variance * len)
        mid[1] = randomGaussian(mid[1], variance * len)
        let inner = deform([curr, mid, next], n - 1,
            variance)
        res = res.concat(inner)
    }
    return res
}

function poly(radius, n) {
    let res = []
    radius = radius || 30.0
    n = n || 6
    let angle = (Math.PI * 2) / n
    for (let i = 0; i < n; i++) {
        res.push([Math.sin(i * angle) * radius,
        Math.cos(i * angle) * radius])
    }
    return res
}

function drawPoly(poly) {
    beginShape()
    for (let pt of poly) vertex(pt[0], pt[1])
    endShape(CLOSE)
}



function windowResized() {
    resizeCanvas(ww + 10, hh + 10);
    rows = hh / res;
    cols = ww / res;
}

function blobShape(startX, startY, midX, midY, minScale, maxScale, maxTranslateX, maxTranslateY) {
    push();
    fill(R.randNum(10, 200), R.randNum(20, 100), R.randNum(30, 70), R.randNum(.1, .4));
    translate(R.randNum(-maxTranslateX, maxTranslateX) * ww, R.randNum(-maxTranslateY, maxTranslateY) * hh);
    scale(R.randNum(minScale, maxScale));

    for (let i = 0; i < R.randNum(1, 3); i++) {
        strokeWeight(R.randNum(.0008, .008));
        stroke(31, R.randNum(0, 100), 4, R.randNum(0.2, 0.7));
        beginShape();
        curveTightness(R.randNum(-0.02, 0.04));
        curveVertexWiggle(startX, startY);
        curveVertexWiggle(startX, startY);
        curveVertexWiggle(R.randNum(.14, .2), R.randNum(.6, .8));
        curveVertexWiggle(R.randNum(.3, .65), R.randNum(.73, .88));
        curveVertexWiggle(midX, midY);
        curveVertexWiggle(midX, midY);
        endShape();

        beginShape();
        curveTightness(R.randNum(-.03, .04));
        curveVertexWiggle(midX, midY);
        curveVertexWiggle(midX, midY);
        curveVertexWiggle(.6, .22);
        curveVertexWiggle(startX, startY);
        curveVertexWiggle(startX, startY);
        endShape();
    }

    pop();
}

function curveVertexWiggle(px, py) {
    let pRange = R.randNum(.005, .01);
    px += R.randNum(-pRange, pRange);
    py += R.randNum(-pRange, pRange);
    return curveVertex(px, py);
}

// Foundation stuff from here down

class Random {
    constructor(seed) {
        this.seed = seed;
        this.originalSeed = seed;
    }
    randDec() {
        this.seed ^= this.seed << 13;
        this.seed ^= this.seed >> 17;
        this.seed ^= this.seed << 5;
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000;
    }
    randNum(a, b) {
        return a + (b - a) * this.randDec();
    }
    randInt(a, b) {
        return Math.floor(this.randNum(a, b + 1));
    }

    reset() {
        this.seed = this.originalSeed;
    }
}

function random_hash() {
    let x = "0123456789abcdef";
    let hash = '0x';
    for (let i = 64; i > 0; --i) {
        hash += x[Math.floor(Math.random() * x.length)];
    }
    return hash;
}

tokenData = {
    //hash: "0x11ac16678959949c12d5410212301960fc496813cbc3495bf77aeed738579738", 
    hash: random_hash(),
    tokenId: "123000456"
};

function windowResized() {
    const dim = Math.min(ww, hh);
    M = dim / defaultSize;
    // console.log(`M: ${M}`);
    R.reset();
    resizeCanvas(ww, hh);
}

const defaultSize = 1000;
const ratio = 1.77;
let dim = Math.min(ww, hh);
let M = dim / defaultSize;
// console.log(`M: ${M}`);

const seed = parseInt(tokenData.hash.slice(0, 16), 16);
// console.log(`Seed: ${seed}`);
const R = new Random(seed);