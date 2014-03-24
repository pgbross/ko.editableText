**ko.editableText** is a binding for [Knockout.js] (http://knockoutjs.com) designed to allow in-place editing of a text element.

**Basic Usage**

```html
<span data-bind="editableText: name" />
```

* using named template:

```html
<span data-bind="editableText: name, editableTextOptions:{ templateName: 'myTemplate '}" />

<script id="myTemplate" type="text/html">
  <div class="editable-input">
    <div class="editable-input">
      <input type="text" data-bind="value: name" class="form-control input-sm"/>
    </div>
  <div class="editable-buttons">
    <button type="button" title="confirm" data-bind="click:confirm" class="btn btn-primary btn-sm">
      <i class="fa fa-check"></i>
    </button><button type="button" title="cancel" data-bind="click:cancel" class="btn btn-primary btn-sm editable-cancel">
      <i class="fa fa-times"></i>
    </button>
    </div>
  </div>
</script>
```

Note: the named template example assumes bootstrap 3 and font-awesome are available.

**Additional Options**

* **wrapper** - specify the inserted node that "wraps" the provided template. The default is `<span />`

**Dependencies**

* Knockout 3.0+
* jQuery - no specific version identified yet as minimum


**Build:** This project uses [grunt](http://gruntjs.com/) for building/minifying.

**License**: MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)