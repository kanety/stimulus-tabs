describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="tabs">
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

  let messages = [];
  beforeEach(() => {
    $('[data-controller="tabs"]').addEventListener('tabs:opened', (e) => {
      messages.push('opened: ' + e.detail.pane.getAttribute('data-tabs-pane-id'));
    });
    $('[data-controller="tabs"]').addEventListener('tabs:closed', (e) => {
      messages.push('closed: ' + e.detail.pane.getAttribute('data-tabs-pane-id'));
    });
  });

  it('run callbacks', () => {
    $('a[href="#tab1"]').click();
    $('a[href="#tab2"]').click();
    expect(messages).toEqual(['opened: tab1', 'closed: tab1', 'opened: tab2']);
  });
});
