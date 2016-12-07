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
        var message = "You clicked on "+ s;
        var k = 0;
        console.log(current.errors);
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
          finalMessage = message + "\n" + ". You found one error!";
          //Ember.$('#third-score').attr("class","star-icon full");
          // document.getElementById("third-score").classList.add("full");
          current.get('notify').success(finalMessage);
          Ember.$(this).css("background-color","#00CC66");
          //current.get('names').pushObject("YEY");
          var newCount = current.get('plusCount') + 1;
          console.log(len);
          current.set('plusCount',newCount);
        }
        else {
          if (Ember.$('#third-score').attr("class") === "star-icon full") {
            Ember.$('#third-score').attr("class","star-icon");
          }
          finalMessage = message + "\n" + "No error!";
          current.get('notify').alert(finalMessage);
          Ember.$(this).css("background-color","#ff4d4d");
          var newMinusCount = current.get('minusCount') + 1;
          current.set('minusCount',newMinusCount);
          console.log(newMinusCount);
        }
        if (current.get('plusCount') === (len - 1) ) {
          console.log('heeeereeee');
           if (current.get('minusCount') < (len - 1) ) {
             console.log('theeeereee');
            current.get('notify').success("You Won!");
            current.set('errors','');
            // window.location.replace("http://localhost:4200/#/new");
           }
        }
 	    });
      this.set('returnValue',s);
    }
  }

});
