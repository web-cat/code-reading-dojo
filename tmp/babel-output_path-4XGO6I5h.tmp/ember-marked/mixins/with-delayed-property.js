define('ember-marked/mixins/with-delayed-property', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var DO_NOT_SET = Object.create(null);

  /**
   * Handles updating a property given the name of the source property using a delayed method from
   * `Ember.run` (`throttle`, `debounce`, `later`).
   *
   * @mixin WithDelayedPropertyMixin
   */
  var WithDelayedPropertyMixin = _ember['default'].Mixin.create({
    /**
     * The name of the property to use as source value
     * @property delayedPropertyName
     * @type String
     */
    delayedPropertyName: _ember['default'].required(),
    /**
     * The name of the property to use as destination (computed value from source using the
     * `delayedPropertyFunction` will be set to this property)
     * @property delayedPropertyDestination
     * @type String
     */
    delayedPropertyDestination: _ember['default'].required(),
    /**
     * The delay to use with the `Ember.run.*` method
     * @property delayedPropertyDelay
     * @type Number
     */
    delayedPropertyDelay: 500,
    /**
     * The method to delay the computed value of destination (`throttle`, `debounce`, `later`)
     * @property delayedPropertyMethod
     * @type String
     */
    delayedPropertyMethod: 'throttle',
    /**
     * The value to be used when computing the value of the destination fails.
     * Using `WithDelayedPropertyMixin.DO_NOT_SET` will result in not setting the destination property
     * @property delayedPropertyErrorValue
     * @type *
     */
    delayedPropertyErrorValue: DO_NOT_SET,
    /**
     * The function used to computed the value of the destination. It can directly return the computed
     * value, or return a promise which would resolve in that computed value
     * @property delayedPropertyFunction
     * @type Function
     */
    delayedPropertyFunction: function delayedPropertyFunction(value) {
      return value;
    },

    /**
     * The main function, used to update the destination property using the source property
     *
     * @method updateDelayedPropertyValue
     */
    updateDelayedPropertyValue: function updateDelayedPropertyValue() {
      var value,
          self = this,
          sourceValue;
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      // added `__dummy__` in case there is no delayed property set, to avoid errors
      sourceValue = this.get(this.get('delayedPropertyName') || '__dummy__');
      if (this._delayedPropertyPromise) {
        this._scheduleDelayedPropertyUpdate();
      } else {
        try {
          value = this.delayedPropertyFunction(sourceValue);
        } catch (error) {
          _ember['default'].warn('[ember-marked] ' + error);
          this._setDelayedPropertyValue(this.get('delayedPropertyErrorValue'));
          return;
        }
        if (value && typeof value.then === 'function') {
          this._delayedPropertyPromise = value;
          value.then(function updateValueSuccess(value) {
            self._delayedPropertyPromise = null;
            self._setDelayedPropertyValue(value);
          })
          /* jshint -W024 */
          ['catch'](function updateValueError(error) {
            _ember['default'].warn('[ember-marked] ' + error);
            self._delayedPropertyPromise = null;
            self._setDelayedPropertyValue(self.get('delayedPropertyErrorValue'));
          });
        } else {
          this._setDelayedPropertyValue(value);
        }
      }
    },

    /**
     * Setup our mixin, listening for the source property changes
     *
     * @method _setupWithDelayedPropertyMixin
     * @private
     */
    _setupWithDelayedPropertyMixin: _ember['default'].on('init', _ember['default'].observer('delayedPropertyName', function () {
      var prop = this.get('delayedPropertyName');
      if (prop) {
        this.addObserver(prop, this, '_scheduleDelayedPropertyUpdate');
      }
    })),

    /**
     * Teardown our mixin, removing the listeners for the source property changes
     *
     * @method _teardownWithDelayedPropertyMixin
     * @private
     */
    _teardownWithDelayedPropertyMixin: _ember['default'].on('destroy', _ember['default'].beforeObserver('delayedPropertyName', function () {
      var prop = this.get('delayedPropertyName');
      if (prop) {
        this.removeObserver(prop, this, '_scheduleDelayedPropertyUpdate');
      }
    })),

    /**
     * Save the promise used to resolve the property value, so that we don't run it many times
     * @property _delayedPropertyPromise
     * @type Ember.RSVP.Promise
     * @private
     */
    _delayedPropertyPromise: null,

    /**
     * Sets the value of the destination
     *
     * @method _setDelayedPropertyValue
     * @param {*} value
     * @private
     */
    _setDelayedPropertyValue: function _setDelayedPropertyValue(value) {
      var name, srcName;
      if (this.isDestroyed || this.isDestroying || value === DO_NOT_SET) {
        return;
      }
      name = this.get('delayedPropertyDestination');
      srcName = this.get('delayedPropertyName');
      if (!name) {
        return;
      }
      if (name === srcName) {
        // if the destination is the same as the source, stop listening while updating
        this._teardownWithDelayedPropertyMixin();
        this.set(name, value);
        this._setupWithDelayedPropertyMixin();
      } else {
        this.set(name, value);
      }
    },

    /**
     * Schedule the update of our destination property
     *
     * @method _scheduleDelayedPropertyUpdate
     * @private
     */
    _scheduleDelayedPropertyUpdate: _ember['default'].on('init', function () {
      var value = this.get(this.get('delayedPropertyName') || '__dummy__');
      _ember['default'].run[this.get('delayedPropertyMethod')](this, 'updateDelayedPropertyValue', value, this.get('delayedPropertyDelay'));
    })
  });

  /**
   * Value to use when you do not want to update the destination value if there was an error
   * @property DO_NOT_SET
   * @type Object
   */
  WithDelayedPropertyMixin.DO_NOT_SET = DO_NOT_SET;

  exports['default'] = WithDelayedPropertyMixin;
});