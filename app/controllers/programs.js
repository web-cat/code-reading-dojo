
import Ember from 'ember';

export default Ember.Controller.extend({
  currentUrl:'y',
  clicked:'false',
  actions: {
    getCurrentUrl: function(){
      this.set('currentUrl',window.location.href.split("/").pop());
      console.log(this.get('currentUrl'));
      this.set('clicked','true');
    },
    clicked: function(){
      if(this.get('clicked')==='true'){
        this.set('clicked','false');
      } else {
        this.set('clicked','true');
      }
    }

  }
});
