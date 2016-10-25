// import Ember from 'ember';
//
// export default Ember.Route.extend({
//   model() {
//     return this.store.query('program', { level: '1' });
//   }
// });
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('program', { level: '1' });
  }
});
