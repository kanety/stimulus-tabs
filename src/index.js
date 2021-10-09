import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import Store from './store';
import './index.scss';

export default class extends Controller {
  static targets = ['tabs'];
  static values = {
    storeKey: String
  };
  static actions = [
    ['tabs', 'click->show']
  ];

  get tabs() {
    return Array.from(this.tabsTarget.children);
  }

  get currentTabs() {
    return this.tabs.filter(tab => tab.matches('.st-tabs__tab--current'));
  }

  connect() {
    this.store = new Store(this);
    this.store.load();
  }

  show(e) {
    if (!e.target.matches('a[href]')) return;

    this.currentTabs.forEach(tab => this.close(tab));
    this.open(e.target.parentNode);

    e.preventDefault();
  }

  open(tab) {
    let pane = this.findPane(tab);
    this.toggleClass(tab, pane, true);
    this.dispatch('opened', { detail: { tab: tab, pane: pane } });
    this.store.save();
  }

  close(tab) {
    let pane = this.findPane(tab);
    this.toggleClass(tab, pane, false);
    this.dispatch('closed', { detail: { tab: tab, pane: pane } });
    this.store.save();
  }

  toggleClass(tab, pane, flag) {
    tab.classList.toggle('st-tabs__tab--current', flag);
    pane.style.display = flag ? '' : 'none';
    pane.classList.toggle('st-tabs__pane--visible', flag);
  }

  findPane(tab) {
    let id = this.getTabID(tab);
    return this.element.querySelector(`[data-pane-id="${id}"]`);
  }

  getTabID(tab) {
    return tab.querySelector('a[href]').getAttribute('href').replace(/^#/, '');
  }
}
