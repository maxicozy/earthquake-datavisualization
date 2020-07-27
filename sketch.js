let sizeMultiplier = 1;
let r;
let angle;
let step;
const timeBase = new Date('2010-01-01 00:00:00').getTime() / (1000 * 60 * 60 * 24);
const bgc = 245;
let currentDate;


const sketch1 = function(p) {
  p.setup = function() {
  p.canvas = p.createCanvas(1100*Math.sqrt(2), 1100);
  p.colorMode(p.RGB, 255, 255, 255, 100);
  p.r = 500;
  p.angle = 0;
  p.canvas.position(window.innerWidth/2 - p.width/2, 75);
  }

  p.mouseWheel = function(event) {
    if (sizeMultiplier === 1 && event.delta > 0) {
      return;
    } else if (event.delta < 0) {
      sizeMultiplier += 0.25;
    } else if (event.delta > 0) {
      sizeMultiplier -= 0.25;
    }
  }

  p.draw = function() {
    p.background(bgc);
    p.translate(p.width / 2, p.height / 2);
    for (i = 0; i < data.length; i++) {
      const fraction = Math.min(1, Math.max(0, (p.mouseY / p.height)));
      const offset = Math.min(1, Math.max(0, (p.mouseX / p.width)));
      const currentTimeBase = timeBase + (offset*(1-fraction)) * 3652;
      currentDate = (new Date(data[i].date).getTime() / (1000 * 60 * 60 * 24) - currentTimeBase)
      let currentRadius = p.r - data[i].depth * 0.25;
      angle = (currentDate / 3652) / fraction * 2 * p.PI;
      const offsetAngle = p.PI - angle;
      if (data[i].size * sizeMultiplier < p.width * 2 && angle < 2 * p.PI && angle > 0) {
        p.noStroke();
        p.fill(bgc);
        p.ellipse(p.sin(offsetAngle) * currentRadius, p.cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.075);
        if (data[i].onWater === "water") {
          p.noFill();
          p.strokeWeight(data[i].size * sizeMultiplier * 0.0125);
          p.stroke(bgc);
          p.ellipse(p.sin(offsetAngle) * currentRadius, p.cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.05);
        }
      }
      for (c = 0; c < data[i].plate.length; c++) {
        let plc = p.color(colors[data[i].plate[c]][0], colors[data[i].plate[c]][1], colors[data[i].plate[c]][2], (100 / data[i].plate.length));
        if (data[i].size * sizeMultiplier < p.width * 2 && angle < 2 * p.PI && angle > 0) {
          p.noStroke();
          p.fill(plc);
          p.ellipse(p.sin(offsetAngle) * currentRadius, p.cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier);
          if (data[i].onWater === "water") {
            p.noFill();
            p.strokeWeight(data[i].size * sizeMultiplier * 0.0075);
            p.stroke(plc);
            p.ellipse(p.sin(offsetAngle) * currentRadius, p.cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.05);
          }
        }
      }
    }
  }
}

const sketch2 = function(p) {
  p.setup = function() {
    p.canvas = p.createCanvas (1100*Math.sqrt(2), 50)
    p.canvas.position(window.innerWidth/2-p.width/2, 1175);
  }

  p.draw = function() {
    p.background(255);
    p.push();
    p.stroke(100);
    p.strokeWeight(2);
    p.line(0, 0, p.width, 0);
    p.line(p.map(currentDate/3652, 0.9163112107520989, -0.08368878924790167, 1, p.width, 1), 0, p.map(currentDate/3652, 0.9163112107520989, -0.08368878924790167, 1, p.width, 1), 50);
    p.line(p.map(currentDate/3652, 0.9163112107520989, -0.08368878924790167, 0, p.width, 1)+p.map(vis.mouseY, 0, vis.height, 0, p.width-1.5, 1), 0, p.map(currentDate/3652, 0.9163112107520989, -0.08368878924790167, 0, p.width, 1)+p.map(vis.mouseY, 0, vis.height, 0, p.width-1.5, 1), 50);
    p.pop();
  }
}

const vis = new p5(sketch1);
const slider = new p5(sketch2);



