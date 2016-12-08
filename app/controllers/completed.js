
import Ember from 'ember';

export default Ember.Controller.extend({
  currentUrl: '1',
  clicked: 'false',
  actions: {
    getCurrentUrl: function(){
      // console.log(window.location.href);
      var arr = window.location.href.split("/");
      var level = parseInt(arr.pop());
      arr.splice(-1,1);
      var newUrl = arr.join("/") + "/programs/" + level;
      // console.log(level);
      this.set('currentUrl',level.toString());
      // console.log(this.get('currentUrl'));
      this.set('clicked','true');
      window.location.replace(newUrl);
    },
    unclicked: function(){
      this.set('clicked','false');
    }
  }
});
