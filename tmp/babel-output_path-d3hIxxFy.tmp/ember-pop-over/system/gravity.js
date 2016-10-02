define('ember-pop-over/system/gravity', ['exports', 'ember-pop-over/system/flow'], function (exports, _emberPopOverSystemFlow) {
  'use strict';

  exports['default'] = {
    nw: _emberPopOverSystemFlow['default'].create().orientAbove.andSnapTo('left-edge'),
    n: _emberPopOverSystemFlow['default'].create().orientAbove.andSnapTo('center'),
    ne: _emberPopOverSystemFlow['default'].create().orientAbove.andSnapTo('right-edge'),
    e: _emberPopOverSystemFlow['default'].create().orientRight.andSnapTo('center'),
    se: _emberPopOverSystemFlow['default'].create().orientBelow.andSnapTo('right-edge'),
    s: _emberPopOverSystemFlow['default'].create().orientBelow.andSnapTo('center'),
    sw: _emberPopOverSystemFlow['default'].create().orientBelow.andSnapTo('left-edge'),
    w: _emberPopOverSystemFlow['default'].create().orientLeft.andSnapTo('center'),
    none: _emberPopOverSystemFlow['default'].create().orientCenter.andSnapTo('center')
  };
});