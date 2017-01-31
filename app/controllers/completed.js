import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),
  currentUrl: '1',
  clicked: 'false',
  actions: {
    getCurrentUrl: function(user){
      // console.log(window.location.href);
      var arr = window.location.href.split("/");
      var level = parseInt(arr.pop());
      arr.splice(-1,1);
      var newUrl = arr.join("/") + "/programs/" + level;
      // console.log(level);
      this.set('currentUrl',level.toString());
      // console.log(this.get('currentUrl'));
      this.set('clicked','true');

      // console.log('*********************');
      // console.log(JSON.stringify(user));
      var currentLevel = user.get('levelcompleted');
      var thisLevel = this.get('currentUrl');
      // console.log('****currentLevel in user****23234234*****thisLevel by user********');
      // console.log(currentLevel);
      // console.log(thisLevel);
      if (currentLevel < thisLevel) {
        user.set('levelcompleted', thisLevel.toString());
        this.set('session.data.level',thisLevel.toString());
        user.save();
      }
      // console.log("^%^%^%^%^%^%^thisLevel.toString()%^%^%^%^");
      // console.log(this.get('session.data.level'));
      //console.log(JSON.stringify(user));
      window.location.replace(newUrl);
    },
    survey: function(user){
      // console.log(window.location.href);
      var arr = window.location.href.split("/");
      var level = parseInt(arr.pop());
      arr.splice(-1,1);
      var newUrl = arr.join("/") + "/survey";
      // console.log(level);
      this.set('currentUrl',level.toString());
      // console.log(this.get('currentUrl'));
      this.set('clicked','true');

      // console.log('*********************');
      // console.log(JSON.stringify(user));
      var currentLevel = user.get('levelcompleted');
      var thisLevel = this.get('currentUrl') - 1;
      console.log('******PPLLL***************');
      console.log(currentLevel);
      console.log(thisLevel);
      if (currentLevel < this.get('currentUrl')) {
        user.set('levelcompleted', thisLevel.toString());
        this.set('session.data.level',this.get('currentUrl'));
        user.save();
      }
      // console.log("^%^%^%^%^%SSSSSS^%^%^%^%^%^");
      // console.log(this.get('session.data.level'));
      //console.log(JSON.stringify(user));
      window.location.replace(newUrl);
    },
    unclicked: function(){
      this.set('clicked','false');
    }
  }
});
