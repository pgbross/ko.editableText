
; (function (factory) {
  //CommonJS
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    factory(require("knockout"), require("jQuery"));
    //AMD
  } else if (typeof define === "function" && define.amd) {
    define(["knockout", "jquery"], factory);
    //normal script tag
  } else {
    factory(ko, jQuery);
  }
}(function (ko, $, undefined) {
  var unwrap = ko.utils.unwrapObservable,
      template = '<span class="editable-input"><input type="text"></input><span><button data-bind="click:confirm">Ok</button><button data-bind="click:cancel">Cancel</button></span></span>';

  // inline editable text binding
  ko.bindingHandlers.editableText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var $element = $(element),
          value = valueAccessor(),
          allBindings = allBindingsAccessor(),
          editableOptions = allBindings.editableTextOptions || {},
          $inline, inlineNode, originalValue;

      if (!ko.isWriteableObservable(value)) {
        throw 'You must pass an observable or writeable computed';
      }

      // check to see if a named template was passed in the options.
      var templateName = ko.unwrap(editableOptions.templateName);

      // etContext is used to extend the bindingContext so that a template can call cancel and confirm functions.
      var etContext = {
        removeEditor: function () {
          
        },
        cancel: function () {
          value(originalValue); // reset any changes
          etContext.confirm();  // then same as confirm.
        },
        confirm: function () {
          $inline.hide(0, function () { // hide our injected element, show the original, and ask knockout to remove the injected node
            $element.show();            // which should dispose of any DOM data.
            ko.removeNode(inlineNode);
          });
        }
      };

      // add on click handler to switch into inline edit mode.
      $element.on('click.et', function (eo) {
        // remember the original value in case we cancel.
        originalValue = ko.unwrap(value);

        // if we have been given a template name, then use it
        // other wise use our simple internal template.
        if (templateName) {
          // need a node to apply the template to.
          $inline = $( editableOptions.wrapper || '<span/>');
          inlineNode = $inline[0];

          ko.applyBindingsToNode(inlineNode, { template: { name: templateName } }, bindingContext.extend(etContext));

        } else {
          $inline = $(template);
          inlineNode = $inline[0];

          // bind our input element to the passed in valueAccessor.
          ko.applyBindingAccessorsToNode($('input', $inline)[0], { value: valueAccessor });
          // bind the button data-bind: click handlers
          ko.applyBindingsToDescendants(etContext, inlineNode);
        }

        // hide the current element, and show our new element inserted after it.
        $element.hide();
        $inline.insertAfter($element).show();
      });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      // simply pass through to the text handler.
      ko.bindingHandlers.text.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    }
  };
}));
