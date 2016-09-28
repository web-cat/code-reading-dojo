export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "triple-curlies"
      },
      "revision": "Ember@2.6.2",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 25,
          "column": 0
        }
      },
      "moduleName": "game/templates/login.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","jumbotron text-center");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("img");
      dom.setAttribute(el2,"id","new-logo");
      dom.setAttribute(el2,"src","assets/images/logo.png");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("h1");
      dom.setAttribute(el2,"id","index-title");
      var el3 = dom.createTextNode("CodeReadingDojo");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("h4");
      var el3 = dom.createTextNode("Sign in to CodeReadingDojo");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment(" <div class=\"form-horizontal form-group form-group-lg row\">\n        <div id=\"signin-container\" class=\"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-4 col-md-offset-4\">\n            <p class=\"user-pass\">Username</p>\n            {{input type=\"email\" value=emailAddress class=\"form-control\" placeholder=\"Email address\" autofocus=\"autofocus\"}}\n            <br>\n            <p class=\"user-pass\">Password</p>\n            {{input type=\"email\" value=emailAddress class=\"form-control\" placeholder=\"Password\" autofocus=\"autofocus\"}}\n            {{#link-to 'new' id=\"index-button\" class=\"btn btn-primary btn-lg btn-block\" }}login{{/link-to}}\n        </div>\n    </div> ");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("form");
      var el3 = dom.createTextNode("\n      Email:\n      ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n      password:\n      ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n      ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"type","submit");
      var el4 = dom.createTextNode("submit");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 9]);
      var morphs = new Array(3);
      morphs[0] = dom.createElementMorph(element0);
      morphs[1] = dom.createMorphAt(element0,1,1);
      morphs[2] = dom.createMorphAt(element0,3,3);
      return morphs;
    },
    statements: [
      ["element","action",["authenticate"],["on","submit"],["loc",[null,[15,10],[15,47]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","email",["loc",[null,[17,20],[17,25]]]]],[],[]],"type","text"],["loc",[null,[17,6],[17,39]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","password",["loc",[null,[20,20],[20,28]]]]],[],[]],"type","password"],["loc",[null,[20,6],[20,46]]]]
    ],
    locals: [],
    templates: []
  };
}()));