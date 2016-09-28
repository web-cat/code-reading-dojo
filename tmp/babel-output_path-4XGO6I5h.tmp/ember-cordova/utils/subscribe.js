define('ember-cordova/utils/subscribe', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = subscribe;
  var assert = _ember['default'].assert;
  var on = _ember['default'].on;

  function subscribe(path, method) {
    var _path$split = path.split('.');

    var _path$split2 = _slicedToArray(_path$split, 3);

    var service = _path$split2[0];
    var event = _path$split2[1];
    var err = _path$split2[2];

    var _listener = null;

    assert('\'subscribe()\' expects a path with exactly one leaf, given ' + path, event && service && !err);

    var _computedFn = function computedFn() {
      var _this = this;

      if (!this.get(service) || _listener) {
        return;
      }

      // ensure teardown
      var _super = this.get('willDestroy');
      this.set('willDestroy', function () {
        this.get(service).off(event, _listener);
        _listener = null;
        _computedFn = null;
        _super.call(this);
      });

      // proxy the event
      _listener = function (e) {
        method.call(_this, e);
      };

      // subscribe to the event
      this.get(service).on(event, _listener);
    };

    return on.call(this, 'init', _computedFn);
  }
});