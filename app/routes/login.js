import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model() {
//     console.log("IS THAT YOU?");
//
//     var glob = function myFunction(file) {
//       // console.log(jQuery.get('http://localhost:4200/assets/key.txt'));
//       return jQuery.get('http://localhost:4200/assets/key.txt');
//     }
//     var x = glob();
//     for(var key in x) {
//     console.log('key: ' + key +  'value: ' + x[key]);
// }
// //  var msg = Ember.$.ajax({type: "GET", url: "http://localhost:4200/assets/key.txt", async: false}).responseText;
//     console.log(x);
return this.store.query('user', { role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
}


});
