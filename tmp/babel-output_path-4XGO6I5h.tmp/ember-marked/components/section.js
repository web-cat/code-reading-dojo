define('ember-marked/components/section', ['exports', 'ember', 'ember-marked/mixins/with-delayed-property'], function (exports, _ember, _emberMarkedMixinsWithDelayedProperty) {
  'use strict';

  /**
   * Our base component
   * @class SectionComponent
   * @extends Ember.Component
   * @uses WithDelayedPropertyMixin
   * @abstract
   */
  var SectionComponent = _ember['default'].Component.extend(_emberMarkedMixinsWithDelayedProperty['default'], {
    /**
     * @property tagName
     * @inheritDoc
     */
    tagName: 'section',
    /**
     * @property delayedPropertyName
     * @inheritDoc
     */
    delayedPropertyName: 'content',
    /**
     * @property delayedPropertyDestination
     * @inheritDoc
     */
    delayedPropertyDestination: 'html',
    /**
     * @property delayedPropertyMethod
     * @inheritDoc
     */
    delayedPropertyMethod: 'debounce',

    /**
     * The rendered html
     * @property html
     * @type String
     */
    html: '',

    /**
     * The HTML string, for Handlebars to not escape the html tags and simply render it as-is
     * @property handlebarsHtml
     * @type String
     */
    handlebarsHtml: _ember['default'].computed('html', function () {
      var html = this.get('html');
      if (typeof html === 'string') {
        return _ember['default'].String.htmlSafe(html);
      }
    }).readOnly()
  });

  exports['default'] = SectionComponent;
});