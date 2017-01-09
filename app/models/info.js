import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  email: attr('string'),
  gender: attr('string'),
  age: attr('string'),
  experience: attr('string'),
  enjoy: attr('string'),
  language: attr('string')
});
