import Ember from 'ember';

const { inject: { service }, Controller } = Ember;

export default Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),
  currentUrl: 'y',
  clicked: 'false',
  actions: {
    getCurrentUrl: function(){
      //console.log('HEEEEREEEEEe');
      this.set('currentUrl',window.location.href.split("/").pop());
      //console.log(this.get('currentUrl'));
      // this.set('clicked','true');
      if(this.get('clicked')==='true'){
        this.set('clicked','false');
      } else {
        Ember.$('#new-logo').hide();
        this.set('clicked','true');
      }
    },
    clicked: function(){
      if(this.get('clicked')==='true'){
        Ember.$('#new-logo').hide();
        this.set('clicked','false');
      } else {
        this.set('clicked','true');
      }
    }

  }
});
