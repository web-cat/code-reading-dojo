
import {
  Component,
  inject
} from 'ember';
export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  isImageShowing: false,
  isComplete: false,
  levelNum: 2,
  returnValue: 'em',
  actions: {
    addLevel(){
      this.set('levelNum',this.get('levelNum')+1);
    },
    imageShow() {
      this.set('isImageShowing', true);
    },
    imageHide() {
      this.set('isImageShowing', false);
    },
    clickCode(error){
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
      if(s == error) {
      current.get('notify').info("YOU FOUND THE SMELL!");
      $(this).css("background-color","#00CC66");
      }
      else {
            current.get('notify').info("NO SMELL!");
          $(this).css("background-color","#ff4d4d");
      }
 	  });
    this.set('returnValue',s);
    },
    changeColor(){

  		$("span").click(function () {
    	$(this).css("background-color","blue");
      var s = $(this).text();
      var message = "You clicked "+ s;
      current.get('notify').info(message);

 	  });
  },

    done(){

      this.get('notify').alert('Hello there!', {
        radius: true
      });
      this.set('isComplete', true);
    }



  }

});
