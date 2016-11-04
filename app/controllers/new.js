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
    }
  }
});
