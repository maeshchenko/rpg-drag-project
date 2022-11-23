import { ItemsKinds, ItemsDictTypes, ItemDescr } from "../types/types";

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

export function getItemsDictFromApi() {
  return itemsDict;
}
