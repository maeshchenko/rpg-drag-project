// import { Inventory } from "./components/inventory/inventory";
import { Store } from "./store/store";
import "./styles.scss";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const BG_COLOR = "#282828";
const BORDER_COLOR = "#000000";
const BORDER_SIZE = 10;

const PLAYER_COLOR = "#66FF66";
const SELLER_COLOR = "#FFB000";

window.onload = init;

let player: Player;
let seller: Player;
let isDrawHeart = false;
const storeInstance = Store.getInstance();

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

  player = new Player();
  seller = new Seller();

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
  drawText();
  player.draw();
  seller.draw();
  if (storeInstance.checkCollisions() || isDrawHeart) {
    drawHeart();
  }
}

function clear() {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(
    BORDER_SIZE,
    BORDER_SIZE,
    canvas.width - BORDER_SIZE * 2,
    canvas.height - BORDER_SIZE * 2
  );
}

function drawText() {
  ctx.font = "48px Joustix";
  ctx.fillStyle = PLAYER_COLOR;
  ctx.fillText("Ready PLAYER 1", 270, 270);
}

function drawHeart() {
  const base_image = new Image();
  base_image.src = "assets/images/heart.png";
  ctx.drawImage(base_image, 30, 30, 25, 25);
}

class Person {
  xCoord = 0;
  yCoord = 0;
  width = 0;
  height = 0;
  name = "";
  constructor(
    private playerId: number,
    private color: string,
    protected storeInstance = Store.getInstance()
  ) {
    const { x, y } = storeInstance.getItems(playerId).coords;
    const { w, h } = storeInstance.getItems(playerId).size;
    this.name = storeInstance.getItems(playerId).name;
    this.xCoord = x;
    this.yCoord = y;
    this.width = w;
    this.height = h;
  }
  getCoord() {
    return { x: this.xCoord, y: this.yCoord };
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
    this.addTextName();
  }
  addTextName() {
    ctx.font = "10px Joustix";
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillText(this.name, this.xCoord, this.yCoord - 4);
  }
  updateCoord() {
    this.storeInstance.updateCoords(this.playerId, this.xCoord, this.yCoord);
  }
  moveX(dx: number) {
    if (
      this.xCoord + dx < canvas.width - BORDER_SIZE * 2 - this.width / 2 &&
      this.xCoord + dx > BORDER_SIZE
    ) {
      this.xCoord += dx;
      this.updateCoord();
    }
  }
  moveY(dy: number) {
    if (
      this.yCoord + dy < canvas.height - BORDER_SIZE * 2 - this.height / 2 &&
      this.yCoord + dy > BORDER_SIZE + 10
    ) {
      this.yCoord += dy;
      this.updateCoord();
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
  constructor() {
    super(1, PLAYER_COLOR);
  }
}

class Seller extends Person {
  constructor() {
    super(2, SELLER_COLOR);
  }
}

document.addEventListener("keypress", (e: KeyboardEvent) => {
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
  if (e.code === "KeyH") {
    isDrawHeart = true;
  }
  if (e.code === "KeyJ") {
    isDrawHeart = false;
  }
});
