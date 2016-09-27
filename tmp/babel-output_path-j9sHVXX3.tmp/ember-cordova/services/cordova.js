define('ember-cordova/services/cordova', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var A = _ember['default'].A;
  var Service = _ember['default'].Service;
  var Evented = _ember['default'].Evented;
  var RSVP = _ember['default'].RSVP;
  var run = _ember['default'].run;
  var Promise = RSVP.Promise;

  // from https://cordova.apache.org/docs/en/4.0.0/cordova_events_events.md.html
  var CORDOVA_EVENTS = new A(['deviceready', 'pause', 'resume', 'backbutton', 'menubutton', 'searchbutton', 'startcallbutton', 'endcallbutton', 'volumedownbutton', 'volumeupbutton', 'batterycritical', 'batterylow', 'batterystatus', 'online', 'offline']);

  exports['default'] = Service.extend(Evented, {
    _listeners: undefined,
    _ready: undefined,
    _readyHasTriggered: false,

    init: function init() {
      this._super();

      this._listeners = [];
      this._ready = RSVP.defer();

      this.setupReady();
      this.setupListeners();
    },

    setupListeners: function setupListeners() {
      var _this = this;

      CORDOVA_EVENTS.forEach(function (name) {
        var listener = {
          name: name,
          method: function method(e) {
            _this.trigger(name, e);
          }
        };

        _this._listeners.push(listener);
        document.addEventListener(listener.name, listener.method, true);
      });
    },

    setupReady: function setupReady() {
      var _this2 = this;

      this.on('deviceready', function () {
        _this2._readyHasTriggered = true;
        _this2._ready.resolve();
        _this2._ready = null;
      });
    },

    on: function on(name, target, method) {
      if (name === 'deviceready' && this._readyHasTriggered) {
        run.join(target, method);
      }
      return this._super(name, target, method);
    },

    ready: function ready() {
      return this._readyHasTriggered ? Promise.resolve() : this._ready.promise;
    },

    willDestroy: function willDestroy() {
      this._super();
      this.teardownListeners();

      if (this._ready) {
        this._ready.reject();
        this._ready = null;
      }
    },

    teardownListeners: function teardownListeners() {
      this._listeners.forEach(function (listener) {
        document.removeEventListener(listener.name, listener.method, true);
      });
    }
  });
});