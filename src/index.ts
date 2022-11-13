import './styles.scss';

class Item {
  constructor(name?: string) {
    console.log(name);
  }
}

function getItem(name?: string): void {
  const item = new Item(name);
  console.log(item);
}

const getBtn = document.getElementById("get-item");
getBtn?.addEventListener("click", () => {
  getItem();
});
