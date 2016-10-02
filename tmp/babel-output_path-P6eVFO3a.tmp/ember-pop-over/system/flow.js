define('ember-pop-over/system/flow', ['exports', 'ember-object', 'ember-pop-over/system/orientation'], function (exports, _emberObject, _emberPopOverSystemOrientation) {
  'use strict';

  exports['default'] = _emberObject['default'].extend({
    init: function init() {
      this.orientAbove = _emberPopOverSystemOrientation['default'].create({ orientation: 'above' });
      this.orientBelow = _emberPopOverSystemOrientation['default'].create({ orientation: 'below' });
      this.orientRight = _emberPopOverSystemOrientation['default'].create({ orientation: 'right' });
      this.orientLeft = _emberPopOverSystemOrientation['default'].create({ orientation: 'left' });
      this.orientCenter = _emberPopOverSystemOrientation['default'].create({ orientation: 'center' });
      this._super();
    },

    topEdge: 'top-edge',
    bottomEdge: 'bottom-edge',
    leftEdge: 'left-edge',
    rightEdge: 'right-edge',
    center: 'center'
  });
});