import { getItemsDictFromApi } from "../dictionary/dictionary";
import { StoreCharacters } from "../types/types";

const itemsDict = getItemsDictFromApi();

export class Store {
  private characters: StoreCharacters;
  private activePlayers = [0, 1];
  static instance: Store | null = null;

  private constructor() {
    this.characters = {
      1: {
        coords: { x: 512, y: 728 },
        size: { w: 20, h: 30 },
        items: [itemsDict.helmet, itemsDict.helmet, itemsDict.sword],
        money: 100,
        name: "Misha",
      },
      2: {
        coords: { x: 22, y: 28 },
        size: { w: 20, h: 30 },
        items: [itemsDict.helmetSilver, itemsDict.swordSilver],
        money: 120,
        name: "Natasha",
      },
    };
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new Store();
      return this.instance;
    }
  }

  addInventary(playerId: number, itemName: keyof typeof itemsDict) {
    this.characters[playerId].items.push(itemsDict[itemName]);
  }

  getItems(id: number) {
    return this.characters[id];
  }

  updateCoords(id: number, x: number, y: number) {
    this.characters[id].coords.x = x;
    this.characters[id].coords.y = y;
    console.log("updating...");
    this.checkCollisions();
  }

  getActivePlayers() {
    return this.activePlayers;
  }

  setActivePlayers(newPlayersArr: number[]) {
    this.activePlayers = newPlayersArr;
  }

  checkCollisions(): boolean {
    const {
      coords: { x: x1, y: y1 },
    } = this.getItems(1);
    const {
      size: { w: width2, h: height2 },
      coords: { x: x2, y: y2 },
    } = this.getItems(2);
    if (x2 + width2 > x1 && y2 + height2 > y1) {
      return true;
    }
    return false;
  }
}
