define('ember-notify/message', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Object.extend({
    text: null,
    html: '',
    type: 'info',
    closeAfter: undefined,
    visible: undefined,
    classNames: []
  });
});