export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 10
              },
              "end": {
                "line": 12,
                "column": 10
              }
            },
            "moduleName": "game/templates/new.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("img");
            dom.setAttribute(el1,"id","item-completed");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element2, 'src');
            return morphs;
          },
          statements: [
            ["attribute","src",["subexpr","concat",[["subexpr","concat",["assets/images/beginner/",["get","p.level",["loc",[null,[11,84],[11,91]]]]],[],["loc",[null,[11,50],[11,92]]]],".png"],[],["loc",[null,[11,41],[11,101]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 8
            },
            "end": {
              "line": 14,
              "column": 8
            }
          },
          "moduleName": "game/templates/new.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" {{#link-to 'programs' p.level class=\"btn btn-primary btn-lg\" id='beginner-item'}}Level {{p.level}}{{/link-to}} ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","link-to",["programs",["get","p.level",["loc",[null,[10,32],[10,39]]]]],["id","item-completed"],0,null,["loc",[null,[10,10],[12,22]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 8,
            "column": 6
          },
          "end": {
            "line": 15,
            "column": 6
          }
        },
        "moduleName": "game/templates/new.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["subexpr","eq",[["get","p.difficulty",["loc",[null,[9,18],[9,30]]]],"beginner"],[],["loc",[null,[9,14],[9,42]]]]],[],0,null,["loc",[null,[9,8],[14,15]]]]
      ],
      locals: ["p"],
      templates: [child0]
    };
  }());
  var child1 = (function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 10
              },
              "end": {
                "line": 24,
                "column": 10
              }
            },
            "moduleName": "game/templates/new.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("img");
            dom.setAttribute(el1,"id","item-notcompleted");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element1, 'src');
            return morphs;
          },
          statements: [
            ["attribute","src",["subexpr","concat",[["subexpr","concat",["assets/images/intermediate/",["get","p.level",["loc",[null,[23,91],[23,98]]]]],[],["loc",[null,[23,53],[23,99]]]],".png"],[],["loc",[null,[23,44],[23,108]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 8
            },
            "end": {
              "line": 26,
              "column": 8
            }
          },
          "moduleName": "game/templates/new.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" {{#link-to 'programs' p.level class=\"btn btn-primary btn-lg\" id='beginner-item'}}Level {{p.level}}{{/link-to}} ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","link-to",["programs",["get","p.level",["loc",[null,[22,32],[22,39]]]]],["id","item-notcompleted"],0,null,["loc",[null,[22,10],[24,22]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 20,
            "column": 6
          },
          "end": {
            "line": 27,
            "column": 6
          }
        },
        "moduleName": "game/templates/new.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["subexpr","eq",[["get","p.difficulty",["loc",[null,[21,18],[21,30]]]],"intermediate"],[],["loc",[null,[21,14],[21,46]]]]],[],0,null,["loc",[null,[21,8],[26,15]]]]
      ],
      locals: ["p"],
      templates: [child0]
    };
  }());
  var child2 = (function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 34,
                "column": 10
              },
              "end": {
                "line": 36,
                "column": 10
              }
            },
            "moduleName": "game/templates/new.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("img");
            dom.setAttribute(el1,"id","item-notcompleted");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'src');
            return morphs;
          },
          statements: [
            ["attribute","src",["subexpr","concat",[["subexpr","concat",["assets/images/advanced/",["get","p.level",["loc",[null,[35,89],[35,96]]]]],[],["loc",[null,[35,55],[35,97]]]],".png"],[],["loc",[null,[35,46],[35,106]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 8
            },
            "end": {
              "line": 38,
              "column": 8
            }
          },
          "moduleName": "game/templates/new.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" {{#link-to 'programs' p.level class=\"btn btn-primary btn-lg\" id='beginner-item'}}Level {{p.level}}{{/link-to}} ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","link-to",["programs",["get","p.level",["loc",[null,[34,32],[34,39]]]]],["id","item-notcompleted"],0,null,["loc",[null,[34,10],[36,22]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 32,
            "column": 6
          },
          "end": {
            "line": 39,
            "column": 6
          }
        },
        "moduleName": "game/templates/new.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["subexpr","eq",[["get","p.difficulty",["loc",[null,[33,18],[33,30]]]],"advanced"],[],["loc",[null,[33,14],[33,42]]]]],[],0,null,["loc",[null,[33,8],[38,15]]]]
      ],
      locals: ["p"],
      templates: [child0]
    };
  }());
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
          "line": 58,
          "column": 0
        }
      },
      "moduleName": "game/templates/new.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","jumbotron text-center");
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("img");
      dom.setAttribute(el2,"id","new-logo");
      dom.setAttribute(el2,"src","assets/images/logo.png");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("p");
      var el3 = dom.createTextNode("Select an excercise you want to play");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","form-horizontal form-group form-group-lg row");
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment(" <div class=\"col-xs-10 col-xs-offset-1 col-sm-offset-4 col-sm-4 col-md-4\"> ");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment(" <button {{action \"clickedBeginner\"}} class=\"btn btn-info btn-lg btn-block\">Beginners</button> ");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","levels");
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("br");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("br");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("br");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("br");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n          ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment(" {{#link-to 'programs' 1 class=\"btn btn-primary btn-lg btn-block\" invokeAction=(action 'clickedAdvanced')}}Intermediates{{/link-to}}\n{{#if (eq intermediateClicked 'true')}}\n            {{#each programs as |program|}}\n              Test\n            {{/each}}\n          {{/if}}\n          {{#link-to 'programs' 1 class=\"btn btn-primary btn-lg btn-block\" }}Advancedes{{/link-to}}\n{{#if (eq advancedClicked 'true')}}\n          {{#each programs as |program|}}\n            Test3\n          {{/each}}\n          {{/if}} ");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n      ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment(" </div> ");
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
      var element3 = dom.childAt(fragment, [0, 5, 5]);
      var morphs = new Array(3);
      morphs[0] = dom.createMorphAt(element3,1,1);
      morphs[1] = dom.createMorphAt(element3,7,7);
      morphs[2] = dom.createMorphAt(element3,13,13);
      return morphs;
    },
    statements: [
      ["block","each",[["get","model",["loc",[null,[8,14],[8,19]]]]],[],0,null,["loc",[null,[8,6],[15,15]]]],
      ["block","each",[["get","model",["loc",[null,[20,14],[20,19]]]]],[],1,null,["loc",[null,[20,6],[27,15]]]],
      ["block","each",[["get","model",["loc",[null,[32,14],[32,19]]]]],[],2,null,["loc",[null,[32,6],[39,15]]]]
    ],
    locals: [],
    templates: [child0, child1, child2]
  };
}()));