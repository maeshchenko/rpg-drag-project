import "./styles.scss";

enum Items {
  Sword = "sword",
  SwordSilver = "sword--silver",
  Helmet = "helmet",
  HelmetSilver = "helmet--silver",
}

interface ItemDescription {
  itemName: string;
  price: number;
}

interface StoreCharacters {
  [key: string]: StoreItem;
}

interface StoreItem {
  items: ItemDescription[];
  name: string;
}

class Store {
  characters: StoreCharacters;
  static instance: Store | null = null;
  private constructor() {
    this.characters = {
      "1": {
        items: [
          {
            itemName: Items.Helmet,
            price: 10,
          },
        ],
        name: "Misha",
      },
      "2": {
        items: [
          {
            itemName: Items.Helmet,
            price: 10,
          },
        ],
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
}

class DrawInventory {
  constructor(private items: StoreItem) {
    console.log("Drawing items:", this.items);
  }
}

class Inventory {
  constructor(public store: Store = Store.getInstance()) {
    console.log("Inventory class is initialized");
  }

  open(id: string) {
    new DrawInventory(this.store.characters[id]);
    console.log(
      `Inventory is open. Items of ${id}: `,
      this.store.characters[id]
    );
  }
}

const myInventory = new Inventory();
myInventory.open("1");
myInventory.open("2");
myInventory.open("3");
