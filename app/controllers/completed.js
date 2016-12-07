
import Ember from 'ember';

export default Ember.Controller.extend({
  currentUrl:'t',
  clicked: 'false',
  actions: {
    getCurrentUrl: function(){
      console.log(window.location.href);
      var level = window.location.href.split("/").pop();
      console.log(level);
      this.set('currentUrl',level);
      console.log(this.get('currentUrl'));
      this.set('clicked','true');
    },
    unclicked: function(){
      this.set('clicked','false');
    }
  }
});
