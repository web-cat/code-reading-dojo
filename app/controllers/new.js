import Ember from 'ember';

const { inject: { service }, Controller } = Ember;

export default Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),

});
