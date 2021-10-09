export default class Store {
  constructor(controller) {
    this.controller = controller;
  }

  get tabs() {
    return this.controller.tabs;
  }

  get currentTabs() {
    return this.controller.currentTabs;
  }

  get key() {
    return this.controller.storeKeyValue;
  }

  load() {
    let ids = this.constructor.load(this.key);
    if (!ids) return;

    let idSet = new Set(ids);
    this.tabs.forEach(tab => {
      if (idSet.has(this.controller.getTabID(tab))) {
        this.controller.open(tab)
      } else {
        this.controller.close(tab);
      }
    });
  }

  save() {
    let ids = this.currentTabs.map(tab => this.controller.getTabID(tab));
    this.constructor.save(this.key, ids);
  }

  static load(key) {
    if (!key) return;
    let json = sessionStorage.getItem(key);
    try {
      return JSON.parse(json)
    } catch {
      return null;
    }
  }

  static save(key, value) {
    if (!key) return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
