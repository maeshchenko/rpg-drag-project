export enum ItemsKinds {
  Armor = "ARMOR",
  Weapon = "WEAPON",
}

export interface ItemDescr {
  type: ItemsKinds;
  name: string;
  img: string;
  price: number;
  strength?: number;
  health?: number;
  weight: number;
}

export enum ItemsDictTypes {
  sword = "sword",
  swordSilver = "swordSilver",
  helmet = "helmet",
  helmetSilver = "helmetSilver",
}

export interface StoreCharacters {
  [key: string]: StoreItem;
}

export interface StoreItem {
  items: ItemDescr[];
  money: number;
  name: string;
}
