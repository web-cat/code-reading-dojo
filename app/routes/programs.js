import Ember from 'ember';
//import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({//AuthenticatedRouteMixin, {
  model() {
    return this.store.query('program', { role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
  }
});
