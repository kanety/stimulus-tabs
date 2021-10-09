import { Application } from '@hotwired/stimulus';
import TabsController from 'index';

const application = Application.start();
application.register('tabs', TabsController);

describe('index', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="tabs" data-tabs-store-key-value="tabs">
        <ul data-tabs-target="tabs">
          <li><a href="#tab1">Tab1</a></li>
          <li><a href="#tab2">Tab2</a></li>
        </ul>
        <div>
          <div style="display: none;" data-pane-id="tab1">
            <p>tab1 content</p>
          </div>
          <div style="display: none;" data-pane-id="tab2">
            <p>tab2 content</p>
          </div>
        </div>
      </div>
    `;
  });

  it('saves states', () => {
    $('a[href="#tab1"]').click();
    expect($('[data-pane-id="tab1"]').style.display).toEqual('');
  });

  it('loads states', () => {
    expect($('[data-pane-id="tab1"]').style.display).toEqual('');
  });
});
