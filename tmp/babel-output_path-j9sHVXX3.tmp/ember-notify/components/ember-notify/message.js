define('ember-notify/components/ember-notify/message', ['exports', 'ember', 'ember-notify/templates/components/ember-notify/message', 'ember-notify'], function (exports, _ember, _emberNotifyTemplatesComponentsEmberNotifyMessage, _emberNotify) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberNotifyTemplatesComponentsEmberNotifyMessage['default'],
    message: null,
    closeAfter: null,

    classNameBindings: ['message.visible:ember-notify-show:ember-notify-hide', 'radius::', 'themeClassNames'],
    attributeBindings: ['data-alert'],
    'data-alert': '',

    run: null,

    init: function init() {
      this._super();
      // indicate that the message is now being displayed
      if (this.get('message.visible') === undefined) {
        // should really be in didInsertElement but Glimmer doesn't allow this
        this.set('message.visible', true);
      }
      this.run = Runner.create({
        // disable all the scheduling in tests
        disabled: _ember['default'].testing && !_emberNotify['default'].testing
      });
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      var element = this.get('message.element');
      if (element) {
        this.$('.message').append(element);
      }
      var closeAfter = this.get('message.closeAfter');
      if (closeAfter === undefined) closeAfter = this.get('closeAfter');
      if (closeAfter) {
        this.run.later(function () {
          return _this.send('closeIntent');
        }, closeAfter);
      }
    },
    themeClassNames: _ember['default'].computed('theme', 'message.type', function () {
      var theme = this.get('theme');
      return theme ? theme.classNamesFor(this.get('message')) : '';
    }),
    visibleObserver: _ember['default'].observer('message.visible', function () {
      if (!this.get('message.visible')) {
        this.send('closeIntent');
      }
    }),
    isHovering: function isHovering() {
      return this.$().is(':hover');
    },

    actions: {
      // alias to close action so we can poll whether hover state is active
      closeIntent: function closeIntent() {
        var _this2 = this;

        if (this.get('isDestroyed')) return;
        if (this.isHovering()) {
          return this.run.later(function () {
            return _this2.send('closeIntent');
          }, 100);
        }
        // when :hover no longer applies, close as normal
        this.send('close');
      },
      close: function close() {
        if (this.get('message.closed')) return;
        this.set('message.closed', true);
        this.set('message.visible', false);
        var removeAfter = this.get('message.removeAfter') || this.constructor.removeAfter;
        if (removeAfter) {
          this.run.later(this, remove, removeAfter);
        } else {
          remove();
        }
        function remove() {
          var parentView = this.get('parentView');
          if (this.get('isDestroyed') || !parentView || !parentView.get('messages')) return;
          parentView.get('messages').removeObject(this.get('message'));
          this.set('message.visible', null);
        }
      }
    }
  }).reopenClass({
    removeAfter: 250 // allow time for the close animation to finish
  });

  // getting the run loop to do what we want is difficult, hence the Runner...
  var Runner = _ember['default'].Object.extend({
    init: function init() {
      if (!this.disabled) {
        // this is horrible but this avoids delays from the run loop
        this.next = function (ctx, fn) {
          var args = arguments;
          setTimeout(function () {
            _ember['default'].run(function () {
              fn.apply(ctx, args);
            });
          }, 0);
        };
        this.later = function () {
          _ember['default'].run.later.apply(_ember['default'].run, arguments);
        };
      } else {
        this.next = this.later = function zalkoBegone(ctx, fn) {
          _ember['default'].run.next(ctx, fn);
        };
      }
    }
  });
});