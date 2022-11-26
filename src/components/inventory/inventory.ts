import { DrawInventory } from "../../render/render";
import { Store } from "../../store/store";

export class Inventory {
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
