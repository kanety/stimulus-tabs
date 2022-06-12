# stimulus-tabs

A stimulus controller for simple tabs.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-tabs --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import TabsController from '@kanety/stimulus-tabs';

const application = Application.start();
application.register('tabs', TabsController);
```

Import css:

```css
@import '@kanety/stimulus-tabs';
```

Build html as follows:

```html
<div class="st-tabs st-tabs--horizontal" data-controller="tabs">
  <ul class="st-tabs__tabs">
    <li class="st-tabs__tab"><a href="#tab1" data-action="tabs#show"></li>
    <li class="st-tabs__tab"><a href="#tab2" data-action="tabs#show"></li>
  </ul>
  <div class="st-tabs__pane" data-tabs-pane-id="tab1">
    <p>tab1 content</p>
  </div>
  <div class="st-tabs__pane" data-tabs-pane-id="tab2">
    <p>tab2 content</p>
  </div>
</div>
```

You can also build vertical tabs as follows:

```html
<div class="st-tabs st-tabs--vertical" data-controller="tabs">
  ...
</div>
```
### Options

#### store-key

Save tab state to `sessionStorage`:

```html
<div data-controller="tabs"
     data-tabs-store-key-value="YOUR_KEY">
  ...
</div>
```

### Callbacks

```javascript
let element = document.querySelector('[data-controller="tabs"]')
element.addEventListener('tabs:opened', (e) => {
  console.log(e.detail.tab);
  console.log(e.detail.pane);
});
element.addEventListener('tabs:closed', (e) => {
  console.log(e.detail.tab);
  console.log(e.detail.pane);
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
