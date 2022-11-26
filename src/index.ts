// import { Inventory } from "./components/inventory/inventory";
import "./styles.scss";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const BG_COLOR = "#282828";
const BORDER_COLOR = "#000000";
const BORDER_SIZE = 10;

const PLAYER_COLOR = "#9ccc9c";
const SELLER_COLOR = "#2b5329";

window.onload = init;

let player: Player;
let seller: Player;

function init() {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.fillStyle = BORDER_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(
    BORDER_SIZE,
    BORDER_SIZE,
    canvas.width - BORDER_SIZE * 2,
    canvas.height - BORDER_SIZE * 2
  );

  player = new Player(PLAYER_COLOR);
  seller = new Seller(SELLER_COLOR);

  // Start the first frame request
  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  clear();
  draw();

  // Keep requesting new frames
  window.requestAnimationFrame(gameLoop);
}

function draw() {
  // console.log("drawing");

  player.draw();
  seller.draw();
}

function clear() {
  // console.log("clearing");
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(
    BORDER_SIZE,
    BORDER_SIZE,
    canvas.width - BORDER_SIZE * 2,
    canvas.height - BORDER_SIZE * 2
  );
}

class Person {
  constructor(
    private color: string,
    private xCoord: number,
    private yCoord: number,
    private sizeX = 20,
    private sizeY = 30
  ) {
    console.log("Person class is initiated");
    console.log("My color is: ", this.color);
  }
  getCoord() {
    return { x: this.xCoord, y: this.yCoord };
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xCoord, this.yCoord, this.sizeX, this.sizeY);
  }
  moveX(dx: number) {
    if (
      this.xCoord + dx < canvas.width - BORDER_SIZE * 2 - this.sizeX / 2 &&
      this.xCoord + dx > BORDER_SIZE
    ) {
      this.xCoord += dx;
    }
  }
  moveY(dy: number) {
    if (
      this.yCoord + dy < canvas.height - BORDER_SIZE * 2 - this.sizeY / 2 &&
      this.yCoord + dy > BORDER_SIZE
    ) {
      this.yCoord += dy;
    }
  }
  moveUp() {
    this.moveY(-10);
  }
  moveDown() {
    this.moveY(10);
  }
  moveLeft() {
    this.moveX(-10);
  }
  moveRight() {
    this.moveX(10);
  }
}

class Player extends Person {
  constructor(color: string) {
    super(color, canvas.width / 2, canvas.height - BORDER_SIZE * 2 - 20);
    console.log("Player is initiated.");
  }
}

class Seller extends Person {
  constructor(color: string) {
    super(color, BORDER_SIZE, BORDER_SIZE);
    console.log("Seller is initiated.");
  }
}

document.addEventListener("keypress", (e: KeyboardEvent) => {
  console.log(e.code);
  if (e.code === "KeyW") {
    player.moveUp();
  }
  if (e.code === "KeyS") {
    player.moveDown();
  }
  if (e.code === "KeyA") {
    player.moveLeft();
  }
  if (e.code === "KeyD") {
    player.moveRight();
  }
});
