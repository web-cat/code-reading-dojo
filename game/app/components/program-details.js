import Ember from 'ember';
import {
  Component,
  inject
} from 'ember';

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
    }
    clickCode(){
      // this.get('notify').info('Hello there!');
      var current = this;
      var temp = $("p:first").text();
    	var words = temp.split(" ");
 	 	  var text = words.join("</span> <span>");

  		$("p:first").html("<span>" + text + "</span>");
      var s;
  		$("span").click(function ()
      {

      	$(this).css("background-color","yellow");
        s = $(this).text();
        var message = "You clicked "+ s;
        var k = 0;
        var len = current.errors.length;
        var flag = false;
        var j = '1';
        for (; k < len; k++)
        {
          if(current.errors[k] === s)
          {
           flag = true;
          }
        }
        if (flag === true)
        {
          var finalMessage = message + "\n" + "you found the error!";
          current.get('notify').success(finalMessage);
          $(this).css("background-color","#00CC66");
          current.get('names').pushObject("s");
        }
        else {
          var finalMessage = message + "\n" + "No error!"
          current.get('notify').alert(finalMessage);
          $(this).css("background-color","#ff4d4d");
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
