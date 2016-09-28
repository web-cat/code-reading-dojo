export { bsContains };
import Ember from 'ember';
import includes from 'ember-bootstrap/utils/array-includes';

var isArray = Ember.isArray;
var A = Ember.A;

function bsContains(params /*, hash*/) {
  return isArray(params[0]) ? includes(A(params[0]), params[1]) : false;
}

export default Ember.Helper.helper(bsContains);