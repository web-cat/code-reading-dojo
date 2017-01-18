import Ember from 'ember';

const gt = (params) => parseInt(params[0]) >= parseInt(params[1]);
export default Ember.Helper.helper(gt);
