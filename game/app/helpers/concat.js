import Ember from 'ember';

const concat = (params) => params[0].concat(params[1]);
export default Ember.Helper.helper(concat);
