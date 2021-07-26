class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    
    let x = w * this.i;
    let y = w * this.j;

    let top = new Wall(x, y, x + w, y);
    let left = new Wall(x, y, x, y + w);
    let bottom = new Wall(x, y + w, x + w, y + w);
    let right = new Wall(x + w, y + w, x + w, y);
    this.walls = [top, left, bottom, right];
  }

  show() {
    strokeWeight(4);
    let x = w * this.i;
    let y = w * this.j;

    if (this.walls[0]) {
      this.walls[0].show();
    }
    if (this.walls[1]) {
      this.walls[1].show();
    }
    if (this.walls[2]) {
      this.walls[2].show();
    }
    if (this.walls[3]) {
      this.walls[3].show();
    }

    
  }

  deleteWalls(next) {
    if (this.i - next.i == 1) {
      this.walls[1] = undefined;
      next.walls[3] = undefined;
    }

    if (this.i - next.i == -1) {
      this.walls[3] = undefined;
      next.walls[1] = undefined;
    }

    if (this.j - next.j == 1) {
      this.walls[0] = undefined;
      next.walls[2] = undefined;
    }

    if (this.j - next.j == -1) {
      this.walls[2] = undefined;
      next.walls[0] = undefined;
    }
  }

  getNeighbors() {
    var unvisited = [];

    var top = grid[index(this.i, this.j - 1)];
    var right = grid[index(this.i + 1, this.j)];
    var bottom = grid[index(this.i, this.j + 1)];
    var left = grid[index(this.i - 1, this.j)];

    if (top && !top.visited) {
      unvisited.push(top);
    }

    if (right && !right.visited) {
      unvisited.push(right);
    }

    if (bottom && !bottom.visited) {
      unvisited.push(bottom);
    }

    if (left && !left.visited) {
      unvisited.push(left);
    }

    if (unvisited.length > 0) {
      var r = floor(random(0, unvisited.length));
      return unvisited[r];
    }

    return undefined;
  }
}
