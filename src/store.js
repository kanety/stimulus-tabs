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
      let pane = this.controller.findPane(tab);
      if (idSet.has(this.controller.getPaneID(tab))) {
        this.controller.toggleClass(tab, pane, true);
      } else {
        this.controller.toggleClass(tab, pane, false);
      }
    });
  }

  save() {
    let ids = this.currentTabs.map(tab => this.controller.getPaneID(tab));
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
