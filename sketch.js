let sizeMultiplier = 1;
let r;
let angle;
let step;
const timeBase = new Date('2010-01-01 00:00:00').getTime() / (1000 * 60 * 60 * 24);

function setup() {
  createCanvas(1920, 1080);
  colorMode(RGB, 255, 255, 255, 100);
  r = 500;
  angle = 0;
}

function mouseWheel(event) {
  print(event.delta);
  if (sizeMultiplier === 1 && event.delta > 0) {
    return;
  } else if (event.delta < 0) {
    sizeMultiplier += 0.25;
  } else if (event.delta > 0) {
    sizeMultiplier -= 0.25;
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  for (i = 0; i < data.length; i++) {
    let currentDate = new Date(data[i].date).getTime() / (1000 * 60 * 60 * 24);
    const fraction = Math.min(1, Math.max(0, (mouseY / height)));
    const offset = Math.min(1, Math.max(0, (mouseX / width)));
    const currentTimeBase = timeBase + (offset*(1-fraction)) * 3652;
    currentDate = (currentDate - currentTimeBase)
    let currentRadius = r - data[i].depth * 0.25;
    angle = (currentDate / 3652) / fraction * 2 * PI;
    const offsetAngle = PI - angle;
    if (data[i].size * sizeMultiplier < width * 2 && angle < 2 * PI && angle > 0) {
      noStroke();
      fill(255);
      ellipse(sin(offsetAngle) * currentRadius, cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.075);
      if (data[i].onWater === "water") {
        noFill();
        strokeWeight(data[i].size * sizeMultiplier * 0.0125);
        stroke(255);
        ellipse(sin(offsetAngle) * currentRadius, cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.05);
      }
    }

    for (c = 0; c < data[i].plate.length; c++) {
      let plc = color(colors[data[i].plate[c]][0], colors[data[i].plate[c]][1], colors[data[i].plate[c]][2], (100 / data[i].plate.length));

      if (data[i].size * sizeMultiplier < width * 2 && angle < 2 * PI && angle > 0) {
        noStroke();
        fill(plc);
        ellipse(sin(offsetAngle) * currentRadius, cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier);
        if (data[i].onWater === "water") {
          noFill();
          strokeWeight(data[i].size * sizeMultiplier * 0.0075);
          stroke(plc);
          ellipse(sin(offsetAngle) * currentRadius, cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.05);
        }
      }
    }
  }
}