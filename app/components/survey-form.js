import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
  session: service('session'),
  actions: {
    submit(){
      let survey = this.get('survey');
      this.attrs.triggerSave(survey);
    }
 }
});
