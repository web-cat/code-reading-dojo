import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
  session: service('session'),
  actions: {
    submit(){
      console.log('-------------------');
      console.log(this.get('user.passwordConfirmation'));
      let user = this.get('user');
      this.attrs.triggerSave(user);
    }
 }
});
