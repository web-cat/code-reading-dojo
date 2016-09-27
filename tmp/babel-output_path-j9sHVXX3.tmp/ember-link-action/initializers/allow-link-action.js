define('ember-link-action/initializers/allow-link-action', ['exports', 'ember', 'ember-link-action/mixins/link-action'], function (exports, _ember, _emberLinkActionMixinsLinkAction) {
  'use strict';

  exports.initialize = initialize;

  function initialize() {
    _ember['default'].LinkComponent.reopen(_emberLinkActionMixinsLinkAction['default']);
  }

  exports['default'] = {
    name: 'allow-link-action',
    initialize: initialize
  };
});