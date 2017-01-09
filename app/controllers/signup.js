import Ember from 'ember';
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  notify: Ember.inject.service('notify'),
  actions: {
    save(user){
      let newUser = user;
      // console.log('+_+_+_+_+_+_+_+_');
      // console.log(newUser.get('email'));
      // console.log(newUser.get('password'));
      newUser.save()
      .catch((error) => {
        this.get('session').authenticate('authenticator:devise', newUser.get('email'), newUser.get('password'))
        .catch((reason) => {
          this.set('errorMessage', reason.error ||reason);
          // console.log('######################');
          console.log(this.get('errorMessage'));
          this.get('notify').alert(JSON.stringify(this.get('errorMessage')['errors']));
        });
        // console.log('****************');
        // console.log(this.get('email'));
        // console.log('$$$$$$$$$$$$$');
        this.set('session.data.uid', newUser.get('email'));
        this.set('session.data.email', newUser.get('email'));
        this.set('session.data.authenticated.email', newUser.get('email'));
        // console.log('^^^^^^^^^^^^^^^');
        // console.log(this.get('session.data.uid'));
        // var arr = window.location.href.split("/");
        // arr.splice(-1,1);
        // console.log(arr);
        // var newUrl = arr.join("/") + "/info";
        // window.location.replace(newUrl);
        // console.log('!!!!!!!!!!!!!!!!!!');
        // this.set('errorMessage', error);
        // console.log(this.get('errorMessage'));
      });
      // .then(()=>{
      //   this.get('session')
      //   .authenticate('authenticator:devise',
      //     newUser.get('email'), newUser.get('password'))
      //   .catch((reason) => {
      //     this.set('errorMessage', reason.error ||reason);
      //   });
      // });
    }
  }
});
