function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

import computed from 'ember-computed';
import _get from 'ember-metal/get';

export default function (template) {
  var dependentKeys = template.match(/{{([^}]*)}}/g).map(function (key) {
    return key.replace(/{{(.*)}}/, '$1');
  });
  return computed.apply(undefined, _toConsumableArray(dependentKeys).concat([{
    get: function get() {
      var _this = this;

      return dependentKeys.reduce(function (result, key) {
        var value = _get(_this, key);
        if (value == null || result == null) {
          return null;
        }
        return template.replace('{{' + key + '}}', value);
      }, template);
    }
  }]));
}