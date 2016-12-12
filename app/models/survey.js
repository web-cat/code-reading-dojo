import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  email: attr('string'),
  s1: attr('string'),
  s2: attr('string'),
  s3: attr('string'),
  s4: attr('string')
});
