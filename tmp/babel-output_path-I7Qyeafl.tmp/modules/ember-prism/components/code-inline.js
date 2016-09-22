/* global Prism */
import Ember from 'ember';
var Component = Ember.Component;
var computed = Ember.computed;

export default Component.extend({
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