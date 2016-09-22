define('ember-marked/components/code-section', ['exports', 'ember', 'ember-marked/components/section'], function (exports, _ember, _emberMarkedComponentsSection) {
  /* globals hljs */
  'use strict';

  /**
   * The code section component
   *
   * @class CodeSectionComponent
   * @extends SectionComponent
   * @constructor
   */
  var CodeSectionComponent = _emberMarkedComponentsSection['default'].extend({
    /**
     * @property classNames
     * @inheritDoc
     */
    classNames: ['code'],

    /**
     * @property delayedPropertyName
     * @inheritDoc
     */
    delayedPropertyName: 'codeMeta',

    /**
     * Used to have a property depending on both content and language
     * @property codeMeta
     * @type {{content: String, language: String}}
     */
    codeMeta: _ember['default'].computed('content', 'language', function () {
      return this.getProperties('content', 'language');
    }).readOnly(),

    /**
     * @property delayedPropertyFunction
     * @inheritDoc
     */
    delayedPropertyFunction: function delayedPropertyFunction(meta) {
      var code;
      /* jshint -W116 */
      if (meta.content == null) {
        // just return an empty string if we are null or empty
        this.set('detectedLanguage', null);
        return '';
      } else {
        code = CodeSectionComponent.highlight(meta.content, meta.language, true);
        this.set('detectedLanguage', code.language);
        return code.value;
      }
    },

    /**
     * Language to use
     * @property language
     * @type String
     */
    language: null,

    /**
     * The detected language of the last highlighted code
     * @property detectedLanguage
     * @type String
     */
    detectedLanguage: null
  });

  // entities parsing when not using highlightjs
  var ENTITIES = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;'
  };
  function entitiesReplacer(chr) {
    return ENTITIES[chr];
  }

  CodeSectionComponent.reopenClass({
    /**
     * Highlighter function, using highlight.js if available
     *
     * @method highlight
     * @param {String} code
     * @param {String} [language]
     * @param {Boolean} [bare=false]
     * @returns {String|{value: String, language: String}}
     */
    highlight: function highlight(code, language, bare) {
      var result;
      if (typeof hljs !== 'undefined') {
        if (language) {
          try {
            result = hljs.highlight(language, code, true);
          } catch (e) {
            _ember['default'].warn('[marked] Failing to highlight some code with language `' + language + '`, trying auto-detecting language (error: ' + e + ').');
            result = hljs.highlightAuto(code);
          }
        } else {
          result = hljs.highlightAuto(code);
        }
        result.value = '<pre><code>' + result.value + '</code></pre>';
        if (bare) {
          return result;
        } else {
          return result.value;
        }
      } else {
        result = '<pre><code>' + (code || '').replace(/<>&/g, entitiesReplacer) + '</code></pre>';
        if (bare) {
          return { value: result, language: null };
        } else {
          return result;
        }
      }
    }
  });

  exports['default'] = CodeSectionComponent;
});