define('ember-notify/index', ['exports', 'ember', 'ember-notify/message'], function (exports, _ember, _emberNotifyMessage) {
  'use strict';

  function aliasToShow(type) {
    return function (message, options) {
      return this.show(type, message, options);
    };
  }

  var Notify = _ember['default'].Service.extend({

    info: aliasToShow('info'),
    success: aliasToShow('success'),
    warning: aliasToShow('warning'),
    alert: aliasToShow('alert'),
    error: aliasToShow('error'),

    init: function init() {
      this.pending = [];
    },

    show: function show(type, text, options) {
      var assign = _ember['default'].assign || _ember['default'].merge;

      // If the text passed is `SafeString`, convert it
      if (text instanceof _ember['default'].String.htmlSafe) {
        text = text.toString();
      }
      if (typeof text === 'object') {
        options = text;
        text = null;
      }
      var message = _emberNotifyMessage['default'].create(assign({
        text: text,
        type: type
      }, options));
      var target = this.get('target');
      if (target) {
        target.show(message);
      } else {
        this.pending.push(message);
      }
      return message;
    },

    setTarget: function setTarget(target) {
      this.set('target', target);
      if (target) {
        this.pending.map(function (message) {
          return target.show(message);
        });
        this.pending = [];
      }
    }

  }).reopenClass({
    // set to true to disable testing optimizations that are enabled when Ember.testing is true
    testing: false
  });

  exports['default'] = Notify.reopenClass({
    property: function property() {
      return _ember['default'].computed(function () {
        return Notify.create();
      });
    }
  });
});