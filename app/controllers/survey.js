import Ember from 'ember';

const { inject: { service }, Controller } = Ember;

export default Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),
  beginnerClicked: 'false',
  intermediateClicked: 'false',
  advancedClicked: 'false',
  beginnerTest: '',
  actions: {
    clickedBeginner: function(){
      if (this.get('beginnerClicked')==='false') {
        this.set('beginnerClicked','true');
      } else {
        this.set('beginnerClicked','false');
      }
    },
    clickedIntermediate: function(){
      this.set('beginnerClicked','true');
    },
    clickedAdvanced: function(){
      this.set('beginnerClicked','true');
    },
    save(survey){
      let userId = this.get('session.data.email');
      let s1 = Ember.$('input[name=s1]:checked', '#contact').val();
      let s2 = Ember.$('input[name=s2]:checked', '#contact').val();
      let s3 = Ember.$('input[name=s3]:checked', '#contact').val();
      let s4 = Ember.$('input[name=s4]:checked', '#contact').val();
      let newSurvey = survey;
      newSurvey.set('email', userId);
      newSurvey.set('s1', s1);
      newSurvey.set('s2', s2);
      newSurvey.set('s3', s3);
      newSurvey.set('s4', s4);
      newSurvey.save()
      .catch((error) => {
        // var arr = window.location.href.split("/");
        // var newUrl = arr.join("/") + "/info";
        // window.location.replace(newUrl);
        this.set('errorMessage', error);
        console.log(this.get('errorMessage'));
      });


}



  }
});
