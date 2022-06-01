var ww = 600;
var hh = 720;

let canvas;

function setup(){
    canvas = createCanvas(ww, hh);
}
function draw(){
    // size(500,500);
    background(0);
    fill(255);//barbilla
    strokeWeight(5);
    stroke(72,70,72);
    ellipse(250,226.26,120,120);
    fill(255,219,250);//braç esquerra
    noStroke();
    smooth(3);
    ellipse(186.76,314.42,52,52);
    quad(160.77,309.8,210.79,324.34,179.06,401.24,150.31,393.59);
    ellipse(164.99,394.23,30,30);
    fill(255);
    ellipse(164.99,394.23,20,20);
    fill(255,219,250);
    noStroke();
    smooth(3);
    ellipse(221.49,320.27,122.44,122.44);
    fill(255,219,250);//braç dret
    noStroke();
    smooth(3);
    ellipse(313.64,314.42,52,52);
    quad(339.43,309.8,289.61,324.34,321.35,401.24,350.09,393.59);
    ellipse(335.21,394.23,30,30);
    fill(255);
    ellipse(335.21,394.23,20,20);
    fill(255,219,250);
    noStroke();
    smooth(3);
    ellipse(278.91,320.27,122.44,122.44);
    fill(255);//cos
    noStroke();
    ellipse(250.53,373.82,147.77,147.77);
    triangle(179.95,354.1,248.08,105.8,321.36,352.81);
    fill(255);//cabeza
    smooth(2);
    stroke(225);
    strokeWeight(3);
    ellipse(250,227,119.64,119.65);
    noStroke();
    ellipse(250,165.675,122.65,122.65);
    rect(188.675,165.675,122.65,61.325);
    fill(230);//ojo izq
    noStroke();
    ellipse(210,175,36,36);
    fill(103,141,216);
    stroke(15,60,147);
    strokeWeight(2);
    ellipse(210,175,25,25);
    fill(0);
    noStroke();
    ellipse(210,175,15,15);
    fill(255);
    noStroke();
    ellipse(217,182,5,5);
    fill(230);//ojo derecho
    noStroke();
    ellipse(287,175,36,36);
    fill(103,141,216);
    stroke(15,60,147);
    strokeWeight(2);
    ellipse(287,175,25,25);
    fill(0);
    noStroke();
    ellipse(287,175,15,15);
    fill(255);
    noStroke();
    ellipse(294,182,5,5);
    fill(255,216,251);//nariz
    smooth(10);
    stroke(255,234,253);
    strokeWeight(2);
    ellipse(250,227,60,60);
    fill(0);//boca
    stroke(75,75,75);
    rect(235,225,30,7,3);
    /*fill(255);//orella esquerra
    noStroke();
    ellipse(171.64,43.17,44,44);
    quad(154.16,56.52,189.13,29.82,241.95,118.97,203.1,134.69);
    fill(255,216,251);
    smooth();
    strokeWeight(3);
    stroke(255,234,253);
    ellipse(171.64,43.17,28,28);*/
    noFill();
    strokeWeight(50);
    stroke(255);
    curve(139.2,94.04,177.97,63.96,220.19,108.15,223.63,136.56);
    fill(255,173,235);
    strokeWeight(15);
    stroke(255,214,245);
    curve(139.2,94.04,177.97,63.96,220.19,108.15,223.63,136.56);
    fill(255);//orella dreta
    /*noStroke();
    ellipse(325.14,43.17,44,44);
    quad(342.63,56.52,306.82,31.89,255.46,118.97,294.31,134.69);
    fill(255,216,251);
    smooth();
    strokeWeight(3);
    stroke(255,234,253);
    ellipse(325.14,43.17,28,28);*/
    noFill();
    strokeWeight(50);
    stroke(255);
    curve(360.8,94.67,322.03,63.34,279.81,108.15,276.37,136.56);
    fill(255,173,235);
    strokeWeight(15);
    stroke(255,214,245);
    curve(360.8,94.67,322.03,63.34,279.81,108.15,276.37,136.56);
    fill(255,216,251);//panxa
    stroke(255,234,253);
    strokeWeight(8);
    smooth(10);
    ellipse(250.53,364,95.5,117);
    fill(255);//pota esquerra
    stroke(255);
    quad(195.65,418.65,202.86,459.35,232.67,459.53,239.53,442.72);
    fill(255);//pota dreta
    stroke(255);
    quad(304.42,417.9,261.5,442.56,269.23,459.27,297.78,458.69);
    fill(255,216,251);
    stroke(255,216,251);
    rect(206.28,453.39,25.27,3.73,2);
    rect(271.18,453.39,25.27,3.73,2);
    /*prova*/
}