define('game/models/user', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    username: (0, _emberDataAttr['default'])('string'),
    levelcompleted: (0, _emberDataAttr['default'])('string')
  });
});