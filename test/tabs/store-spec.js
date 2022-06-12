describe('store', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="tabs" data-tabs-store-key-value="tabs">
        <ul>
          <li><a href="#tab1" data-action="tabs#show">Tab1</a></li>
          <li><a href="#tab2" data-action="tabs#show">Tab2</a></li>
        </ul>
        <div data-tabs-pane-id="tab1">
          <p>tab1 content</p>
        </div>
        <div data-tabs-pane-id="tab2">
          <p>tab2 content</p>
        </div>
      </div>
    `;
  });

  it('saves states', () => {
    $('a[href="#tab1"]').click();
    expect($('[data-tabs-pane-id="tab1"]').matches('.st-tabs__pane--visible')).toEqual(true);
  });

  it('loads states', () => {
    expect($('[data-tabs-pane-id="tab1"]').matches('.st-tabs__pane--visible')).toEqual(true);
  });
});
