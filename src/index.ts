import { DrawInventory } from "./render/render";
import { Store } from "./store/store";
import "./styles.scss";

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
