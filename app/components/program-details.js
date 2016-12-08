import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  isComplete: false,
  level: '',
  errorNums: '0',
  returnValue: 'em',
  currentUrl:'s',
  errors: [],
  plusCount: 0,
  minusCount: 0,
  clicked: 'false',
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
      if(this.get('clicked')==='true'){
        this.set('clicked','false');
      } else {
        this.set('clicked','true');
      }

      var result = errorindexes.split(' ');
      for(var i = result.length-1 ; i--;){
	        if (result[i] === "")
          {
            result.splice(i, 1);
          }
      }
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
        var message = s;
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
          finalMessage = "You found one error: \"" + message + "\"";
          // Ember.$('#third-score').attr("class","star-icon full");
          // document.getElementById("third-score").classList.add("full");
          current.get('notify').success(finalMessage, {closeAfter: 1500 });
          Ember.$(this).css("background-color","#00CC66");
          //current.get('names').pushObject("YEY");
          var newCount = current.get('plusCount') + 1;
          current.set('plusCount',newCount);
        }
        else {
          finalMessage = "No error: \"" + message + "\"";
          current.get('notify').alert(finalMessage, {closeAfter: 1500 });
          Ember.$(this).css("background-color","#ff4d4d");
          var newMinusCount = current.get('minusCount') + 1;
          current.set('minusCount',newMinusCount);
        }
        if (current.get('plusCount') === 1 ) {
          Ember.$('#first-score').attr("class","star-icon full");
        }
        if (current.get('plusCount') === 2 ) {
          Ember.$('#second-score').attr("class","star-icon full");
        }
        if (current.get('plusCount') === 3 ) {
          Ember.$('#third-score').attr("class","star-icon full");
        }
        if (current.get('plusCount') === 4 ) {
          Ember.$('#fourth-score').attr("class","star-icon full");
        }
        if (current.get('plusCount') === (len - 1) ) {
           if (current.get('minusCount') < (len - 1) ) {
            current.get('notify').warning("You Win! Click on the Next Level.", {closeAfter: 10000 });
            current.set('errors','');
            var arr = window.location.href.split("/");
            var nextLevel = parseInt(arr.pop()) + 1;
            arr.splice(-1,1);
            var newUrl = arr.join("/") + "/completed/" + nextLevel;
            //console.log(newUrl);
            // var url = (add (window.location.href.split("/").pop()) '1')
            Ember.$('#next').attr("class","next-level");
          //  window.location.replace(newUrl);
           }
        }
 	    });
      this.set('returnValue',s);
    }
  }

});
