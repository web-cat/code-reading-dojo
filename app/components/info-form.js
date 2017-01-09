import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
  session: service('session'),
  actions: {
    submit(){
      let info = this.get('info');
      this.attrs.triggerSave(info);
    }
 }
});
