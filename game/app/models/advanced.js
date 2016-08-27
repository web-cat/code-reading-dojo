import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  level: DS.attr('number'),
  description: DS.attr('string'),
  code: DS.attr('string'),
  error: DS.attr('number'),
  updatedtime: DS.attr('string'),
  lastaccessed: DS.attr('string')
});
