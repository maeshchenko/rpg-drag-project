// import { Inventory } from "./components/inventory/inventory";
import { Store } from "./store/store";
import "./styles.scss";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let BG_COLOR = "#282828";
const BORDER_COLOR = "#000000";
const BORDER_SIZE = 10;

const PLAYER_COLOR = "#66FF66";
const SELLER_COLOR = "#FFB000";

window.onload = init;

let player: Player;
let seller: Seller;
let isDrawHeart = false;
let initialText = "READY PLAYER 1";
let isTradingEnable = false;
let isRealisticMode = false;

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

  seller = new Seller();
  player = new Player();

  new Promise((res) =>
    setTimeout(() => {
      initialText = "Play with WASD arrows";
      res("ok!");
    }, 2000)
  )
    .then(() => {
      setTimeout(() => {
        initialText = "Good luck!";
      }, 2000);
    })
    .then(() => {
      setTimeout(() => {
        initialText = "";
      }, 2000);
    });

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
  seller.draw();
  if (storeInstance.checkCollisions() || isDrawHeart) {
    drawHeart();
  }
  player.draw();
  if (storeInstance.checkCollisions()) {
    if (isTradingEnable != true) {
      isTradingEnable = true;
    }
  } else {
    if (isTradingEnable != false) {
      isTradingEnable = false;
    }
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
  ctx.fillStyle = PLAYER_COLOR;
  ctx.font = "48px Joustix";
  ctx.fillText(
    initialText,
    canvas.width / 2 - ctx.measureText(initialText).width / 2,
    270
  );
}

function drawHeart() {
  const heart_image = new Image();
  heart_image.src = "assets/images/heart.png";
  if (!isRealisticMode) {
    ctx.drawImage(heart_image, 30, 30, 25, 25);
  } else {
    ctx.drawImage(heart_image, 80, 70, 25, 25);
  }
}

class Person {
  xCoord = 0;
  yCoord = 0;
  width = 0;
  height = 0;
  name = "";
  playerFrame = 0;
  sellerFrame = 0;
  constructor(
    protected playerId: number,
    protected color: string,
    protected storeInstance = Store.getInstance()
  ) {
    const { x, y } = storeInstance.getItems(playerId).coords;
    const { w, h } = storeInstance.getItems(playerId).size;
    this.name = storeInstance.getItems(playerId).name;
    this.xCoord = x;
    this.yCoord = y;
    this.width = w;
    this.height = h;
    this.changeSellerFrame();
  }
  changeSellerFrame() {
    setTimeout(() => {
      if (this.sellerFrame === 3) {
        this.sellerFrame = 0;
      } else {
        this.sellerFrame++;
      }
      // Again
      this.changeSellerFrame();

      // Every 3 sec
    }, 300);
  }
  getCoord() {
    return { x: this.xCoord, y: this.yCoord };
  }
  draw() {
    if (!isRealisticMode) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
      this.addTextName();
    } else {
      if (this.playerId === 1) {
      } else {
      }
    }
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
      if (this.playerFrame === 3) {
        this.playerFrame = 0;
      } else {
        this.playerFrame++;
      }
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
  draw() {
    if (isRealisticMode) {
      const player_image = new Image();
      player_image.src = `assets/images/player_${this.playerFrame}.png`;
      ctx.drawImage(
        player_image,
        this.xCoord,
        this.yCoord - 100,
        this.width + 60,
        this.height + 60
      );
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
      this.addTextName();
    }
  }
}

class Seller extends Person {
  constructor() {
    super(2, SELLER_COLOR);
  }
  draw() {
    if (isRealisticMode) {
      const seller_image = new Image();
      seller_image.src = `assets/images/sellerBest_${this.sellerFrame}.png`;
      ctx.drawImage(
        seller_image,
        this.xCoord,
        this.yCoord,
        this.width + 60,
        this.height + 60
      );
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
      this.addTextName();
    }
  }
  playText() {
    console.log("YEAP!");
    ctx.font = "18px Joustix";
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillText("ПРИВЕТ, СТРАННИК", 70, 70);
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
  if (e.code === "KeyZ") {
    isRealisticMode = true;
    BG_COLOR = "#807e7e";

    initialText = "Realistic mode: on";
    setTimeout(function () {
      initialText = "";
    }, 500);
    setTimeout(function () {
      initialText = "Realistic mode: on";
    }, 1000);
    setTimeout(function () {
      initialText = "";
    }, 1500);
    setTimeout(function () {
      initialText = "Realistic mode: on";
    }, 2000);
    setTimeout(function () {
      initialText = "";
    }, 2500);
  }
  if (e.code === "KeyX") {
    seller.playText();
  }
});
