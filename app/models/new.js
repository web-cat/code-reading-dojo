import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  code: attr('string'),
  difficulty: attr('string'),
  level: attr('string'),
  errorindexes: attr('string')
});
