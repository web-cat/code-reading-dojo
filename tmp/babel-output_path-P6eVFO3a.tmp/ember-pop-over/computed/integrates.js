define('ember-pop-over/computed/integrates', ['exports', 'ember-computed'], function (exports, _emberComputed) {
  /* global require */
  'use strict';

  exports['default'] = function (module) {
    return (0, _emberComputed['default'])(function () {
      return Object.keys(require.entries).some(function (moduleName) {
        return moduleName.split('/')[0] === module;
      });
    });
  };
});