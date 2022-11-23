import "./styles.scss";

enum ItemsKinds {
  Armor = "ARMOR",
  Weapon = "WEAPON",
}

interface ItemDescr {
  type: ItemsKinds;
  name: string;
  img: string;
  price: number;
  strength?: number;
  health?: number;
  weight: number;
}

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
        items: [itemsDict.helmet, itemsDict.helmet, itemsDict.sword],
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
  gridWrapper: HTMLDivElement | null = null;

  drawWindow(items: StoreItem, id: string) {
    const inventoryWrapper = document.getElementsByClassName("inventory")[0];
    this.gridWrapper = document.createElement("div");
    this.gridWrapper.classList.add("inventory-grid-wrapper");
    this.gridWrapper.setAttribute("id", `window-${id}`);
    inventoryWrapper?.appendChild(this.gridWrapper);

    items?.items.map((item) => {
      const itemWrapper = document.createElement("div");
      itemWrapper.classList.add("inventory-grid-cell");
      this.gridWrapper?.append(itemWrapper);

      const element = document.createElement("p") as HTMLParagraphElement;
      element.classList.add("inventory-item-descr");
      const text = document.createTextNode(item.name) as Text;
      const img = document.createElement("img");
      img.classList.add("inventory-item-img");

      element.appendChild(text);
      img.src = item.img;
      itemWrapper.appendChild(img);
      itemWrapper.appendChild(element);
    });
  }

  removeWindow(id: string) {
    const InventoryWindow = document.getElementById(`window-${id}`);

    InventoryWindow?.remove();
  }
}

class Inventory {
  constructor(
    public storeInstance: Store = Store.getInstance(),
    public drawInstance = new DrawInventory()
  ) {}

  open(id: string) {
    this.drawInstance.drawWindow(this.storeInstance.characters[id], id);
  }
  close(id: string) {
    this.drawInstance.removeWindow(id);
  }
}

const myInventory = new Inventory();
myInventory.open("1");
myInventory.open("2");