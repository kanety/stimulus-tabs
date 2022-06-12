import { Controller } from '@hotwired/stimulus';
import Store from './store';
import './index.scss';

export default class extends Controller {
  static values = {
    storeKey: String
  };

  get tabs() {
    return this.context.bindingObserver.bindings
               .filter(binding => binding.action.methodName == 'show')
               .map(binding => binding.action.element.parentNode);
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
    if (flag) {
      tab.classList.add('st-tabs__tab--current');
      pane.classList.add('st-tabs__pane--visible');
    } else {
      tab.classList.remove('st-tabs__tab--current');
      pane.classList.remove('st-tabs__pane--visible');
    }
  }

  findPane(tab) {
    let id = this.getPaneID(tab);
    return this.scope.findElement(`[data-tabs-pane-id="${id}"]`);
  }

  getPaneID(tab) {
    return tab.querySelector('a[href]').getAttribute('href').replace(/^#/, '');
  }
}
