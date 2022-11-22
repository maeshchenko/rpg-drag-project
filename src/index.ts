import "./styles.scss";

enum ItemsKinds {
  Armor = "ARMOR",
  Weapon = "WEAPON",
}

interface ItemDescr {
  type: ItemsKinds;
  price: number;
  strength?: number;
  health?: number;
  weight: number;
}

// interface ItemDict {
//   [key: string]: ItemDescr;
// }

const itemsDict = {
  sword: {
    type: ItemsKinds.Weapon,
    name: "Sword",
    img: "./assets/images/tile000.png",
    price: 100,
    strength: 10,
    weight: 1,
  },
  swordSilver: {
    type: ItemsKinds.Weapon,
    name: "Silver Sword",
    img: "./assets/images/tile001.png",
    price: 200,
    strength: 20,
    weight: 1,
  },
  helmet: {
    type: ItemsKinds.Armor,
    name: "Helmet",
    img: "./assets/images/tile070.png",
    price: 200,
    weight: 1,
    health: 10,
  },
  helmetSilver: {
    type: ItemsKinds.Armor,
    name: "Silver Helmet",
    img: "./assets/images/tile069.png",
    price: 200,
    weight: 1,
    health: 20,
  },
};

interface StoreCharacters {
  [key: string]: StoreItem;
}

interface StoreItem {
  items: ItemDescr[];
  name: string;
}

class Store {
  characters: StoreCharacters;
  static instance: Store | null = null;
  private constructor() {
    this.characters = {
      "1": {
        items: [itemsDict.helmet, itemsDict.sword],
        name: "Misha",
      },
      "2": {
        items: [itemsDict.helmetSilver, itemsDict.swordSilver],
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
  drawGrid() {
    // const wrapper = document.getElementById("inventory-grid-wrapper");
  }
}

class Inventory {
  constructor(public store: Store = Store.getInstance()) {}

  open(id: string) {
    new DrawInventory(this.store.characters[id]);
  }
}

const myInventory = new Inventory();
myInventory.open("1");
myInventory.open("2");
myInventory.open("3");
