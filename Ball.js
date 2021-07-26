class Ball {
  constructor(x, y, dir, player) {
    this.pos = createVector(x, y);
    this.dir = dir;
    this.dir.normalize();
    this.player = player
    this.speed = 3;
    this.life = 500;
    this.deadly = false;
    this.flag = true;
  }

  async coll(w) {
    if (!this.flag) {
      await sleep(20);
      this.flag = true;
    }
    if (w.y1 == w.y2) {
      if (this.pos.x < w.x2 && this.pos.x > w.x1) {
        if (
          this.pos.y < w.y1 + this.speed &&
          this.pos.y > w.y1 - this.speed &&
          this.flag
        ) {
          this.dir.y = -this.dir.y;
          this.life--;
          this.flag = false;
        }
      }
    }

    if (w.x1 == w.x2) {
      if (this.pos.y < w.y2 && this.pos.y > w.y1) {
        if (
          this.pos.x < w.x1 + this.speed &&
          this.pos.x > w.x1 - this.speed &&
          this.flag
        ) {
          this.dir.x = -this.dir.x;
          this.life--;
          this.flag = false;
        }
      }
    }
  }

 move() {
    this.pos.add(this.dir.copy().mult(this.speed));
    this.life--;
   if(this.life < 493)
     {
       this.deadly = true;
     }
  }

  show() {
    if (this.life > 0) {
      strokeWeight(1);
      if(this.player == 1)
      {
         fill(150,0,0);
      }
      if(this.player == 2)
      {
         fill(0,150,0);
      }
      circle(this.pos.x, this.pos.y, 5);
    }
  }
}
