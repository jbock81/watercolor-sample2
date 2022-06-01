var ww = 600;
var hh = 720;
var layerCnt = 5;
var stepsLayer = 50;
var pp = [[-200, -150], [200, -100], [0, -300], [-100, 200], [200, 350]];

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

const num_steps = 50;
const step_length = 5;

function setup() {
    // noLoop();
    // createCanvas(windowWidth, windowHeight)
    createCanvas(600, 720);
    noStroke();

    left_x = Math.round(ww * -0.5);
    right_x = Math.round(ww * 1.5);
    top_y = Math.round(hh * -0.5);
    bottom_y = Math.round(hh * 1.5);
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

    angleOffset = random(0, 360);
    map_PI = TWO_PI * random(1, 4);
    resolution = random(Math.round(ww * 0.01) / 2, Math.round(ww * 0.01))
    num_columns = Math.round((right_x - left_x) / resolution)
    num_rows = Math.round((bottom_y - top_y) / resolution)

    grid = new Array(num_columns);
    for (var i = 0; i < num_columns; i++)
        grid[i] = new Array(num_rows);

    beginShape();
    for (var column = 0; column < num_columns; column++) {
        for (var row = 0; row < num_rows; row++) {
            // angle = (row / parseFloat(num_rows)) * Math.PI
            // Processing's noise() works best when the step between
            // points is approximately 0.005, so scale down to that
            var scaled_x = parseFloat(column) * 0.01
            var scaled_y = parseFloat(row) * 0.01
            // get our noise value, between 0.0 and 1.0
            var noise_val = noise(scaled_x, scaled_y)
            // translate the noise value to an angle (betwen 0 and 2 * PI)
            angle = map(noise_val, 0.0, 1.0, 0.0, map_PI) + radians(angleOffset);
            grid[column][row] = angle
        }
    }
    var ec = color(255, 255, 255);
    ec.setAlpha(3);
    fill(ec);
    for (var i = 0; i < 20; i++) {
        var x = random(0, ww / 2);
        var y = random(0, hh / 2);
        myFlowField(x, y, num_steps);
    }
    for (var i = 0; i < 20; i++) {
        var x = random(ww / 2, ww);
        var y = random(hh / 2, hh);
        myFlowField(x, y, num_steps);
    }
    endShape();

    // saveCanvas();
    frameRate(0.5);
}

function myFlowField(x, y, num_steps) {
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

        ellipse(x, y, x_step * random(15, 20), y_step * random(15, 20));

        x = x + x_step;
        y = y + y_step;
    }
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