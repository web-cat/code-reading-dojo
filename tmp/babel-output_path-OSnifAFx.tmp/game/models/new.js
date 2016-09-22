define('game/models/new', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    code: (0, _emberDataAttr['default'])('string'),
    difficulty: (0, _emberDataAttr['default'])('string'),
    level: (0, _emberDataAttr['default'])('string'),
    errorindexes: (0, _emberDataAttr['default'])('string')
  });
});