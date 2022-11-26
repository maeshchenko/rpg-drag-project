import { Inventory } from "./components/inventory/inventory";
import "./styles.scss";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const ballArr = [] as Ball[];
const BG_COLOR = "#282828";

window.onload = init;

function init() {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 500; i++) {
    ballArr[i] = new Ball(
      canvas.width / 2 + i * 20,
      canvas.height,
      i * 25 + 3,
      -i * 25 + 3
    );
  }

  // Start the first frame request
  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  clear();
  draw();

  // Keep requesting new frames
  window.requestAnimationFrame(gameLoop);
}

class Ball {
  dx = 2;
  dy = -2;
  constructor(
    protected x: number,
    protected y: number,
    dx?: number,
    dy?: number
  ) {
    if (dx) {
      this.dx = dx;
    }
    if (dy) {
      this.dy = dy;
    }
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = "#66FF66";
    ctx.fill();
    ctx.closePath();
  }
  move() {
    this.drawBall();
    if (this.x > canvas.width || this.x < 0) {
      this.dx = this.dx * -1;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dy = this.dy * -1;
    }
    this.x += this.dx;
    this.y += this.dy;
    console.log(Math.sin(this.x));
  }
}

function draw() {
  ballArr.forEach((ball) => ball.move());
}

function clear() {
  console.log(BG_COLOR);

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = BG_COLOR;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const myInventory = new Inventory();
myInventory.open("1");
myInventory.open("2");
