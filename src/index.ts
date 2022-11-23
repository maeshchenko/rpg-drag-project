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

enum ItemsDictTypes {
  sword = "sword",
  swordSilver = "swordSilver",
  helmet = "helmet",
  helmetSilver = "helmetSilver",
}

const itemsDict: { [key in ItemsDictTypes]: ItemDescr } = {
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
  money: number;
  name: string;
}

class Store {
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

class DrawInventory {
  stats = {
    health: 100,
    money: 100,
    strength: 0,
    weight: 0,
  }; // так не пойдет. Потому что разные могут быть начальные данные. Надо подтягивать данные из профиля игрока
  // И это точно не то место, где нужно считать. Тут нужно отображать инфо, а не делать calculate
  // его нужно делать при рендере персонажей, добавлении их на карту
  // надо добавить отрисовку персонажей, а при клике на них - открывать окно с инфой
  // canvas?

  openInfoWindow(playerInfo: StoreItem, id: string) {
    const { items, money, name } = playerInfo;
    this.resetStats();

    const inventoryBoxWrapper = document.getElementsByClassName("inventory")[0];
    const wrapper = document.createElement("div");
    inventoryBoxWrapper.appendChild(wrapper);
    wrapper.setAttribute("id", `window-${id}`);

    const titleParagraph = document.createElement("H3") as HTMLHeadingElement;
    titleParagraph.classList.add("inventory-title");
    const titleText = document.createTextNode(`${name}'s box`) as Text;
    titleParagraph.appendChild(titleText);
    wrapper.appendChild(titleParagraph);

    const statsParagraph = document.createElement("H3") as HTMLHeadingElement;
    statsParagraph.classList.add("inventory-title");
    wrapper.appendChild(statsParagraph);

    const gridWrapper = document.createElement("div");
    gridWrapper.classList.add("inventory-grid-wrapper");
    wrapper?.appendChild(gridWrapper);

    items?.map((item) => {
      this.stats.weight += item.weight;
      this.stats.strength += item.strength || 0;
      this.stats.health += item.health || 0;

      const itemWrapper = document.createElement("div");
      itemWrapper.classList.add("inventory-grid-cell");
      gridWrapper?.append(itemWrapper);

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

    const statsText = document.createTextNode(
      `money: ${money}, weight: ${this.stats.weight}, strength: ${this.stats.strength}, health: ${this.stats.health}`
    ) as Text;
    statsParagraph.appendChild(statsText);
  }

  closeInfoWindow(id: string) {
    const InventoryWindow = document.getElementById(`window-${id}`);
    InventoryWindow?.remove();
  }

  resetStats() {
    this.stats = {
      money: 100,
      health: 100,
      strength: 0,
      weight: 0,
    };
  }
}

class Inventory {
  constructor(
    public storeInstance: Store = Store.getInstance(),
    public drawInstance = new DrawInventory()
  ) {}

  open(id: string) {
    this.drawInstance.openInfoWindow(this.storeInstance.getItems(id), id);
  }

  close(id: string) {
    this.drawInstance.closeInfoWindow(id);
  }
}

const myInventory = new Inventory();
myInventory.open("1");
myInventory.open("2");

const store = Store.getInstance();
setTimeout(() => {
  store.addInventary("1", ItemsDictTypes.helmet);
  store.addInventary("1", ItemsDictTypes.helmet);
  myInventory.close("1");
  myInventory.close("2");
  myInventory.open("1");
  myInventory.open("2");
}, 2000);
