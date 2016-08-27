
import Ember from 'ember';

export default Ember.Controller.extend({
  currentUrl:'y',
  clicked:'false',
  actions: {
    getCurrentUrl: function(){
      this.set('currentUrl',window.location.href.split("/").pop());
      this.set('clicked','true');
    },
    unclicked: function(){
      this.set('clicked','false');
    }
  }
});
