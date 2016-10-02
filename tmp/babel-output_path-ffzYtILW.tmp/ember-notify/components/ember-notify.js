define('ember-notify/components/ember-notify', ['exports', 'ember', 'ember-notify/templates/components/ember-notify', 'ember-notify/message'], function (exports, _ember, _emberNotifyTemplatesComponentsEmberNotify, _emberNotifyMessage) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberNotifyTemplatesComponentsEmberNotify['default'],

    notify: _ember['default'].inject.service(),
    source: _ember['default'].computed.oneWay('notify'),
    messages: null,
    closeAfter: 2500,

    classPrefix: _ember['default'].computed(function () {
      return this.get('defaultClass') || 'ember-notify-default';
    }),
    classNames: ['ember-notify-cn'],
    classNameBindings: ['classPrefix'],
    messageStyle: 'foundation',

    init: function init() {
      this._super();
      this.set('messages', _ember['default'].A());
      this.get('source').setTarget(this);

      var style = this.get('messageStyle'),
          theme;
      switch (style) {
        case 'foundation':
          theme = FoundationTheme.create();
          break;
        case 'uikit':
          theme = UIkitTheme.create();
          break;
        case 'foundation-5':
          theme = Foundation5Theme.create();
          break;
        case 'bootstrap':
          theme = BootstrapTheme.create();
          break;
        case 'refills':
          theme = RefillsTheme.create();
          break;
        case 'semantic-ui':
          theme = SemanticUiTheme.create();
          break;
        default:
          throw new Error('Unknown messageStyle ' + style + ': options are \'foundation\', \'refills\', \'bootstrap\', and \'semantic-ui\'');
      }
      this.set('theme', theme);
    },
    willDestroyElement: function willDestroyElement() {
      this.get('source').setTarget(null);
    },
    show: function show(message) {
      if (this.get('isDestroyed')) return;
      if (!(message instanceof _emberNotifyMessage['default'])) {
        message = _emberNotifyMessage['default'].create(message);
      }
      this.get('messages').pushObject(message);
      return message;
    }
  });

  var Theme = _ember['default'].Object.extend({
    classNamesFor: function classNamesFor(message) {
      return message.get('type');
    }
  });

  exports.Theme = Theme;

  var FoundationTheme = Theme.extend({
    classNamesFor: function classNamesFor(message) {
      var type = message.get('type');
      var classNames = ['callout', type];
      if (type === 'error') classNames.push('alert');
      return classNames.join(' ');
    }
  });

  exports.FoundationTheme = FoundationTheme;

  var Foundation5Theme = Theme.extend({
    classNamesFor: function classNamesFor(message) {
      var type = message.get('type');
      var classNames = ['alert-box', type];
      if (type === 'error') classNames.push('alert');
      return classNames.join(' ');
    }
  });

  exports.Foundation5Theme = Foundation5Theme;

  var BootstrapTheme = Theme.extend({
    classNamesFor: function classNamesFor(message) {
      var type = message.get('type');
      if (type === 'alert' || type === 'error') type = 'danger';
      var classNames = ['alert', 'alert-' + type];
      return classNames.join(' ');
    }
  });

  exports.BootstrapTheme = BootstrapTheme;

  var RefillsTheme = Theme.extend({
    classNamesFor: function classNamesFor(message) {
      var type = message.get('type');
      var typeMapping = {
        success: 'success',
        alert: 'error',
        error: 'error',
        info: 'notice',
        warning: 'alert'
      };
      return 'flash-' + typeMapping[type];
    }
  });

  exports.RefillsTheme = RefillsTheme;

  var SemanticUiTheme = Theme.extend({
    classNamesFor: function classNamesFor(message) {
      var type = message.get('type');
      var typeMapping = {
        success: 'success',
        alert: 'error',
        error: 'error',
        info: 'info',
        warning: 'warning'
      };
      return 'ui message ' + typeMapping[type];
    }
  });

  exports.SemanticUiTheme = SemanticUiTheme;

  var UIkitTheme = Theme.extend({
    classNamesFor: function classNamesFor(message) {
      var type = message.get('type');
      var typeMapping = {
        success: 'success',
        alert: 'warning',
        error: 'danger',
        info: 'info',
        warning: 'warning'
      };
      return 'uk-notify-message uk-notify-message-' + typeMapping[type];
    }
  });
  exports.UIkitTheme = UIkitTheme;
});