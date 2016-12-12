import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  email: attr('string'),
  word: attr('string'),
  success: attr('string'),
  time: attr('string'),
  level: attr('string')
});
