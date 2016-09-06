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
  errors: ["static", "void", "list"],
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
    clickCode(){
      var current = this;
      var temp = $("p:first").text();
    	var words = temp.split(" ");
 	 	  var text = words.join("</span> <span>");

  		$("p:first").html("<span>" + text + "</span>");
      var s;
  		$("span").click(function () {
      	$(this).css("background-color","yellow");
        s = $(this).text();
        var message = "You clicked "+ s;
        current.get('notify').info(message);
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
          current.get('notify').success("YOU FOUND THE ERROR!");
          $(this).css("background-color","#00CC66");
          current.get('names').pushObject("s");
        }
        else {
          current.get('notify').warning("NO ERROR!");
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
