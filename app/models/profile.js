import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  email: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  levelcompleted: attr('string')
});
