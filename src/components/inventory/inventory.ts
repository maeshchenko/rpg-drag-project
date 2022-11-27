import { DrawInventory } from "../../render/render";
import { Store } from "../../store/store";

export class Inventory {
  constructor(
    public storeInstance: Store = Store.getInstance(),
    public drawInstance = new DrawInventory()
  ) {}

  open(id: number) {
    this.drawInstance.openInfoWindow(this.storeInstance.getItems(id), id);
  }

  close(id: number) {
    this.drawInstance.closeInfoWindow(id);
  }
}
