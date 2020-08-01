
let sizeMultiplier = 2.7;
let r;
let angle;
let step;
const timeBase = new Date('2010-01-01 00:00:00').getTime() / (1000 * 60 * 60 * 24);
const bgc = 245;
let currentDate;    


  function setup() {
    canvas =   createCanvas(3000*Math.sqrt(2), 3000);
    colorMode(  RGB, 255, 255, 255, 100);
    r = height/2-height*0.05;
    angle = 0;
    canvas.position(window.innerWidth/2 -   width/2, 75);
  }


  function mouseWheel(event) {
    if (sizeMultiplier === 1 && event.delta > 0) {
      return;
    } else if (event.delta < 0) {
      sizeMultiplier += 0.25;
    } else if (event.delta > 0) {
      sizeMultiplier -= 0.25;
    }
  }

  function draw() {
      background(bgc);
      translate(  width / 2,   height / 2);
    for (i = 0; i < data.length; i++) {
      const fraction = Math.min(1, Math.max(0, (  mouseY /   height)));
      const offset = Math.min(1, Math.max(0, (  mouseX /   width)));
      const currentTimeBase = timeBase + (offset*(1-fraction)) * 3652;
      currentDate = (new Date(data[i].date).getTime() / (1000 * 60 * 60 * 24) - timeBase)
      let currentRadius =   r - data[i].depth * 0.7;
      angle = (currentDate / 3652) * 2 *   PI;
      const offsetAngle =   PI - angle;
      if (data[i].size * sizeMultiplier <   width * 2 && angle < 2 *   PI && angle > 0) {
          noStroke();
          fill(bgc);
          ellipse(  sin(offsetAngle) * currentRadius,   cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.075);
        if (data[i].onWater === "water") {
            noFill();
            strokeWeight(data[i].size * sizeMultiplier * 0.0125);
            stroke(bgc);
            ellipse(  sin(offsetAngle) * currentRadius,   cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.05);
        }
      }
      for (c = 0; c < data[i].plate.length; c++) {
        let plc =   color(colors[data[i].plate[c]][0], colors[data[i].plate[c]][1], colors[data[i].plate[c]][2], (100 / data[i].plate.length));
        if (data[i].size * sizeMultiplier <   width * 2 && angle < 2 *   PI && angle > 0) {
            noStroke();
            fill(plc);
            ellipse(  sin(offsetAngle) * currentRadius,   cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier);
          if (data[i].onWater === "water") {
              noFill();
              strokeWeight(data[i].size * sizeMultiplier * 0.0075);
              stroke(plc);
              ellipse(  sin(offsetAngle) * currentRadius,   cos(offsetAngle) * currentRadius, data[i].size * sizeMultiplier + data[i].size * sizeMultiplier * 0.05);
          }
        }
      }
    }
    save("plakatmotiv.png");
    noLoop();
  }



