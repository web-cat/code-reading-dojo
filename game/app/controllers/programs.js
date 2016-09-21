
import Ember from 'ember';

export default Ember.Controller.extend({
  currentUrl:'y',
  clicked:'false',
  notify: Ember.inject.service('notify'),
  isImageShowing: false,
  isComplete: false,
  level: '',
  returnValue: 'em',
  currentUrl:'s',
  errors: ['a','b'],
  clickedWords: [],
  started: 'false',
  score: 0,
  actions: {
    getCurrentUrl: function(){
      this.set('currentUrl',window.location.href.split("/").pop());
      this.set('clicked','true');
    },
    clicked: function(){
      if(this.get('clicked')=='true')
        this.set('clicked','false');
      else
        this.set('clicked','true');
    },
    clickCode(errorindexes){
      // $("span:first").css("display","block");
      $("pre").css("display","block");
      var result = errorindexes.split(' ');
      this.set('errors', result);
      var current = this;
      var temp = $("pre:first").text();
    	var words = temp.split(" ");
 	 	  var text = words.join("</span> <span>");

  		$("pre:first").html("<span>" + text + "</span>");
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
          var newScore = current.get('score') + 1;
          current.set('score', newScore);
          var finalMessage = message + "\n" + "you found the error!";
          current.get('notify').success(finalMessage);
          $(this).css("background-color","#00CC66");
          current.get('clickedWords').pushObject(s);
          // var print = "@@" + current.get('clickedWords') +"##";
          // current.get('notify').success(print);
        }
        else {
          var newScore = current.get('score') - 1;
          current.set('score', newScore);
          var finalMessage = message + "\n" + "No error!"
          current.get('notify').alert(finalMessage);
          $(this).css("background-color","#ff4d4d");
          // current.get('notify').success(newScore);
        }
        if (current.get('score') === 3)
        {
          current.get('notify').success("YEEEEEY");
          var next = parseInt(current.get('currentUrl')) + 1;
          var url = '#/completed/' +  next;
           window.location.href=url;
        }
 	    });
      this.set('returnValue',s);
      this.set('started','true');
        // this.set('clicked','false');
    },
  }
});
