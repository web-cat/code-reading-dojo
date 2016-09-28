export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 8
            },
            "end": {
              "line": 6,
              "column": 8
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","value",["loc",[null,[5,20],[5,25]]]],["get","formElementId",["loc",[null,[5,26],[5,39]]]],["get","validation",["loc",[null,[5,40],[5,50]]]]],[],["loc",[null,[5,12],[5,52]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 8
            },
            "end": {
              "line": 8,
              "column": 8
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","bs-input",[],["id",["subexpr","@mut",[["get","formElementId",["loc",[null,[7,26],[7,39]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[7,45],[7,49]]]]],[],[]],"type",["subexpr","@mut",[["get","controlType",["loc",[null,[7,55],[7,66]]]]],[],[]],"value",["subexpr","@mut",[["get","value",["loc",[null,[7,73],[7,78]]]]],[],[]],"placeholder",["subexpr","@mut",[["get","placeholder",["loc",[null,[7,91],[7,102]]]]],[],[]],"autofocus",["subexpr","@mut",[["get","autofocus",["loc",[null,[7,113],[7,122]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[7,132],[7,140]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[7,150],[7,158]]]]],[],[]]],["loc",[null,[7,12],[7,160]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/horizontal/default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(fragment, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createAttrMorph(element1, 'class');
        morphs[1] = dom.createAttrMorph(element1, 'for');
        morphs[2] = dom.createMorphAt(element1,0,0);
        morphs[3] = dom.createAttrMorph(element2, 'class');
        morphs[4] = dom.createMorphAt(element2,1,1);
        morphs[5] = dom.createMorphAt(element2,3,3);
        morphs[6] = dom.createMorphAt(element2,5,5);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["control-label ",["get","horizontalLabelGridClass",["loc",[null,[2,34],[2,58]]]]," ",["subexpr","if",[["get","invisibleLabel",["loc",[null,[2,66],[2,80]]]],"sr-only"],[],["loc",[null,[2,61],[2,92]]]]]]],
        ["attribute","for",["concat",[["get","formElementId",["loc",[null,[2,101],[2,114]]]]]]],
        ["content","label",["loc",[null,[2,118],[2,127]]]],
        ["attribute","class",["concat",[["get","horizontalInputGridClass",["loc",[null,[3,18],[3,42]]]]]]],
        ["block","if",[["get","hasBlock",["loc",[null,[4,14],[4,22]]]]],[],0,1,["loc",[null,[4,8],[8,15]]]],
        ["inline","partial",["components/form-element/feedback-icon"],[],["loc",[null,[9,8],[9,59]]]],
        ["inline","partial",["components/form-element/errors"],[],["loc",[null,[10,8],[10,52]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }());
  var child1 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 16,
              "column": 8
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","value",["loc",[null,[15,20],[15,25]]]],["get","formElementId",["loc",[null,[15,26],[15,39]]]],["get","validation",["loc",[null,[15,40],[15,50]]]]],[],["loc",[null,[15,12],[15,52]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 8
            },
            "end": {
              "line": 18,
              "column": 8
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","bs-input",[],["name",["subexpr","@mut",[["get","name",["loc",[null,[17,28],[17,32]]]]],[],[]],"type",["subexpr","@mut",[["get","controlType",["loc",[null,[17,38],[17,49]]]]],[],[]],"value",["subexpr","@mut",[["get","value",["loc",[null,[17,56],[17,61]]]]],[],[]],"placeholder",["subexpr","@mut",[["get","placeholder",["loc",[null,[17,74],[17,85]]]]],[],[]],"autofocus",["subexpr","@mut",[["get","autofocus",["loc",[null,[17,96],[17,105]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[17,115],[17,123]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[17,133],[17,141]]]]],[],[]]],["loc",[null,[17,12],[17,143]]]]
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
            "line": 12,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/horizontal/default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element0,1,1);
        morphs[2] = dom.createMorphAt(element0,3,3);
        morphs[3] = dom.createMorphAt(element0,5,5);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",[["get","horizontalInputGridClass",["loc",[null,[13,18],[13,42]]]]," ",["get","horizontalInputOffsetGridClass",["loc",[null,[13,47],[13,77]]]]]]],
        ["block","if",[["get","hasBlock",["loc",[null,[14,14],[14,22]]]]],[],0,1,["loc",[null,[14,8],[18,15]]]],
        ["inline","partial",["components/form-element/feedback-icon"],[],["loc",[null,[19,8],[19,59]]]],
        ["inline","partial",["components/form-element/errors"],[],["loc",[null,[20,8],[20,52]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "wrong-type"
        ]
      },
      "revision": "Ember@2.6.2",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 23,
          "column": 0
        }
      },
      "moduleName": "game/templates/components/form-element/horizontal/default.hbs"
    },
    isEmpty: false,
    arity: 0,
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
      ["block","if",[["get","hasLabel",["loc",[null,[1,6],[1,14]]]]],[],0,1,["loc",[null,[1,0],[22,7]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));