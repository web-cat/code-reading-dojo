define("game/templates/programs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 13,
                      "column": 10
                    },
                    "end": {
                      "line": 15,
                      "column": 10
                    }
                  },
                  "moduleName": "game/templates/programs.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("            NEXT LEVEL\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes() {
                  return [];
                },
                statements: [],
                locals: [],
                templates: []
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 10,
                    "column": 6
                  },
                  "end": {
                    "line": 16,
                    "column": 6
                  }
                },
                "moduleName": "game/templates/programs.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(3);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
                morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["inline", "x-timer", [], ["autoStart", "true", "format", "HH:MM:SS", "stopRequired", false], ["loc", [null, [11, 6], [11, 71]]]], ["inline", "program-details", [], ["program", ["subexpr", "@mut", [["get", "program", ["loc", [null, [12, 36], [12, 43]]]]], [], []]], ["loc", [null, [12, 10], [12, 45]]]], ["block", "link-to", ["completed", ["subexpr", "add", [["get", "currentUrl", ["loc", [null, [13, 38], [13, 48]]]], "1"], [], ["loc", [null, [13, 33], [13, 53]]]]], ["tagName", "button", "invokeAction", ["subexpr", "action", ["clicked"], [], ["loc", [null, [13, 84], [13, 102]]]]], 0, null, ["loc", [null, [13, 10], [15, 22]]]]],
              locals: [],
              templates: [child0]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 4
                },
                "end": {
                  "line": 17,
                  "column": 6
                }
              },
              "moduleName": "game/templates/programs.hbs"
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
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["subexpr", "eq", [["get", "program.level", ["loc", [null, [10, 16], [10, 29]]]], ["get", "currentUrl", ["loc", [null, [10, 30], [10, 40]]]]], [], ["loc", [null, [10, 12], [10, 41]]]]], [], 0, null, ["loc", [null, [10, 6], [16, 13]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 2
              },
              "end": {
                "line": 18,
                "column": 4
              }
            },
            "moduleName": "game/templates/programs.hbs"
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
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "eq", [["get", "program.difficulty", ["loc", [null, [9, 14], [9, 32]]]], "beginner"], [], ["loc", [null, [9, 10], [9, 44]]]]], [], 0, null, ["loc", [null, [9, 4], [17, 13]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 2
            }
          },
          "moduleName": "game/templates/programs.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "eq", [["get", "clicked", ["loc", [null, [8, 12], [8, 19]]]], "true"], [], ["loc", [null, [8, 8], [8, 27]]]]], [], 0, null, ["loc", [null, [8, 2], [18, 11]]]]],
        locals: ["program"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "game/templates/programs.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "jumbotron text-center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "id", "new-logo");
        dom.setAttribute(el2, "src", "assets/images/logo.png");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "id", "confirm-button");
        dom.setAttribute(el2, "class", "btn btn-primary bt-lg");
        var el3 = dom.createTextNode("Ready?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 3]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["element", "action", ["getCurrentUrl", "clicked"], [], ["loc", [null, [4, 59], [4, 95]]]], ["block", "each", [["get", "model", ["loc", [null, [7, 8], [7, 13]]]]], [], 0, null, ["loc", [null, [7, 0], [19, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});