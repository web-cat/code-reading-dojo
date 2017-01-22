import Ember from 'ember';

const neq = (params) => params[0].length !== 0;
export default Ember.Helper.helper(neq);
