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

    // Initialise with a seed unique to this very second
    simplex = new openSimplexNoise(
        3600 * 24 * 30 * 12 * year() +
        3600 * 24 * 30 * month() +
        3600 * 24 * day() +
        3600 * hour() +
        60 * minute() +
        second());
    
    var ec = color(255, 255, 255);
    ec.setAlpha(100);
    fill(ec);
    // noStroke();
    xoff = 0;
    yoff = 0;
    zoff += 0.002;
    for (let i = -1.5 * res / 2; i <= ww; i += res) {
        xoff += increment;
        yoff = 0;
        for (let j = -1.5 * res / 2; j <= hh; j += res) {
            yoff += increment;

            // This is where the effect is built. Only reneder some dots (chance
            // based off noise) and set dot size as function of simplex noise
            let chance = simplex.noise3D(xoff, yoff, zoff);
            if (chance > 0.3) {
                // Islands
                let r = res * (chance) * 1.3;
                ellipse(i, j, r, r);

                // Shimmery pattern
                // let r = random(res/3, res) * simplex.noise3D(xoff,yoff,zoff);

            }
        }
    }
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