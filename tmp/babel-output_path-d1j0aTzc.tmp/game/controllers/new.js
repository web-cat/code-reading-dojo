define('game/controllers/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    beginnerClicked: 'false',
    intermediateClicked: 'false',
    advancedClicked: 'false',
    beginnerTest: '',
    actions: {
      clickedBeginner: function clickedBeginner() {
        if (this.get('beginnerClicked') === 'false') {
          this.set('beginnerClicked', 'true');
        } else {
          this.set('beginnerClicked', 'false');
        }
      },
      clickedIntermediate: function clickedIntermediate() {
        this.set('beginnerClicked', 'true');
      },
      clickedAdvanced: function clickedAdvanced() {
        this.set('beginnerClicked', 'true');
      }
    }
  });
});