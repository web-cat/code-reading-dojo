define('game/components/program-details', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    notify: _ember['default'].inject.service('notify'),
    isImageShowing: false,
    isComplete: false,
    level: '',
    returnValue: 'em',
    currentUrl: 's',
    errors: [],
    names: [],
    actions: {
      setCurrentUrl: function setCurrentUrl() {
        this.set('currentUrl', window.location.href.split("/").pop());
      },
      setCurrentLevel: function setCurrentLevel(l) {
        this.set('level', l);
      },
      nextLevel: function nextLevel() {
        this.set('level', parseInt(this.get('level')) + 1);
      },
      findErrors: function findErrors() {
        this.set('errors', this.get('level').split(" "));
      },
      clickCode: function clickCode(errorindexes) {
        var result = errorindexes.split(' ');
        this.set('errors', result);
        var current = this;
        var temp = _ember['default'].$("p:first").text();

        var words = temp.split(" ");
        var text = words.join("</span> <span>");

        _ember['default'].$("p:first").html("<span>" + text + "</span>");
        var s;
        _ember['default'].$("span").click(function () {

          _ember['default'].$(this).css("background-color", "yellow");
          s = _ember['default'].$(this).text();
          var message = "You clicked " + s;
          var k = 0;
          var len = current.errors.length;
          var flag = false;
          for (; k < len; k++) {
            if (current.errors[k] === s) {
              flag = true;
            }
          }
          var finalMessage;
          if (flag === true) {
            finalMessage = message + "\n" + "you found the error!";
            _ember['default'].$('#third-score').attr("class", "star-icon full");
            // document.getElementById("third-score").classList.add("full");
            current.get('notify').success(finalMessage);
            _ember['default'].$(this).css("background-color", "#00CC66");
            current.get('names').pushObject(s);
          } else {
            finalMessage = message + "\n" + "No error!";
            current.get('notify').alert(finalMessage);
            _ember['default'].$(this).css("background-color", "#ff4d4d");
          }
        });
        this.set('returnValue', s);
      },

      done: function done() {
        this.get('notify').alert('Hello there!', {
          radius: true
        });
        this.set('isComplete', true);
      }
    }

  });
});