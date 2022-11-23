import { getItemsDictFromApi } from "../dictionary/dictionary";
import { StoreCharacters } from "../types/types";

const itemsDict = getItemsDictFromApi();

export class Store {
  private characters: StoreCharacters;
  static instance: Store | null = null;

  private constructor() {
    this.characters = {
      "1": {
        items: [itemsDict.helmet, itemsDict.helmet, itemsDict.sword],
        money: 100,
        name: "Misha",
      },
      "2": {
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

  addInventary(playerId: string, itemName: keyof typeof itemsDict) {
    this.characters[playerId].items.push(itemsDict[itemName]);
  }

  getItems(id: string) {
    return this.characters[id];
  }
}
