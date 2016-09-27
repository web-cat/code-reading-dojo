define('ember-prism/components/code-inline', ['exports', 'ember'], function (exports, _ember) {
  /* global Prism */
  'use strict';

  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;

  exports['default'] = Component.extend({
    tagName: 'code',
    classNames: ['code-inline'],
    classNameBindings: ['languageClass'],

    inline: true,
    language: 'markup',

    languageClass: computed('language', function () {
      return 'language-' + this.get('language');
    }),

    getElement: function getElement() {
      return this.$()[0];
    },

    didInsertElement: function didInsertElement() {
      Prism.highlightElement(this.getElement());
    }
  });
});