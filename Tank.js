class Tank {
  constructor(player) {
    let randomCell = random(grid);
    this.pos = createVector(randomCell.i * w + w/2, randomCell.j * w + w/2);
    this.lastPos = createVector(random(0, width), random(0, height));
    this.dir = createVector(0, 1);
    this.dir.normalize();
    this.angle = this.dir.heading();
    this.speed = 1.5;
    this.player = player;
    this.balls = 5;
  }

  show() {
    push();
    if (this.player == 1) {
      fill(200, 10, 10);
      stroke(200, 10, 10,235);
    }
    if (this.player == 2) {
      fill(100, 200, 10);
      stroke(100, 200,10,235);
    }
    strokeWeight(1);
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    angleMode(DEGREES);
    rotate(this.angle);
    rect(0, 0, 20, 20);
    strokeWeight(4);
    line(0, 0, 18, 0);
    pop();
  }

  updateAngle() {
    return p5.Vector.fromAngle(radians(this.angle), 1);
  }

  coll(w) {
    if (w.y1 == w.y2) {
      if (this.pos.x < w.x2 && this.pos.x > w.x1) {
        if (
          this.pos.y - 8 < w.y1 + this.speed * 2 &&
          this.pos.y  + 8 > w.y1 - this.speed * 2
        ) {
          this.pos = this.lastPos;
        }
      }
    }

    if (w.x1 == w.x2) {
      if (this.pos.y < w.y2 && this.pos.y > w.y1) {
        if (
          this.pos.x - 8 < w.x1 + this.speed && 
          this.pos.x + 8 > w.x1 - this.speed) {
          this.pos = this.lastPos;
        }
      }
    }
  }

  checkBallCollision(b) {
    if (dist(this.pos.x, this.pos.y, b.pos.x, b.pos.y) < 10 && b.deadly) {
      b.life = 0;
      return true;
    }
    return false;
  }

  shoot() {
    if(this.balls > 0)
      {  
        balls.push(new Ball(this.pos.x, this.pos.y, this.dir, this.player));
        this.balls--;
      }
  }

  move() {
    if (this.player == 1) {
      this.dir = this.updateAngle();

      if (keyIsDown(LEFT_ARROW)) {
        this.angle -= 3;
      }

      if (keyIsDown(RIGHT_ARROW)) {
        this.angle += 3;
      }

      if (keyIsDown(UP_ARROW)) {
        this.lastPos = this.pos
          .copy()
          .add(this.dir.copy().mult(-this.speed + this.speed));
        this.pos.add(this.dir.copy().mult(this.speed));
      }

      if (keyIsDown(DOWN_ARROW)) {
        this.lastPos = this.pos
          .copy()
          .add(this.dir.copy().mult(this.speed + this.speed));
        this.pos.add(this.dir.copy().mult(-this.speed));
      }
    }

    if (this.player == 2) {
      this.dir = this.updateAngle();

      if (keyIsDown(65)) {
        this.angle -= 3;
      }

      if (keyIsDown(68)) {
        this.angle += 3;
      }

      if (keyIsDown(87)) {
        this.lastPos = this.pos
          .copy()
          .add(this.dir.copy().mult(-this.speed + this.speed));
        this.pos.add(this.dir.copy().mult(this.speed));
      }

      if (keyIsDown(83)) {
        this.lastPos = this.pos
          .copy()
          .add(this.dir.copy().mult(this.speed + this.speed));
        this.pos.add(this.dir.copy().mult(-this.speed));
      }
    }
  }
  
  reset()
  {
    this.pos = createVector(random(0, width), random(0, height));
  }
  
  
}
