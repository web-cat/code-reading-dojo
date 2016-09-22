define('game/models/advanced', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    level: _emberData['default'].attr('number'),
    description: _emberData['default'].attr('string'),
    code: _emberData['default'].attr('string'),
    error: _emberData['default'].attr('number'),
    updatedtime: _emberData['default'].attr('string'),
    lastaccessed: _emberData['default'].attr('string')
  });
});