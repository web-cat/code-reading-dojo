define('ember-prism/components/code-block', ['exports', 'ember'], function (exports, _ember) {
  /* global Prism */
  'use strict';

  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;

  exports['default'] = Component.extend({
    tagName: 'pre',
    classNames: ['code-block'],
    classNameBindings: ['languageClass'],

    inline: false,
    language: 'markup',

    languageClass: computed('language', function () {
      return 'language-' + this.get('language');
    }),

    getElement: function getElement() {
      return this.$('[class*=language-]')[0];
    },

    didInsertElement: function didInsertElement() {
      Prism.highlightElement(this.getElement());
    }
  });
});