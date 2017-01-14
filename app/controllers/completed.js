import Ember from 'ember';

const { inject: { service }, Controller } = Ember;

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

      console.log('*********************');
      console.log(JSON.stringify(user));
      user.set('levelcompleted', 'DOLAKI');
      console.log(JSON.stringify(user));
      user.save();
      window.location.replace(newUrl);
    },
    unclicked: function(){
      this.set('clicked','false');
    }
  }
});
