import Ember from 'ember';
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  notify: Ember.inject.service('notify'),
  actions: {
    save(user){
      //let user = user;
      let email = Ember.$('#signUpEmailInput').val();
      let password = Ember.$('#signUpPasswordInput').val();
      let passwordConfirmation = Ember.$('#signUpConfirmInput').val();
      let levelcompleted = '1';
      let newInfo = user;
      newInfo.set('email', email);
      newInfo.set('password', password);
      newInfo.set('passwordConfirmation', passwordConfirmation);
      newInfo.set('levelcompleted', levelcompleted);
//user.save()
      newInfo.save()


      .catch( () => {

        this.get('session').authenticate('authenticator:devise', user.get('email'), user.get('password'))
        .catch((reason) => {
          this.set('errorMessage', reason.error ||reason);
          // console.log('######################');
          console.log(this.get('errorMessage'));
          this.get('notify').alert(JSON.stringify(this.get('errorMessage')['errors']));
        });

        this.set('session.data.uid', user.get('email'));
        this.set('session.data.email', user.get('email'));
        this.set('session.data.authenticated.email', user.get('email'));
        this.set('session.data.level', user.get('levelcompleted'));
        // console.log('^^^^^^^^^^^^^^^');
        // console.log(this.get('session.data.level'));
        // var arr = window.location.href.split("/");
        // arr.splice(-1,1);
        // console.log(arr);
        // var newUrl = arr.join("/") + "/info";
        // window.location.replace(newUrl);
        // console.log('!!!!!!!!!!!!!!!!!!');
        // this.set('errorMessage', error);
        // console.log(this.get('errorMessage'));
      });
      // console.log('+_+_+_+_+_+_+_+_');
      // console.log(user.get('email'));
      // console.log(user.get('password'));

      // .then(()=>{
      //   this.get('session')
      //   .authenticate('authenticator:devise',
      //     user.get('email'), user.get('password'))
      //   .catch((reason) => {
      //     this.set('errorMessage', reason.error ||reason);
      //   });
      // });
    }
  }
});
