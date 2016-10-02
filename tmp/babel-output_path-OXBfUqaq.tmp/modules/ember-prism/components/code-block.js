/* global Prism */
import Ember from 'ember';
var Component = Ember.Component;
var computed = Ember.computed;

export default Component.extend({
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