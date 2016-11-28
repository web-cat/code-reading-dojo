import Ember from 'ember';
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    save(user){
      let newUser = user;

      newUser.save().catch((error) => {
        console.log('!!!!!!!!!!!!!!!!!!');
        this.set('errorMessage', error);
        console.log(this.get('errorMessage'));
      })
      .then(()=>{
        this.get('session')
        .authenticate('authenticator:devise',
          newUser.get('email'), newUser.get('password'), newUser.get('passwordConfirmation'))
        .catch((reason) => {

          this.set('errorMessage', reason.error ||reason);
          console.log('^^^^^^^^^^^^^^^^^');
          console.log(this.get('errorMessage'));
        });
      });
    }
  }
});
