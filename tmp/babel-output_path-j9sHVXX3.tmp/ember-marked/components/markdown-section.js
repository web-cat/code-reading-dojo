define('ember-marked/components/markdown-section', ['exports', 'ember', 'ember-marked/components/section', 'ember-marked/components/code-section'], function (exports, _ember, _emberMarkedComponentsSection, _emberMarkedComponentsCodeSection) {
  /* globals marked */
  'use strict';

  /**
   * The markdown section component
   *
   * @class MarkdownSectionComponent
   * @extends SectionComponent
   * @constructor
   */
  var MarkdownSectionComponent = _emberMarkedComponentsSection['default'].extend({
    /**
     * @property classNames
     * @inheritDoc
     */
    classNames: ['markdown'],

    /**
     * @property delayedPropertyFunction
     * @inheritDoc
     */
    delayedPropertyFunction: function delayedPropertyFunction(source) {
      var self = this;
      /* jshint -W116 */
      if (source == null) {
        // just return an empty string if we are null or empty
        return '';
      } else {
        // return a promise resolving to rendered marked section
        return new _ember['default'].RSVP.Promise(function (resolve, reject) {
          var options = self.get('_markedOptions');
          marked(source, options, function (err, content) {
            if (err) {
              _ember['default'].warn('[ember-marked] ' + err);
              reject(err);
            } else {
              resolve(content);
            }
          });
        }, 'Rendering markdown source');
      }
    },

    /**
     * Marked options
     * @property options
     * @type Object
     */
    options: null,

    /**
     * Markdown options, completed with default ones
     * @property _markedOptions
     * @type Object
     * @private
     */
    _markedOptions: _ember['default'].computed('options', function () {
      var options = {};
      var localOptions = this.get('options');
      var defaultOptions = _ember['default'].get(MarkdownSectionComponent, 'defaultOptions');
      _ember['default'].merge(options, defaultOptions);
      _ember['default'].merge(options, localOptions);
      return options;
    }).readOnly()
  });

  MarkdownSectionComponent.reopenClass({
    /**
     * The default marked options
     * @property defaultOptions
     * @type {Object}
     */
    defaultOptions: _ember['default'].computed(function () {
      var options = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      };

      /**
       * The highlight  method
       * @property highlight
       * @type Function
       */
      options.highlight = function highlight(code, language) {
        return _emberMarkedComponentsCodeSection['default'].highlight(code, language);
      };

      return options;
    })
  });

  exports['default'] = MarkdownSectionComponent;
});