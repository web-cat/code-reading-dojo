import Ember from 'ember';

const eq = (params) => params[0] === params[1];
const add = (params) => params[0] + params[1];
export default Ember.Helper.helper(eq);
