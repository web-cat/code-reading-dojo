import Ember from 'ember';

const { inject: { service }, Controller } = Ember;

export default Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),
  actions: {
    save(info){
      let userId = this.get('session.data.email');
      let gender = Ember.$('input[name=gender]:checked', '#contact').val();
      console.log('###############');
      console.log(userId);
      console.log(gender);
      let experience = Ember.$('input[name=experience]:checked', '#contact').val();
      let enjoy = Ember.$('input[name=enjoy]:checked', '#contact').val();
      let language = Ember.$('input[name=language]:checked', '#contact').val();
      let age = Ember.$('input[name=age]', '#contact').val();
      let newInfo = info;
      newInfo.set('email', userId);
      newInfo.set('gender', gender);
      newInfo.set('age', age);
      newInfo.set('experience', experience);
      newInfo.set('enjoy', enjoy);
      newInfo.set('language', language);
      // newSurvey.set('s2', s2);
      // newSurvey.set('s3', s3);
      // newSurvey.set('s4', s4);
      newInfo.save();
      var arr = window.location.href.split("/");
      arr.splice(-1,1);
      var newUrl = arr.join("/") + "/new";
      console.log(newUrl);
      window.location.replace(newUrl);
      // .catch((error) => {
      //   // var arr = window.location.href.split("/");
      //   // var newUrl = arr.join("/") + "/info";
      //   // window.location.replace(newUrl);
      //   this.set('errorMessage', error);
      //   console.log(this.get('errorMessage'));
      // });
    }
  }
});
