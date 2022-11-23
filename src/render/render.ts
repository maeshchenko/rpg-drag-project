import { StoreItem } from "../types/types";

export class DrawInventory {
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
