import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  isImageShowing: false,
  isComplete: false,
  level: '',
  returnValue: 'em',
  currentUrl:'s',
  errors: [],
  names: [],
  actions: {
    setCurrentUrl(){
      this.set('currentUrl', window.location.href.split("/").pop());
    },
    setCurrentLevel(l){
      this.set('level',l);
    },
    nextLevel(){
      this.set('level',parseInt(this.get('level'))+1);
    },
    findErrors(){
      this.set('errors', this.get('level').split(" "));
    },
    clickCode(errorindexes){
      var result = errorindexes.split(' ');
      this.set('errors', result);
      var current = this;
      var temp = Ember.$("p:first").text();

    	var words = temp.split(" ");
 	 	  var text = words.join("</span> <span>");

  		Ember.$("p:first").html("<span>" + text + "</span>");
      var s;
  		Ember.$("span").click(function ()
      {

      	Ember.$(this).css("background-color","yellow");
        s = Ember.$(this).text();
        var message = "You clicked "+ s;
        var k = 0;
        var len = current.errors.length;
        var flag = false;
        for (; k < len; k++)
        {
          if(current.errors[k] === s)
          {
           flag = true;
          }
        }
        var finalMessage;
        if (flag === true)
        {
          finalMessage = message + "\n" + "you found the error!";
          current.get('notify').success(finalMessage);
          Ember.$(this).css("background-color","#00CC66");
          current.get('names').pushObject(s);
        }
        else {
          finalMessage = message + "\n" + "No error!";
          current.get('notify').alert(finalMessage);
          Ember.$(this).css("background-color","#ff4d4d");
        }
 	    });
      this.set('returnValue',s);
    },

    done(){
      this.get('notify').alert('Hello there!', {
        radius: true
      });
      this.set('isComplete', true);
    }
  }

});
