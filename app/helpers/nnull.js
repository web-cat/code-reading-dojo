import Ember from 'ember';

const nnull = (params) => params[0] === null;
export default Ember.Helper.helper(nnull);
