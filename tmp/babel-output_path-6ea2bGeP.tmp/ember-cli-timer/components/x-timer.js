define('ember-cli-timer/components/x-timer', ['exports', 'ember', 'ember-cli-timer/utils/timeformatter'], function (exports, _ember, _emberCliTimerUtilsTimeformatter) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    startTimeStamp: 0,
    duration: 0,
    autoStart: false,
    startTime: 0,
    stopRequired: true,
    isStopWatch: false,
    isRunning: false,

    didInsertElement: function didInsertElement() {
      if (this.get("autoStart")) {
        this.send("start");
      }
    },

    showStartBtn: (function () {
      return this.get("isStopWatch") || !this.get("autoStart");
    }).property('autoStart', 'isStopWatch'),

    run: function run() {
      var self = this;
      var startTimeStamp = this.get("startTimeStamp");
      this.set('timerId', _ember['default'].run.later(this, function () {
        var timeElapsed = Date.now() - startTimeStamp;
        var secs = timeElapsed / 1000;
        self.set("duration", _emberCliTimerUtilsTimeformatter['default'].getTimefromSecs(secs, "HH:MM:SS"));
        self.run();
      }, 25));
    },

    actions: {
      start: function start() {
        var startTime = this.get("startTime") * 1000;
        this.set("startTimeStamp", Date.now() - startTime);
        this.set("isRunning", true);
        this.run();
      },

      stop: function stop(reset) {
        var timerId = this.get("timerId");
        var duration = this.get("duration");
        _ember['default'].run.cancel(timerId);
        this.sendAction("updateRecordedTime", duration);
        this.set("isRunning", false);
        if (reset) {
          this.set("startTime", 0);
        }
      },

      pause: function pause() {
        var duration = this.get("duration");
        var isRunning = this.get("isRunning");
        if (isRunning) {
          this.set("startTime", _emberCliTimerUtilsTimeformatter['default'].getSecs(duration));
          this.sendAction("updatePausedTime", duration);
          this.send("stop");
        } else {
          this.send("start");
        }
      }
    },

    willDestroyElement: function willDestroyElement() {
      var timerId = this.get("timerId");
      _ember['default'].run.cancel(timerId);
    }

  });
});