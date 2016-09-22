import Ember from 'ember';

export default Ember.Mixin.create({
  _sendInvokeAction: function _sendInvokeAction() {
    this.sendAction('invokeAction');
  },

  didInitAttrs: function didInitAttrs() {
    this._super.apply(this, arguments);

    // Map desired event name to invoke function
    var eventName = this.get('eventName');

    if (this.get('invokeAction')) {
      this.on(eventName, this, this._sendInvokeAction);
    }
  },

  willDestroyElement: function willDestroyElement() {
    if (this.get('invokeAction')) {
      this.off(this.get('eventName'), this, this._sendInvokeAction);
    }
  }
});