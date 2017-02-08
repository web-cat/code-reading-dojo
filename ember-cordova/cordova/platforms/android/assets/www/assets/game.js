"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('game/adapters/application', ['exports', 'active-model-adapter', 'ember-simple-auth/mixins/data-adapter-mixin', 'game/config/environment'], function (exports, _activeModelAdapter, _emberSimpleAuthMixinsDataAdapterMixin, _gameConfigEnvironment) {
  exports['default'] = _activeModelAdapter['default'].extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
    authorizer: 'authorizer:devise',
    host: _gameConfigEnvironment['default'].host
  });
});
define('game/app', ['exports', 'ember', 'game/resolver', 'ember-load-initializers', 'game/config/environment'], function (exports, _ember, _gameResolver, _emberLoadInitializers, _gameConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _gameConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _gameConfigEnvironment['default'].podModulePrefix,
    Resolver: _gameResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _gameConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('game/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise', 'ember'], function (exports, _emberSimpleAuthAuthenticatorsDevise, _ember) {
  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;
  var run = _ember['default'].run;
  exports['default'] = _emberSimpleAuthAuthenticatorsDevise['default'].extend({
    serverTokenEndpoint: 'http://codereadingdojo.cs.vt.edu/users/sign_in',
    restore: function restore(data) {
      return new RSVP.Promise(function (resolve, reject) {
        if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) && !isEmpty(data.tokenType) && !isEmpty(data.email) && !isEmpty(data.client)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(identification, password) {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var _getProperties = _this.getProperties('identificationAttributeName');

        var identificationAttributeName = _getProperties.identificationAttributeName;

        var data = { password: password };
        data[identificationAttributeName] = identification;

        _this.makeRequest(data).then(function (response, status, xhr) {
          //save the five headers needed to send to devise-token-auth
          //when making an authorized API call
          var result = {
            accessToken: xhr.getResponseHeader('access-token'),
            expiry: xhr.getResponseHeader('expiry'),
            tokenType: xhr.getResponseHeader('token-type'),
            uid: xhr.getResponseHeader('uid'),
            email: xhr.getResponseHeader('email'),
            client: xhr.getResponseHeader('client')
          };

          run(null, resolve, result);
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    }
  });
});
//app/authenticators/devise.js
define('game/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant'], function (exports, _emberSimpleAuthAuthenticatorsOauth2PasswordGrant) {
  exports['default'] = _emberSimpleAuthAuthenticatorsOauth2PasswordGrant['default'].extend();
});
define('game/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, _emberSimpleAuthAuthorizersDevise) {
  exports['default'] = _emberSimpleAuthAuthorizersDevise['default'].extend({
    serverTokenEndpoint: 'http://codereadingdojo.cs.vt.edu/token'
  });
});
// app/authorizers/devise.js
define('game/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'game/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _gameConfigEnvironment) {

  var name = _gameConfigEnvironment['default'].APP.name;
  var version = _gameConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('game/components/bs-accordion-item', ['exports', 'ember-bootstrap/components/bs-accordion-item'], function (exports, _emberBootstrapComponentsBsAccordionItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsAccordionItem['default'];
    }
  });
});
define('game/components/bs-accordion', ['exports', 'ember-bootstrap/components/bs-accordion'], function (exports, _emberBootstrapComponentsBsAccordion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsAccordion['default'];
    }
  });
});
define('game/components/bs-alert', ['exports', 'ember-bootstrap/components/bs-alert'], function (exports, _emberBootstrapComponentsBsAlert) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsAlert['default'];
    }
  });
});
define('game/components/bs-button-group', ['exports', 'ember-bootstrap/components/bs-button-group'], function (exports, _emberBootstrapComponentsBsButtonGroup) {
  exports['default'] = _emberBootstrapComponentsBsButtonGroup['default'];
});
define('game/components/bs-button', ['exports', 'ember-bootstrap/components/bs-button'], function (exports, _emberBootstrapComponentsBsButton) {
  exports['default'] = _emberBootstrapComponentsBsButton['default'];
});
define('game/components/bs-collapse', ['exports', 'ember-bootstrap/components/bs-collapse'], function (exports, _emberBootstrapComponentsBsCollapse) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsCollapse['default'];
    }
  });
});
define('game/components/bs-dropdown-button', ['exports', 'ember-bootstrap/components/bs-dropdown-button'], function (exports, _emberBootstrapComponentsBsDropdownButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdownButton['default'];
    }
  });
});
define('game/components/bs-dropdown-menu', ['exports', 'ember-bootstrap/components/bs-dropdown-menu'], function (exports, _emberBootstrapComponentsBsDropdownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdownMenu['default'];
    }
  });
});
define('game/components/bs-dropdown-toggle', ['exports', 'ember-bootstrap/components/bs-dropdown-toggle'], function (exports, _emberBootstrapComponentsBsDropdownToggle) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdownToggle['default'];
    }
  });
});
define('game/components/bs-dropdown', ['exports', 'ember-bootstrap/components/bs-dropdown'], function (exports, _emberBootstrapComponentsBsDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsDropdown['default'];
    }
  });
});
define('game/components/bs-form-element', ['exports', 'ember-bootstrap/components/bs-form-element'], function (exports, _emberBootstrapComponentsBsFormElement) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsFormElement['default'];
    }
  });
});
define('game/components/bs-form-group', ['exports', 'ember-bootstrap/components/bs-form-group'], function (exports, _emberBootstrapComponentsBsFormGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsFormGroup['default'];
    }
  });
});
define('game/components/bs-form', ['exports', 'ember-bootstrap/components/bs-form'], function (exports, _emberBootstrapComponentsBsForm) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsForm['default'];
    }
  });
});
define('game/components/bs-input', ['exports', 'ember-bootstrap/components/bs-input'], function (exports, _emberBootstrapComponentsBsInput) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsInput['default'];
    }
  });
});
define('game/components/bs-modal-backdrop', ['exports', 'ember-bootstrap/components/bs-modal-backdrop'], function (exports, _emberBootstrapComponentsBsModalBackdrop) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalBackdrop['default'];
    }
  });
});
define('game/components/bs-modal-body', ['exports', 'ember-bootstrap/components/bs-modal-body'], function (exports, _emberBootstrapComponentsBsModalBody) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalBody['default'];
    }
  });
});
define('game/components/bs-modal-dialog', ['exports', 'ember-bootstrap/components/bs-modal-dialog'], function (exports, _emberBootstrapComponentsBsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalDialog['default'];
    }
  });
});
define('game/components/bs-modal-footer', ['exports', 'ember-bootstrap/components/bs-modal-footer'], function (exports, _emberBootstrapComponentsBsModalFooter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalFooter['default'];
    }
  });
});
define('game/components/bs-modal-header', ['exports', 'ember-bootstrap/components/bs-modal-header'], function (exports, _emberBootstrapComponentsBsModalHeader) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalHeader['default'];
    }
  });
});
define('game/components/bs-modal', ['exports', 'ember-bootstrap/components/bs-modal'], function (exports, _emberBootstrapComponentsBsModal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModal['default'];
    }
  });
});
define('game/components/bs-nav-item', ['exports', 'ember-bootstrap/components/bs-nav-item'], function (exports, _emberBootstrapComponentsBsNavItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavItem['default'];
    }
  });
});
define('game/components/bs-nav', ['exports', 'ember-bootstrap/components/bs-nav'], function (exports, _emberBootstrapComponentsBsNav) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNav['default'];
    }
  });
});
define('game/components/bs-navbar-content', ['exports', 'ember-bootstrap/components/bs-navbar-content'], function (exports, _emberBootstrapComponentsBsNavbarContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbarContent['default'];
    }
  });
});
define('game/components/bs-navbar-nav', ['exports', 'ember-bootstrap/components/bs-navbar-nav'], function (exports, _emberBootstrapComponentsBsNavbarNav) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbarNav['default'];
    }
  });
});
define('game/components/bs-navbar-toggle', ['exports', 'ember-bootstrap/components/bs-navbar-toggle'], function (exports, _emberBootstrapComponentsBsNavbarToggle) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbarToggle['default'];
    }
  });
});
define('game/components/bs-navbar', ['exports', 'ember-bootstrap/components/bs-navbar'], function (exports, _emberBootstrapComponentsBsNavbar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsNavbar['default'];
    }
  });
});
define('game/components/bs-progress-bar', ['exports', 'ember-bootstrap/components/bs-progress-bar'], function (exports, _emberBootstrapComponentsBsProgressBar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsProgressBar['default'];
    }
  });
});
define('game/components/bs-progress', ['exports', 'ember-bootstrap/components/bs-progress'], function (exports, _emberBootstrapComponentsBsProgress) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsProgress['default'];
    }
  });
});
define('game/components/bs-select', ['exports', 'ember-bootstrap/components/bs-select'], function (exports, _emberBootstrapComponentsBsSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsSelect['default'];
    }
  });
});
define('game/components/bs-tab-pane', ['exports', 'ember-bootstrap/components/bs-tab-pane'], function (exports, _emberBootstrapComponentsBsTabPane) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTabPane['default'];
    }
  });
});
define('game/components/bs-tab', ['exports', 'ember-bootstrap/components/bs-tab'], function (exports, _emberBootstrapComponentsBsTab) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTab['default'];
    }
  });
});
define('game/components/bs-textarea', ['exports', 'ember-bootstrap/components/bs-textarea'], function (exports, _emberBootstrapComponentsBsTextarea) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsTextarea['default'];
    }
  });
});
define('game/components/code-block', ['exports', 'ember-prism/components/code-block'], function (exports, _emberPrismComponentsCodeBlock) {
  exports['default'] = _emberPrismComponentsCodeBlock['default'];
});
define('game/components/code-inline', ['exports', 'ember-prism/components/code-inline'], function (exports, _emberPrismComponentsCodeInline) {
  exports['default'] = _emberPrismComponentsCodeInline['default'];
});
define('game/components/code-section', ['exports', 'ember-marked/components/code-section'], function (exports, _emberMarkedComponentsCodeSection) {
  exports['default'] = _emberMarkedComponentsCodeSection['default'];
});
define("game/components/code-snippet", ["exports", "ember", "game/snippets"], function (exports, _ember, _gameSnippets) {

  /* global require */
  var Highlight = require('highlight.js');

  exports["default"] = _ember["default"].Component.extend({
    tagName: 'pre',
    classNameBindings: ['language'],
    unindent: true,

    _unindent: function _unindent(src) {
      if (!this.get('unindent')) {
        return src;
      }
      var match,
          min,
          lines = src.split("\n");
      for (var i = 0; i < lines.length; i++) {
        match = /^\s*/.exec(lines[i]);
        if (match && (typeof min === 'undefined' || min > match[0].length)) {
          min = match[0].length;
        }
      }
      if (typeof min !== 'undefined' && min > 0) {
        src = src.replace(new RegExp("(\\n|^)\\s{" + min + "}", 'g'), "$1");
      }
      return src;
    },

    source: _ember["default"].computed('name', function () {
      return this._unindent((_gameSnippets["default"][this.get('name')] || "").replace(/^(\s*\n)*/, '').replace(/\s*$/, ''));
    }),

    didInsertElement: function didInsertElement() {
      Highlight.highlightBlock(this.get('element'));
    },

    language: _ember["default"].computed('name', function () {
      var m = /\.(\w+)$/i.exec(this.get('name'));
      if (m) {
        switch (m[1].toLowerCase()) {
          case 'js':
            return 'javascript';
          case 'coffee':
            return 'coffeescript';
          case 'hbs':
            return 'htmlbars';
          case 'css':
            return 'css';
          case 'scss':
            return 'scss';
          case 'less':
            return 'less';
          case 'emblem':
            return 'emblem';
          case 'ts':
            return 'typescript';
        }
      }
    })
  });
});
define('game/components/ember-notify', ['exports', 'ember-notify/components/ember-notify'], function (exports, _emberNotifyComponentsEmberNotify) {
  exports['default'] = _emberNotifyComponentsEmberNotify['default'];
});
define('game/components/ember-notify/message', ['exports', 'ember-notify/components/ember-notify/message'], function (exports, _emberNotifyComponentsEmberNotifyMessage) {
  exports['default'] = _emberNotifyComponentsEmberNotifyMessage['default'];
});
define('game/components/ember-tether', ['exports', 'ember-tether/components/ember-tether'], function (exports, _emberTetherComponentsEmberTether) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTetherComponentsEmberTether['default'];
    }
  });
});
define('game/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('game/components/info-form', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    session: service('session'),
    actions: {
      submit: function submit() {
        var info = this.get('info');
        this.attrs.triggerSave(info);
      }
    }
  });
});
define('game/components/markdown-section', ['exports', 'ember-marked/components/markdown-section'], function (exports, _emberMarkedComponentsMarkdownSection) {
  exports['default'] = _emberMarkedComponentsMarkdownSection['default'];
});
define("game/components/pop-over", ["exports", "ember-pop-over/components/pop-over/component"], function (exports, _emberPopOverComponentsPopOverComponent) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _emberPopOverComponentsPopOverComponent["default"];
    }
  });
});
define('game/components/program-details', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var Component = _ember['default'].Component;
  exports['default'] = Component.extend({
    //store: Ember.inject.service(),
    session: service('session'),
    currentUser: service('current-user'),
    notify: _ember['default'].inject.service('notify'),
    store: _ember['default'].inject.service(),
    isComplete: false,
    level: '',
    errorNums: '0',
    returnValue: 'em',
    currentUrl: 's',
    errors: [],
    founded: [],
    plusCount: 0,
    minusCount: 0,
    startTime: '0',
    clicked: 'false',
    actions: {
      setCurrentUrl: function setCurrentUrl() {
        this.set('currentUrl', window.location.href.split("/").pop());
      },
      setCurrentLevel: function setCurrentLevel(l) {
        this.set('level', l);
      },
      nextLevel: function nextLevel() {
        this.set('level', parseInt(this.get('level')) + 1);
      },
      findErrors: function findErrors() {
        this.set('errors', this.get('level').split(" "));
      },
      clickCode: function clickCode(errorindexes) {
        //console.log('$$$$$$$$$$$$$$$$$$');
        //var e = this.session.data.email;
        // console.log(e);
        // var store = this.get('store');
        // var email = store.findAll('program');
        // //store.query('user', { email: '7@test.com' });
        // console.log(JSON.stringify(email));
        //console.log( this.store.query('user', { email: e }));
        if (this.get('clicked') === 'true') {
          this.set('clicked', 'false');
        } else {
          this.set('clicked', 'true');
        }

        var result = errorindexes.split(' ');
        for (var i = result.length - 1; i--;) {
          if (result[i] === "") {
            result.splice(i, 1);
          }
        }
        this.set('errors', result);
        this.set('founded', []);
        var current = this;
        var temp = _ember['default'].$("pre:first").text();
        // var temp2 = temp.replace(/<\/?span( class=\"(\w+)\")>/g, '');
        // console.log(temp);
        var words = temp.split(" ");
        var text = words.join("</span> <span>");
        // console.log(temp);
        _ember['default'].$("p:first").html("<span>" + text + "</span>");
        var s;
        //console.log('^^^^^^^^^^^^');
        //console.log(this.get('errors'));
        _ember['default'].$("span").click(function () {
          var timer = _ember['default'].$("#timer div h4").html();
          var a = timer.split(':'); // split it at the colons
          // minutes are worth 60 seconds. Hours are worth 60 minutes.
          var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
          var duration = seconds - current.get('startTime');
          current.set('startTime', seconds);

          s = _ember['default'].$(this).text();
          var store = current.get('store');
          var tap = store.createRecord('tap');
          var email = current.get('session.data.email');
          var level = window.location.href.split("/").pop();
          //console.log(level);
          tap.set('email', email);
          tap.set('word', s);
          tap.set('time', duration);
          tap.set('level', level);

          if (parseInt(level) > 6 && parseInt(level) < 13) {
            _ember['default'].$('#fourth-score').attr("class", "star-icon");
          }

          if (parseInt(level) > 12) {
            if (current.get('plusCount') < 4) {
              _ember['default'].$('#fourth-score').attr("class", "star-icon");
            }
            _ember['default'].$('#fifth-score').attr("class", "star-icon");
          }

          _ember['default'].$(this).css("background-color", "yellow");
          var message = s;
          var k = 0;
          var f = 0;
          var len = current.errors.length;
          var flen = current.founded.length;
          var flag = -1;
          var redundant = false;
          for (; k < len; k++) {
            if (current.errors[k] === s) {
              for (; f < flen; f++) {
                if (current.founded[f] === s) {
                  redundant = true;
                }
              }
              if (redundant === false) {
                flag = 1;
                current.founded.push(s);
                //console.log(current.founded);
              } else {
                  flag = 0;
                }
              redundant = false;
            }
          }
          var finalMessage;
          if (flag === 1) {
            finalMessage = "You found one error: \"" + message + "\"";
            // Ember.$('#third-score').attr("class","star-icon full");
            // document.getElementById("third-score").classList.add("full");
            current.get('notify').success(finalMessage, { closeAfter: 1500 });
            tap.set('success', 'yes');
            if (current.get('session.data.consent') === "1") {
              tap.save();
            }
            _ember['default'].$(this).css("background-color", "#00CC66");
            //current.get('names').pushObject("YEY");
            var newCount = current.get('plusCount') + 1;
            current.set('plusCount', newCount);
          } else if (flag === 0) {
            finalMessage = "You have already clicled on \"" + message + "\"";
            // Ember.$('#third-score').attr("class","star-icon full");
            // document.getElementById("third-score").classList.add("full");
            current.get('notify').warning(finalMessage, { closeAfter: 1500 });
            tap.set('success', 'redundant');
            if (current.get('session.data.consent') === "1") {
              tap.save();
            }
            _ember['default'].$(this).css("background-color", "#00CC66");
            //current.get('names').pushObject("YEY");
            //  var newCount = current.get('plusCount') + 1;
            //    current.set('plusCount',newCount);
          } else {
              finalMessage = "No error: \"" + message + "\"";
              current.get('notify').alert(finalMessage, { closeAfter: 1500 });
              tap.set('success', 'no');
              if (current.get('session.data.consent') === "1") {
                tap.save();
              }
              _ember['default'].$(this).css("background-color", "#ff4d4d");
              var newMinusCount = current.get('minusCount') + 1;
              current.set('minusCount', newMinusCount);
            }
          if (current.get('plusCount') === 1) {
            _ember['default'].$('#first-score').attr("class", "star-icon full");
          }
          if (current.get('plusCount') === 2) {
            _ember['default'].$('#second-score').attr("class", "star-icon full");
          }
          if (current.get('plusCount') === 3) {
            _ember['default'].$('#third-score').attr("class", "star-icon full");
          }
          if (current.get('plusCount') === 4) {
            _ember['default'].$('#fourth-score').attr("class", "star-icon full");
          }
          if (current.get('plusCount') === 5) {
            _ember['default'].$('#fifth-score').attr("class", "star-icon full");
          }

          if (current.get('plusCount') === len - 1) {
            if (current.get('minusCount') < len - 1) {
              current.get('notify').warning("You Win! Click on the Next Level.", { closeAfter: 10000 });
              current.set('founded', []);
              var arr = window.location.href.split("/");
              arr.splice(-1, 1);
              // var newUrl = arr.join("/") + "/completed/" + nextLevel;
              // console.log(newUrl);
              // var url = (add (window.location.href.split("/").pop()) '1')
              _ember['default'].$('#next').attr("class", "next-level");
              // window.location.replace(newUrl);
            } else {
                current.get('notify').alert("You lost! You can retry this level. Click on Retry.", { closeAfter: 5000 });
                current.set('founded', []);
                current.set('plusCount', 0);
                current.set('minusCount', 0);
                _ember['default'].$('#retry-button').attr("class", "btn btn-primary btn-lg next-level");
              }
          }
          if (current.get('minusCount') >= len - 1) {
            //console.log('**************');
            //(current.get('minusCount'));
            //console.log(len);
            current.get('notify').alert("You lost! You can retry this level. Click on Retry.", { closeAfter: 5000 });
            current.set('founded', []);
            current.set('plusCount', 0);
            current.set('minusCount', 0);
            // var url = window.location.href;
            // arr.splice(-1,1);
            // var newUrl = arr.join("/") + "/completed/" + nextLevel;
            // console.log(newUrl);
            // var url = (add (window.location.href.split("/").pop()) '1')
            _ember['default'].$('#retry-button').attr("class", "btn btn-primary btn-lg next-level");
            // window.location.replace(url);
          }
        });
        this.set('returnValue', s);
      }
    }

  });
});
define('game/components/signup-form', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    session: service('session'),
    actions: {
      submit: function submit() {
        var user = this.get('user');
        this.attrs.triggerSave(user);
      }
    }
  });
});
define('game/components/survey-form', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    session: service('session'),
    actions: {
      submit: function submit() {
        var survey = this.get('survey');
        this.attrs.triggerSave(survey);
      }
    }
  });
});
define('game/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiComponentsToriiIframePlaceholder) {
  exports['default'] = _toriiComponentsToriiIframePlaceholder['default'];
});
define('game/components/x-timer', ['exports', 'ember', 'ember-cli-timer/components/x-timer'], function (exports, _ember, _emberCliTimerComponentsXTimer) {
  exports['default'] = _emberCliTimerComponentsXTimer['default'];
});
define('game/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      invalidateSession: function invalidateSession() {
        window.location.replace(window.location.href);
        this.get('session').invalidate();
      }
    }
  });
});
define('game/controllers/completed', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Controller.extend({
    session: service('session'),
    currentUser: service('current-user'),
    currentUrl: '1',
    clicked: 'false',
    actions: {
      next: function next(current) {
        console.log('$$$$$$$$$$$');
        console.log(current);
        var level = current + 1;
        console.log('$$$$2$$$$$$$');
        console.log(level);
        this.set('session.data.level', level);
        var arr = window.location.href.split("/");
        arr.splice(-1, 1);
        arr.splice(-1, 1);
        var newUrl = arr.join("/") + "/programs/" + String(level);
        window.location.replace(newUrl);
      },
      getCurrentUrl: function getCurrentUrl(user) {
        // console.log(window.location.href);
        var arr = window.location.href.split("/");
        var level = parseInt(arr.pop());
        arr.splice(-1, 1);
        var newUrl = arr.join("/") + "/programs/" + level;
        // console.log(level);
        this.set('currentUrl', level.toString());
        // console.log(this.get('currentUrl'));
        this.set('clicked', 'true');

        // console.log('*********************');
        // console.log(JSON.stringify(user));
        var currentLevel = user.get('levelcompleted');
        var thisLevel = this.get('currentUrl');
        //  console.log('****currentLevel in user****23234234*****thisLevel by user********');
        //  console.log(currentLevel);
        //  console.log(thisLevel);
        if (parseInt(currentLevel) < parseInt(thisLevel)) {
          user.set('levelcompleted', thisLevel.toString());
          this.set('session.data.level', thisLevel.toString());
          user.save();
          // console.log('testing');
          // console.log(user.get('levelcompleted'));
        }
        // console.log("^%^%^%^%^%^%^thisLevel.toString()%^%^%^%^");
        // console.log(this.get('session.data.level'));
        //console.log(JSON.stringify(user));
        window.location.replace(newUrl);
      },
      survey: function survey(user) {
        // console.log(window.location.href);
        var arr = window.location.href.split("/");
        var level = parseInt(arr.pop());
        arr.splice(-1, 1);
        var newUrl = arr.join("/") + "/survey";
        // console.log(level);
        this.set('currentUrl', level.toString());
        // console.log(this.get('currentUrl'));
        this.set('clicked', 'true');

        // console.log('*********************');
        // console.log(JSON.stringify(user));
        var currentLevel = user.get('levelcompleted');
        var thisLevel = this.get('currentUrl') - 1;
        console.log('******PPLLL***************');
        console.log(currentLevel);
        console.log(thisLevel);
        if (parseInt(currentLevel) < parseInt(this.get('currentUrl'))) {
          user.set('levelcompleted', thisLevel.toString());
          this.set('session.data.level', this.get('currentUrl'));
          user.save();
        }
        // console.log("^%^%^%^%^%SSSSSS^%^%^%^%^%^");
        // console.log(this.get('session.data.level'));
        //console.log(JSON.stringify(user));
        window.location.replace(newUrl);
      },
      unclicked: function unclicked() {
        this.set('clicked', 'false');
      }
    }
  });
});
define('game/controllers/consent', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Controller.extend({
    session: service('session'),
    currentUser: service('current-user'),
    actions: {
      submit: function submit(user) {
        // console.log('*********************');
        // console.log(JSON.stringify(user));
        var consent = _ember['default'].$('input[name="consent"]:checked').val();
        //console.log('*********************');
        //console.log(consent);
        // console.log(thisLevel);
        user.set('consent', consent);
        this.set('session.data.consent', consent);
        user.save();
      }
    }
  });
});
define('game/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      // signout() {
      //   this.get('session').invalidate();
      // }
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      },
      setLevel: function setLevel() {
        this.set('session.data.level', 1);
        console.log('index');
        console.log(this.get('session.data.level'));
      }
    }
  });
});
define('game/controllers/info', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var Controller = _ember['default'].Controller;
  exports['default'] = Controller.extend({
    session: service('session'),
    currentUser: service('current-user'),
    actions: {
      save: function save(info) {
        var userId = this.get('session.data.email');
        var gender = _ember['default'].$('input[name=gender]:checked', '#contact').val();
        // console.log('###############');
        // console.log(userId);
        // console.log(gender);
        var experience = _ember['default'].$('input[name=experience]:checked', '#contact').val();
        var enjoy = _ember['default'].$('input[name=enjoy]:checked', '#contact').val();

        var checkboxes = _ember['default'].$('input[name=language]', '#contact');
        var language = "";
        for (var i = 0, n = checkboxes.length; i < n; i++) {
          if (checkboxes[i].checked) {
            language += "," + checkboxes[i].value;
          }
        }

        //console.log('###############');
        //console.log(language);
        // let language = Ember.$('input[name=language]:checked', '#contact').val();
        var age = _ember['default'].$('input[name=age]', '#contact').val();
        var newInfo = info;
        newInfo.set('email', userId);
        newInfo.set('gender', gender);
        newInfo.set('age', age);
        newInfo.set('experience', experience);
        newInfo.set('enjoy', enjoy);
        newInfo.set('language', language);
        // newSurvey.set('s2', s2);
        // newSurvey.set('s3', s3);
        // newSurvey.set('s4', s4);
        if (this.get('session.data.consent') === "1") {
          newInfo.save();
        }
        var arr = window.location.href.split("/");
        arr.splice(-1, 1);
        var newUrl = arr.join("/") + "/new";
        //console.log(newUrl);
        window.location.replace(newUrl);
        // .catch((error) => {
        //   // var arr = window.location.href.split("/");
        //   // var newUrl = arr.join("/") + "/info";
        //   // window.location.replace(newUrl);
        //   this.set('errorMessage', error);
        //   console.log(this.get('errorMessage'));
        // });
      }
    }
  });
});
define('game/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    notify: _ember['default'].inject.service('notify'),
    actions: {
      authenticate: function authenticate() {
        var _this = this;

        this.get('session').authenticate('authenticator:devise', this.get('email'), this.get('password'))['catch'](function (reason) {
          _this.set('errorMessage', reason.error || reason);
          _this.get('notify').alert(JSON.stringify(_this.get('errorMessage')['errors']));
          //    console.log('######################');
          console.log(_this.get('errorMessage'));
        });
        // console.log('****************');
        // console.log(this.get('email'));
        // console.log('$$$$$$$$$$$$$');
        this.set('session.data.uid', this.get('email'));
        this.set('session.data.email', this.get('email'));
        this.set('session.data.authenticated.email', this.get('email'));
        this.set('session.data.level', 1);

        var current = this;
        var useremail = this.get('email');
        // console.log("LOGGGGIIIIIN");
        var m = this.get('model');
        m.map(function (model) {
          var email = model.get('email');
          if (email === useremail) {
            var completed = parseInt(model.get('levelcompleted')) + 1;
            var consent = model.get('consent');
            //console.log("YEEEEEY");
            //console.log(consent);
            current.set('session.data.level', completed);
            current.set('session.data.consent', consent);
          }
        });
        // this.set('session.data.level',users[0]);
        // console.log(this.get('session.data.level'));
      }
    }
  });
});
define('game/controllers/new', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var Controller = _ember['default'].Controller;
  exports['default'] = Controller.extend({
    session: service('session'),
    currentUser: service('current-user')

  });
});
define('game/controllers/profile', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var Controller = _ember['default'].Controller;
  exports['default'] = Controller.extend({
    session: service('session'),
    currentUser: service('current-user')

  });
});
define('game/controllers/programs', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var Controller = _ember['default'].Controller;
  exports['default'] = Controller.extend({
    session: service('session'),
    currentUser: service('current-user'),
    currentUrl: 'y',
    clicked: 'false',
    actions: {
      getCurrentUrl: function getCurrentUrl() {
        //console.log('HEEEEREEEEEe');
        this.set('currentUrl', window.location.href.split("/").pop());
        //console.log(this.get('currentUrl'));
        // this.set('clicked','true');
        if (this.get('clicked') === 'true') {
          this.set('clicked', 'false');
        } else {
          _ember['default'].$('#new-logo').hide();
          this.set('clicked', 'true');
        }
      },
      clicked: function clicked() {
        if (this.get('clicked') === 'true') {
          this.set('session.data.currentlevel', this.get('currentUrl'));
          //console.log("##@#@#@#@#@##@#");
          //console.log(this.get('session.data.currentlevel'));
          _ember['default'].$('#new-logo').hide();
          this.set('clicked', 'false');
        } else {
          this.set('clicked', 'true');
        }
      }

    }
  });
});
define('game/controllers/signup', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    notify: _ember['default'].inject.service('notify'),
    actions: {
      save: function save(user) {
        var _this = this;

        //let user = user;
        var email = _ember['default'].$('#signUpEmailInput').val();
        var password = _ember['default'].$('#signUpPasswordInput').val();
        var passwordConfirmation = _ember['default'].$('#signUpConfirmInput').val();
        var levelcompleted = '1';
        var consentVal = "2";
        if (_ember['default'].$('#consent-checkbox').is(":checked")) {
          consentVal = "1";
        } else {
          consentVal = "0";
        }
        //console.log('^^^^^^^^^^^^^^^^^^^^^');
        //console.log(consentVal);
        var newInfo = user;
        var lowerEmail = email.toLowerCase();
        newInfo.set('email', lowerEmail);
        newInfo.set('password', password);
        newInfo.set('passwordConfirmation', passwordConfirmation);
        newInfo.set('levelcompleted', levelcompleted);
        newInfo.set('consent', consentVal);
        newInfo.save()['catch'](function () {

          _this.get('session').authenticate('authenticator:devise', user.get('email'), user.get('password'))['catch'](function (reason) {
            _this.set('errorMessage', reason.error || reason);
            // console.log('######################');
            console.log(_this.get('errorMessage'));
            _this.get('notify').alert(JSON.stringify(_this.get('errorMessage')['errors']));
          });

          _this.set('session.data.uid', newInfo.get('email'));
          _this.set('session.data.email', newInfo.get('email'));
          _this.set('session.data.authenticated.email', newInfo.get('email'));
          _this.set('session.data.level', newInfo.get('levelcompleted'));
          _this.set('session.data.consent', newInfo.get('consent'));
          // console.log('^^^^^^^^^^^^^^^');
          // console.log(this.get('session.data.level'));
          // var arr = window.location.href.split("/");
          // arr.splice(-1,1);
          // console.log(arr);
          // var newUrl = arr.join("/") + "/info";
          // window.location.replace(newUrl);
          // console.log('!!!!!!!!!!!!!!!!!!');
          // this.set('errorMessage', error);
          // console.log(this.get('errorMessage'));
        });
        // console.log('+_+_+_+_+_+_+_+_');
        // console.log(user.get('email'));
        // console.log(user.get('password'));

        // .then(()=>{
        //   this.get('session')
        //   .authenticate('authenticator:devise',
        //     user.get('email'), user.get('password'))
        //   .catch((reason) => {
        //     this.set('errorMessage', reason.error ||reason);
        //   });
        // });
      }
    }
  });
});
define('game/controllers/survey', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var Controller = _ember['default'].Controller;
  exports['default'] = Controller.extend({
    session: service('session'),
    currentUser: service('current-user'),
    beginnerClicked: 'false',
    intermediateClicked: 'false',
    advancedClicked: 'false',
    beginnerTest: '',
    actions: {
      clickedBeginner: function clickedBeginner() {
        if (this.get('beginnerClicked') === 'false') {
          this.set('beginnerClicked', 'true');
        } else {
          this.set('beginnerClicked', 'false');
        }
      },
      clickedIntermediate: function clickedIntermediate() {
        this.set('beginnerClicked', 'true');
      },
      clickedAdvanced: function clickedAdvanced() {
        this.set('beginnerClicked', 'true');
      },
      save: function save(survey) {
        var userId = this.get('session.data.email');
        var s1 = _ember['default'].$('input[name=s1]:checked', '#contact').val();
        var s2 = _ember['default'].$('input[name=s2]:checked', '#contact').val();
        var s3 = _ember['default'].$('input[name=s3]:checked', '#contact').val();
        var s4 = _ember['default'].$('input[name=s4]:checked', '#contact').val();
        var newSurvey = survey;
        newSurvey.set('email', userId);
        newSurvey.set('s1', s1);
        newSurvey.set('s2', s2);
        newSurvey.set('s3', s3);
        newSurvey.set('s4', s4);
        if (this.get('session.data.consent') === "1") {
          newSurvey.save();
        }
        var arr = window.location.href.split("/");
        arr.splice(-1, 1);
        var newUrl = arr.join("/") + "/new";
        //console.log(newUrl);
        // this.set('session.data.level', parseInt(this.get('session.data.level'))+1);
        // console.log('^^^^^^^LEVEL^^^^^^');
        // console.log(this.get('session.data.level'));
        window.location.replace(newUrl);
        // .catch((error) => {
        //   // var arr = window.location.href.split("/");
        //   // var newUrl = arr.join("/") + "/info";
        //   // window.location.replace(newUrl);
        //   this.set('errorMessage', error);
        //   console.log(this.get('errorMessage'));
        // });
      }
    }
  });
});
define("game/flows", ["exports"], function (exports) {
  exports.around = around;
  exports.dropdown = dropdown;
  exports.flip = flip;
  exports.popup = popup;
  exports.center = center;

  function around() {
    return this.orientAbove.andSnapTo(this.center, this.leftEdge, this.rightEdge).then(this.orientRight.andSlideBetween(this.bottomEdge, this.topEdge)).then(this.orientBelow.andSnapTo(this.center, this.rightEdge, this.leftEdge)).then(this.orientLeft.andSlideBetween(this.topEdge, this.bottomEdge)).then(this.orientAbove.andSnapTo(this.center));
  }

  function dropdown() {
    return this.orientBelow.andSnapTo(this.center, this.rightEdge, this.leftEdge).then(this.orientLeft.andSnapTo(this.topEdge, this.bottomEdge)).then(this.orientRight.andSnapTo(this.topEdge)).then(this.orientBelow.andSnapTo(this.center));
  }

  function flip() {
    return this.orientAbove.andSnapTo(this.center, this.leftEdge, this.rightEdge).where(function (boundingRect, _, targetRect) {
      var centerY = targetRect.height / 2 + targetRect.y,
          halfway = boundingRect.height / 2;
      return centerY > halfway;
    }).then(this.orientBelow.andSnapTo(this.center, this.rightEdge, this.leftEdge).where(function (boundingRect, _, targetRect) {
      var centerY = targetRect.height / 2 + targetRect.y,
          halfway = boundingRect.height / 2;
      return centerY < halfway;
    })).then(this.orientAbove.andSnapTo(this.center));
  }

  function popup() {
    return this.orientAbove.andSnapTo(this.center, this.rightEdge, this.leftEdge, this.center);
  }

  function center() {
    return this.orientCenter.andSnapTo(this.center, this.leftEdge, this.rightEdge, this.center);
  }
});
define('game/helpers/add', ['exports', 'ember'], function (exports, _ember) {

  var add = function add(params) {
    return parseInt(params[0]) + parseInt(params[1]);
  };
  exports['default'] = _ember['default'].Helper.helper(add);
});
define('game/helpers/bs-contains', ['exports', 'ember-bootstrap/helpers/bs-contains'], function (exports, _emberBootstrapHelpersBsContains) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsContains['default'];
    }
  });
  Object.defineProperty(exports, 'bsContains', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsContains.bsContains;
    }
  });
});
define('game/helpers/bs-eq', ['exports', 'ember-bootstrap/helpers/bs-eq'], function (exports, _emberBootstrapHelpersBsEq) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsEq['default'];
    }
  });
  Object.defineProperty(exports, 'eq', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsEq.eq;
    }
  });
});
define('game/helpers/bs-not', ['exports', 'ember-bootstrap/helpers/bs-not'], function (exports, _emberBootstrapHelpersBsNot) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsNot['default'];
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsNot.not;
    }
  });
});
define('game/helpers/bs-read-path', ['exports', 'ember-bootstrap/helpers/bs-read-path'], function (exports, _emberBootstrapHelpersBsReadPath) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsReadPath['default'];
    }
  });
  Object.defineProperty(exports, 'readPath', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersBsReadPath.readPath;
    }
  });
});
define('game/helpers/concat', ['exports', 'ember'], function (exports, _ember) {

  var concat = function concat(params) {
    return params[0].concat(params[1]);
  };
  exports['default'] = _ember['default'].Helper.helper(concat);
});
define('game/helpers/eq', ['exports', 'ember'], function (exports, _ember) {

  var eq = function eq(params) {
    return params[0] === params[1];
  };
  exports['default'] = _ember['default'].Helper.helper(eq);
});
define('game/helpers/gt', ['exports', 'ember'], function (exports, _ember) {

  var gt = function gt(params) {
    return parseInt(params[0]) >= parseInt(params[1]);
  };
  exports['default'] = _ember['default'].Helper.helper(gt);
});
define('game/helpers/neq', ['exports', 'ember'], function (exports, _ember) {

  var neq = function neq(params) {
    return params[0].length !== 0;
  };
  exports['default'] = _ember['default'].Helper.helper(neq);
});
define('game/helpers/nnull', ['exports', 'ember'], function (exports, _ember) {

  var nnull = function nnull(params) {
    return params[0] == null;
  };
  exports['default'] = _ember['default'].Helper.helper(nnull);
});
define('game/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('game/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("game/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('game/initializers/allow-link-action', ['exports', 'ember-link-action/initializers/allow-link-action'], function (exports, _emberLinkActionInitializersAllowLinkAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionInitializersAllowLinkAction['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionInitializersAllowLinkAction.initialize;
    }
  });
});
define('game/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'game/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _gameConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_gameConfigEnvironment['default'].APP.name, _gameConfigEnvironment['default'].APP.version)
  };
});
define('game/initializers/bootstrap-linkto', ['exports', 'ember-bootstrap/initializers/bootstrap-linkto'], function (exports, _emberBootstrapInitializersBootstrapLinkto) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapInitializersBootstrapLinkto['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapInitializersBootstrapLinkto.initialize;
    }
  });
});
define('game/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('game/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('game/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('game/initializers/ember-simple-auth', ['exports', 'ember', 'game/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _gameConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _gameConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _gameConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('game/initializers/export-application-global', ['exports', 'ember', 'game/config/environment'], function (exports, _ember, _gameConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_gameConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _gameConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_gameConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('game/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});
define('game/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _toriiBootstrapSession, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _toriiBootstrapSession['default'])(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
define('game/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'game/config/environment'], function (exports, _toriiBootstrapTorii, _toriiConfiguration, _gameConfigEnvironment) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiConfiguration.configure)(_gameConfigEnvironment['default'].torii || {});
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports['default'] = initializer;
});
define('game/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('game/initializers/load-bootstrap-config', ['exports', 'game/config/environment', 'ember-bootstrap/config'], function (exports, _gameConfigEnvironment, _emberBootstrapConfig) {
  exports.initialize = initialize;

  function initialize() /* container, application */{
    _emberBootstrapConfig['default'].load(_gameConfigEnvironment['default']['ember-bootstrap'] || {});
  }

  exports['default'] = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});
define('game/initializers/modals-container', ['exports', 'ember-bootstrap/initializers/modals-container'], function (exports, _emberBootstrapInitializersModalsContainer) {
  exports['default'] = _emberBootstrapInitializersModalsContainer['default'];
});
define("game/initializers/pop-over", ["exports", "ember-pop-over/system/flow", "game/config/environment", "game/flows", "ember-metal/get", "ember-array/utils"], function (exports, _emberPopOverSystemFlow, _gameConfigEnvironment, _gameFlows, _emberMetalGet, _emberArrayUtils) {
  var initialize = function initialize(app) {
    (0, _emberArrayUtils.A)(Object.keys(_gameFlows)).forEach(function (flowName) {
      if (flowName == 'default') {
        return;
      }
      var constraints = (0, _emberMetalGet["default"])(_gameFlows[flowName].call(_emberPopOverSystemFlow["default"].create()), 'constraints');
      app.register("pop-over-constraint:" + flowName, constraints, { instantiate: false });
    });
  };

  exports.initialize = initialize;
  exports["default"] = {
    name: "register-pop-over-flows",
    initialize: initialize
  };
});
define('game/initializers/simple-auth-config', ['exports', 'game/config/environment'], function (exports, _gameConfigEnvironment) {

  // app/initializers/simple-auth-config.js
  exports['default'] = {
    name: 'simple-auth-config',
    before: 'ember-simple-auth',
    initialize: function initialize() {
      var tokenEndpoint = '/users/sign_in';
      _gameConfigEnvironment['default']['ember-simple-auth'] = {
        authorizer: 'simple-auth-authorizer:devise',
        crossOriginWhitelist: [_gameConfigEnvironment['default'].SERVER_URL]
      };

      _gameConfigEnvironment['default']['simple-auth-devise'] = {
        serverTokenEndpoint: _gameConfigEnvironment['default'].SERVER_URL + tokenEndpoint
      };

      window.ENV = _gameConfigEnvironment['default'];
    }
  };
});
define('game/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('game/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("game/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('game/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('game/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/router-dsl-ext'], function (exports, _toriiBootstrapRouting, _toriiConfiguration, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = applicationInstance.get('router');
      var setupRoutes = function setupRoutes() {
        var authenticatedRoutes = router.router.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _toriiBootstrapRouting['default'])(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
define('game/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _toriiLibContainerUtils, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _toriiLibContainerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('game/mixins/link-action', ['exports', 'ember-link-action/mixins/link-action'], function (exports, _emberLinkActionMixinsLinkAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionMixinsLinkAction['default'];
    }
  });
});
define('game/models/completed', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    password: (0, _emberDataAttr['default'])('string'),
    passwordConfirmation: (0, _emberDataAttr['default'])('string'),
    levelcompleted: (0, _emberDataAttr['default'])('string'),
    consent: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/consent', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    password: (0, _emberDataAttr['default'])('string'),
    passwordConfirmation: (0, _emberDataAttr['default'])('string'),
    levelcompleted: (0, _emberDataAttr['default'])('string'),
    consent: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/info', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    gender: (0, _emberDataAttr['default'])('string'),
    age: (0, _emberDataAttr['default'])('string'),
    experience: (0, _emberDataAttr['default'])('string'),
    enjoy: (0, _emberDataAttr['default'])('string'),
    language: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/login', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    password: (0, _emberDataAttr['default'])('string'),
    passwordConfirmation: (0, _emberDataAttr['default'])('string'),
    levelcompleted: (0, _emberDataAttr['default'])('string'),
    consent: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/new', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    code: (0, _emberDataAttr['default'])('string'),
    difficulty: (0, _emberDataAttr['default'])('string'),
    level: (0, _emberDataAttr['default'])('string'),
    errorindexes: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/program', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    code: (0, _emberDataAttr['default'])('string'),
    difficulty: (0, _emberDataAttr['default'])('string'),
    level: (0, _emberDataAttr['default'])('string'),
    errorindexes: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/signup', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    password: (0, _emberDataAttr['default'])('string'),
    passwordConfirmation: (0, _emberDataAttr['default'])('string'),
    levelcompleted: (0, _emberDataAttr['default'])('string'),
    consent: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/survey', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    s1: (0, _emberDataAttr['default'])('string'),
    s2: (0, _emberDataAttr['default'])('string'),
    s3: (0, _emberDataAttr['default'])('string'),
    s4: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/tap', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    word: (0, _emberDataAttr['default'])('string'),
    success: (0, _emberDataAttr['default'])('string'),
    time: (0, _emberDataAttr['default'])('string'),
    level: (0, _emberDataAttr['default'])('string')
  });
});
define('game/models/user', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string'),
    password: (0, _emberDataAttr['default'])('string'),
    passwordConfirmation: (0, _emberDataAttr['default'])('string'),
    levelcompleted: (0, _emberDataAttr['default'])('string'),
    consent: (0, _emberDataAttr['default'])('string')
  });
});
define('game/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('game/router', ['exports', 'ember', 'game/config/environment'], function (exports, _ember, _gameConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _gameConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('programs', { path: '/programs/:program_id' });
    this.route('completed', { path: '/completed/:level' });
    this.route('user', { path: '/users/:user_id' });
    this.route('about');
    this.route('contact');
    this.route('new');
    this.route('login');
    this.route('signup');
    this.route('practice');
    this.route('beginner', { path: '/beginner/:beginner_id' });
    this.route('intermediate', { path: '/intermediate/:intermediate_id' });
    this.route('advanced', { path: '/advanced/:advanced_id' });
    this.route('survey');
    this.route('info');
    this.route('profile');
    this.route('consent');
    this.route('privacy');
    this.route('instruction');
    this.route('index', { path: '/' });
  });

  exports['default'] = Router;
});
define('game/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
    currentUser: service(),

    beforeModel: function beforeModel() {
      return this._loadCurrentUser();
    },

    sessionAuthenticated: function sessionAuthenticated() {
      var _this = this;

      this._super.apply(this, arguments);
      this._loadCurrentUser()['catch'](function () {
        return _this.get('session').invalidate();
      });
    },

    _loadCurrentUser: function _loadCurrentUser() {
      return this.get('currentUser').load();
    }
  });
});
// app/routes/application.js
define('game/routes/completed', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //AuthenticatedRouteMixin, {
    model: function model() {
      return this.store.query('user', { role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
    }
  });
});
define('game/routes/consent', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //AuthenticatedRouteMixin, {
    model: function model() {
      return this.store.query('user', { role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
    }
  });
});
define('game/routes/index', ['exports', 'ember'], function (exports, _ember) {
  //import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

  exports['default'] = _ember['default'].Route.extend();
  //ApplicationRouteMixin);
});
define('game/routes/info', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //AuthenticatedRouteMixin,{
    model: function model() {
      return this.store.createRecord('info');
    }
  });
});
define('game/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    model: function model() {
      return this.store.query('user', { role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
    }

  });
});
define('game/routes/new', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //AuthenticatedRouteMixin, {
    model: function model() {
      return this.store.query('program', { level: '1', role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
    }
  });
});
define('game/routes/profile', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //AuthenticatedRouteMixin, {
    model: function model() {
      return this.store.query('user', { role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
    }
  });
});
define('game/routes/programs', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //AuthenticatedRouteMixin, {
    model: function model() {
      return this.store.query('program', { role: 'tjjNCQMsXGXLLEKHGE6FBZthLJdvHbmqkvZQfHybMUdSZTmG6cXNJtPKmkQJ9duud4C5AmjzVCXPS39HPvDRaUtRWL6DwTetMmyn' });
    }
  });
});
define('game/routes/protected', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
  exports['default'] = _ember['default'].Route.extend();
  //AuthenticatedRouteMixin);
});
define('game/routes/signup', ['exports', 'ember'], function (exports, _ember) {
  //import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //UnauthenticatedRouteMixin, {
    model: function model() {
      return this.store.createRecord('user');
    }
  });
});
define('game/routes/survey', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({ //AuthenticatedRouteMixin,{
    model: function model() {
      return this.store.createRecord('survey');
    }
  });
});
define('game/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('game/serializers/application', ['exports', 'ember-data/serializers/json-api'], function (exports, _emberDataSerializersJsonApi) {
  exports['default'] = _emberDataSerializersJsonApi['default'].extend({});
});
define('game/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('game/services/current-user', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var isEmpty = _ember['default'].isEmpty;
  var RSVP = _ember['default'].RSVP;
  exports['default'] = _ember['default'].Service.extend({
    session: service('session'),
    store: service(),

    load: function load() {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var userId = _this.get('session.data.authenticated.email');
        if (!isEmpty(userId)) {
          _this.get('store').find('user', userId).then(function (user) {
            _this.set('user', user);
            resolve();
          }, reject);
        } else {
          resolve();
        }
      });
    }
  });
});
// app/services/current-user.js
define('game/services/device/platform', ['exports', 'ember-cordova/services/device/platform'], function (exports, _emberCordovaServicesDevicePlatform) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCordovaServicesDevicePlatform['default'];
    }
  });
});
define('game/services/notify', ['exports', 'ember-notify'], function (exports, _emberNotify) {
  exports['default'] = _emberNotify['default'];
});
define('game/services/popup', ['exports', 'torii/services/popup'], function (exports, _toriiServicesPopup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesPopup['default'];
    }
  });
});
define('game/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('game/services/torii-session', ['exports', 'torii/services/session'], function (exports, _toriiServicesSession) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesSession['default'];
    }
  });
});
define('game/services/torii', ['exports', 'torii/services/torii'], function (exports, _toriiServicesTorii) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesTorii['default'];
    }
  });
});
define('game/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("game/snippets", ["exports"], function (exports) {
  exports["default"] = {};
});
define("game/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "game/templates/about.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Back\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 7,
              "column": 2
            }
          },
          "moduleName": "game/templates/about.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "game/templates/about.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        dom.setAttribute(el1, "id", "about");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "id", "consent-title");
        var el3 = dom.createTextNode("About CodeReadingDojo");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n\nI am ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("Zahra Ghaed");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(", a master's student at the department of ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "keyword");
        var el4 = dom.createTextNode("Computer Science at Virginia Tech");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(". I am working under the supervision of ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("Professor Stephen Edwards");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and CodeReadingDojo is part of my Master's research.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "keyword");
        var el4 = dom.createTextNode("CodeReadingDojo");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" is a new educationally-oriented mobile game application aimed at promoting the development of reading codes and finding errors in a new and fun way. It is accessible through Google Play Store and Apple Store for all students who are interested in improving their code reading skills. Of the numerous programming languages, we have selected Java, because it is one of the most popular programming languages.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nSpecial thanks to ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("Elham Nikoo");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" for helping us in drawings of this application.\n");
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
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 2, 2);
        return morphs;
      },
      statements: [["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back", "tagName", "button"], 0, null, ["loc", [null, [2, 2], [4, 14]]]], ["block", "link-to", ["new"], [], 1, null, ["loc", [null, [5, 2], [7, 14]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "game/templates/application.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  Profile\n");
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
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "game/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-primary btn-lg");
          dom.setAttribute(el1, "id", "logout");
          var el2 = dom.createTextNode("logout");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["element", "action", ["invalidateSession"], [], ["loc", [null, [3, 10], [3, 40]]]], ["block", "link-to", ["profile"], ["class", "btn btn-primary btn-lg", "id", "profile", "tagName", "button"], 0, null, ["loc", [null, [4, 2], [6, 14]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
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
                "line": 10,
                "column": 2
              }
            },
            "moduleName": "game/templates/application.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  Login\n");
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
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "game/templates/application.hbs"
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
        statements: [["block", "link-to", ["login"], ["class", "btn btn-primary btn-lg", "id", "login", "tagName", "button"], 0, null, ["loc", [null, [8, 2], [10, 14]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 4
            },
            "end": {
              "line": 20,
              "column": 4
            }
          },
          "moduleName": "game/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    About\n");
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
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 4
            },
            "end": {
              "line": 24,
              "column": 4
            }
          },
          "moduleName": "game/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("       Contact\n");
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
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 4
            },
            "end": {
              "line": 28,
              "column": 4
            }
          },
          "moduleName": "game/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("       Privacy Statement\n");
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 32,
            "column": 0
          }
        },
        "moduleName": "game/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "footer");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Footer consists of buttons and seperators ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "footer-content");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode(" | ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode(" | ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode(" Copyright © 2016-2017. Virginia Tech ");
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
        var element1 = dom.childAt(fragment, [3, 3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        morphs[3] = dom.createMorphAt(element1, 5, 5);
        morphs[4] = dom.createMorphAt(element1, 9, 9);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [2, 6], [2, 29]]]]], [], 0, 1, ["loc", [null, [2, 0], [11, 7]]]], ["content", "outlet", ["loc", [null, [12, 0], [12, 10]]]], ["block", "link-to", ["about"], ["id", "about-us"], 2, null, ["loc", [null, [18, 4], [20, 16]]]], ["block", "link-to", ["contact"], ["id", "contact-us"], 3, null, ["loc", [null, [22, 4], [24, 16]]]], ["block", "link-to", ["privacy"], ["id", "privacy"], 4, null, ["loc", [null, [26, 4], [28, 16]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("game/templates/completed", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "game/templates/completed.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Logged in as ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "session.data.email", ["loc", [null, [3, 20], [3, 42]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 2
            },
            "end": {
              "line": 9,
              "column": 2
            }
          },
          "moduleName": "game/templates/completed.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child2 = (function () {
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
                      "line": 18,
                      "column": 6
                    },
                    "end": {
                      "line": 20,
                      "column": 6
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("        Back to Menu\n");
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
            var child1 = (function () {
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
                      "line": 24,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element18 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element18);
                  return morphs;
                },
                statements: [["content", "beginner-one", ["loc", [null, [22, 10], [22, 26]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [23, 43], [23, 47]]]]], [], ["loc", [null, [23, 18], [23, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child2 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 25,
                      "column": 8
                    },
                    "end": {
                      "line": 28,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element17 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element17);
                  return morphs;
                },
                statements: [["content", "beginner-two", ["loc", [null, [26, 10], [26, 26]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [27, 43], [27, 47]]]]], [], ["loc", [null, [27, 18], [27, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child3 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 29,
                      "column": 8
                    },
                    "end": {
                      "line": 32,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element16 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element16);
                  return morphs;
                },
                statements: [["content", "beginner-three", ["loc", [null, [30, 10], [30, 28]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [31, 43], [31, 47]]]]], [], ["loc", [null, [31, 18], [31, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child4 = (function () {
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
                      "line": 36,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element15 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element15);
                  return morphs;
                },
                statements: [["content", "beginner-four", ["loc", [null, [34, 10], [34, 27]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [35, 43], [35, 47]]]]], [], ["loc", [null, [35, 18], [35, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child5 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 37,
                      "column": 8
                    },
                    "end": {
                      "line": 40,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element14 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element14);
                  return morphs;
                },
                statements: [["content", "beginner-five", ["loc", [null, [38, 10], [38, 27]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [39, 43], [39, 47]]]]], [], ["loc", [null, [39, 18], [39, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child6 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 41,
                      "column": 8
                    },
                    "end": {
                      "line": 48,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment(" {{#link-to 'survey' class=\"btn btn-primary\" id=\"survey\" invokeAction='getCurrentUrl user'}}\n            Survey\n          {{/link-to}} ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-primary");
                  dom.setAttribute(el1, "id", "survey");
                  var el2 = dom.createTextNode("Survey");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "id", "skip-survey");
                  var el2 = dom.createTextNode("Skip to level 7");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element12 = dom.childAt(fragment, [5]);
                  var element13 = dom.childAt(fragment, [7]);
                  var morphs = new Array(3);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element12);
                  morphs[2] = dom.createElementMorph(element13);
                  return morphs;
                },
                statements: [["content", "beginner-six", ["loc", [null, [42, 10], [42, 26]]]], ["element", "action", ["survey", ["get", "user", ["loc", [null, [46, 36], [46, 40]]]]], [], ["loc", [null, [46, 18], [46, 42]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [47, 43], [47, 47]]]]], [], ["loc", [null, [47, 18], [47, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child7 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 49,
                      "column": 8
                    },
                    "end": {
                      "line": 52,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element11 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element11);
                  return morphs;
                },
                statements: [["content", "intermediate-seven", ["loc", [null, [50, 10], [50, 32]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [51, 43], [51, 47]]]]], [], ["loc", [null, [51, 18], [51, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child8 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 53,
                      "column": 8
                    },
                    "end": {
                      "line": 56,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element10 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element10);
                  return morphs;
                },
                statements: [["content", "intermediate-eight", ["loc", [null, [54, 10], [54, 32]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [55, 43], [55, 47]]]]], [], ["loc", [null, [55, 18], [55, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child9 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 57,
                      "column": 8
                    },
                    "end": {
                      "line": 60,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element9 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element9);
                  return morphs;
                },
                statements: [["content", "intermediate-nine", ["loc", [null, [58, 10], [58, 31]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [59, 43], [59, 47]]]]], [], ["loc", [null, [59, 18], [59, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child10 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 61,
                      "column": 8
                    },
                    "end": {
                      "line": 64,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element8 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element8);
                  return morphs;
                },
                statements: [["content", "intermediate-ten", ["loc", [null, [62, 10], [62, 30]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [63, 43], [63, 47]]]]], [], ["loc", [null, [63, 18], [63, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child11 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 65,
                      "column": 8
                    },
                    "end": {
                      "line": 68,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element7 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element7);
                  return morphs;
                },
                statements: [["content", "intermediate-eleven", ["loc", [null, [66, 10], [66, 33]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [67, 43], [67, 47]]]]], [], ["loc", [null, [67, 18], [67, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child12 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 69,
                      "column": 8
                    },
                    "end": {
                      "line": 72,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element6 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element6);
                  return morphs;
                },
                statements: [["content", "intermediate-twelve", ["loc", [null, [70, 10], [70, 33]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [71, 43], [71, 47]]]]], [], ["loc", [null, [71, 18], [71, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child13 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 73,
                      "column": 8
                    },
                    "end": {
                      "line": 76,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element5 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element5);
                  return morphs;
                },
                statements: [["content", "advanced-thirteen", ["loc", [null, [74, 10], [74, 31]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [75, 43], [75, 47]]]]], [], ["loc", [null, [75, 18], [75, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child14 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 77,
                      "column": 8
                    },
                    "end": {
                      "line": 80,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element4 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element4);
                  return morphs;
                },
                statements: [["content", "advanced-fourteen", ["loc", [null, [78, 10], [78, 31]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [79, 43], [79, 47]]]]], [], ["loc", [null, [79, 18], [79, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child15 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 81,
                      "column": 8
                    },
                    "end": {
                      "line": 84,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element3 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element3);
                  return morphs;
                },
                statements: [["content", "advanced-fifteen", ["loc", [null, [82, 10], [82, 30]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [83, 43], [83, 47]]]]], [], ["loc", [null, [83, 18], [83, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child16 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 85,
                      "column": 8
                    },
                    "end": {
                      "line": 88,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element2 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element2);
                  return morphs;
                },
                statements: [["content", "advanced-sixteen", ["loc", [null, [86, 10], [86, 30]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [87, 43], [87, 47]]]]], [], ["loc", [null, [87, 18], [87, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child17 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 89,
                      "column": 8
                    },
                    "end": {
                      "line": 92,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "class", "btn btn-info survey-next");
                  var el2 = dom.createTextNode("Next Level");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element1 = dom.childAt(fragment, [3]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createElementMorph(element1);
                  return morphs;
                },
                statements: [["content", "advanced-seventeen", ["loc", [null, [90, 10], [90, 32]]]], ["element", "action", ["getCurrentUrl", ["get", "user", ["loc", [null, [91, 43], [91, 47]]]]], [], ["loc", [null, [91, 18], [91, 49]]]]],
                locals: [],
                templates: []
              };
            })();
            var child18 = (function () {
              var child0 = (function () {
                return {
                  meta: {
                    "fragmentReason": false,
                    "revision": "Ember@2.6.2",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 95,
                        "column": 10
                      },
                      "end": {
                        "line": 97,
                        "column": 10
                      }
                    },
                    "moduleName": "game/templates/completed.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("            Back to Menu\n");
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
                      "line": 93,
                      "column": 8
                    },
                    "end": {
                      "line": 98,
                      "column": 8
                    }
                  },
                  "moduleName": "game/templates/completed.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
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
                  var morphs = new Array(2);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
                  dom.insertBoundary(fragment, null);
                  return morphs;
                },
                statements: [["content", "advanced-eighteen", ["loc", [null, [94, 10], [94, 31]]]], ["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back", "tagName", "button"], 0, null, ["loc", [null, [95, 10], [97, 22]]]]],
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
                    "line": 14,
                    "column": 8
                  },
                  "end": {
                    "line": 103,
                    "column": 2
                  }
                },
                "moduleName": "game/templates/completed.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("p");
                var el2 = dom.createTextNode("Congradulations ");
                dom.appendChild(el1, el2);
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode(", you've completed the level!");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n  ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "form-horizontal form-group form-group-lg row");
                var el2 = dom.createTextNode("\n    ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "col-xs-10 col-xs-offset-1 col-sm-offset-4 col-sm-4 col-md-4");
                var el3 = dom.createTextNode("\n");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n    ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n  ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element19 = dom.childAt(fragment, [3, 1]);
                var morphs = new Array(20);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
                morphs[1] = dom.createMorphAt(element19, 1, 1);
                morphs[2] = dom.createMorphAt(element19, 2, 2);
                morphs[3] = dom.createMorphAt(element19, 3, 3);
                morphs[4] = dom.createMorphAt(element19, 4, 4);
                morphs[5] = dom.createMorphAt(element19, 5, 5);
                morphs[6] = dom.createMorphAt(element19, 6, 6);
                morphs[7] = dom.createMorphAt(element19, 7, 7);
                morphs[8] = dom.createMorphAt(element19, 8, 8);
                morphs[9] = dom.createMorphAt(element19, 9, 9);
                morphs[10] = dom.createMorphAt(element19, 10, 10);
                morphs[11] = dom.createMorphAt(element19, 11, 11);
                morphs[12] = dom.createMorphAt(element19, 12, 12);
                morphs[13] = dom.createMorphAt(element19, 13, 13);
                morphs[14] = dom.createMorphAt(element19, 14, 14);
                morphs[15] = dom.createMorphAt(element19, 15, 15);
                morphs[16] = dom.createMorphAt(element19, 16, 16);
                morphs[17] = dom.createMorphAt(element19, 17, 17);
                morphs[18] = dom.createMorphAt(element19, 18, 18);
                morphs[19] = dom.createMorphAt(element19, 19, 19);
                return morphs;
              },
              statements: [["content", "user.email", ["loc", [null, [15, 25], [15, 39]]]], ["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back", "tagName", "button"], 0, null, ["loc", [null, [18, 6], [20, 18]]]], ["block", "if", [["subexpr", "eq", ["1", ["get", "session.data.currentlevel", ["loc", [null, [21, 22], [21, 47]]]]], [], ["loc", [null, [21, 14], [21, 48]]]]], [], 1, null, ["loc", [null, [21, 8], [24, 15]]]], ["block", "if", [["subexpr", "eq", ["2", ["get", "session.data.currentlevel", ["loc", [null, [25, 22], [25, 47]]]]], [], ["loc", [null, [25, 14], [25, 48]]]]], [], 2, null, ["loc", [null, [25, 8], [28, 15]]]], ["block", "if", [["subexpr", "eq", ["3", ["get", "session.data.currentlevel", ["loc", [null, [29, 22], [29, 47]]]]], [], ["loc", [null, [29, 14], [29, 48]]]]], [], 3, null, ["loc", [null, [29, 8], [32, 15]]]], ["block", "if", [["subexpr", "eq", ["4", ["get", "session.data.currentlevel", ["loc", [null, [33, 22], [33, 47]]]]], [], ["loc", [null, [33, 14], [33, 48]]]]], [], 4, null, ["loc", [null, [33, 8], [36, 15]]]], ["block", "if", [["subexpr", "eq", ["5", ["get", "session.data.currentlevel", ["loc", [null, [37, 22], [37, 47]]]]], [], ["loc", [null, [37, 14], [37, 48]]]]], [], 5, null, ["loc", [null, [37, 8], [40, 15]]]], ["block", "if", [["subexpr", "eq", ["6", ["get", "session.data.currentlevel", ["loc", [null, [41, 22], [41, 47]]]]], [], ["loc", [null, [41, 14], [41, 48]]]]], [], 6, null, ["loc", [null, [41, 8], [48, 15]]]], ["block", "if", [["subexpr", "eq", ["7", ["get", "session.data.currentlevel", ["loc", [null, [49, 22], [49, 47]]]]], [], ["loc", [null, [49, 14], [49, 48]]]]], [], 7, null, ["loc", [null, [49, 8], [52, 15]]]], ["block", "if", [["subexpr", "eq", ["8", ["get", "session.data.currentlevel", ["loc", [null, [53, 22], [53, 47]]]]], [], ["loc", [null, [53, 14], [53, 48]]]]], [], 8, null, ["loc", [null, [53, 8], [56, 15]]]], ["block", "if", [["subexpr", "eq", ["9", ["get", "session.data.currentlevel", ["loc", [null, [57, 22], [57, 47]]]]], [], ["loc", [null, [57, 14], [57, 48]]]]], [], 9, null, ["loc", [null, [57, 8], [60, 15]]]], ["block", "if", [["subexpr", "eq", ["10", ["get", "session.data.currentlevel", ["loc", [null, [61, 23], [61, 48]]]]], [], ["loc", [null, [61, 14], [61, 49]]]]], [], 10, null, ["loc", [null, [61, 8], [64, 15]]]], ["block", "if", [["subexpr", "eq", ["11", ["get", "session.data.currentlevel", ["loc", [null, [65, 23], [65, 48]]]]], [], ["loc", [null, [65, 14], [65, 49]]]]], [], 11, null, ["loc", [null, [65, 8], [68, 15]]]], ["block", "if", [["subexpr", "eq", ["12", ["get", "session.data.currentlevel", ["loc", [null, [69, 23], [69, 48]]]]], [], ["loc", [null, [69, 14], [69, 49]]]]], [], 12, null, ["loc", [null, [69, 8], [72, 15]]]], ["block", "if", [["subexpr", "eq", ["13", ["get", "session.data.currentlevel", ["loc", [null, [73, 23], [73, 48]]]]], [], ["loc", [null, [73, 14], [73, 49]]]]], [], 13, null, ["loc", [null, [73, 8], [76, 15]]]], ["block", "if", [["subexpr", "eq", ["14", ["get", "session.data.currentlevel", ["loc", [null, [77, 23], [77, 48]]]]], [], ["loc", [null, [77, 14], [77, 49]]]]], [], 14, null, ["loc", [null, [77, 8], [80, 15]]]], ["block", "if", [["subexpr", "eq", ["15", ["get", "session.data.currentlevel", ["loc", [null, [81, 23], [81, 48]]]]], [], ["loc", [null, [81, 14], [81, 49]]]]], [], 15, null, ["loc", [null, [81, 8], [84, 15]]]], ["block", "if", [["subexpr", "eq", ["16", ["get", "session.data.currentlevel", ["loc", [null, [85, 23], [85, 48]]]]], [], ["loc", [null, [85, 14], [85, 49]]]]], [], 16, null, ["loc", [null, [85, 8], [88, 15]]]], ["block", "if", [["subexpr", "eq", ["17", ["get", "session.data.currentlevel", ["loc", [null, [89, 23], [89, 48]]]]], [], ["loc", [null, [89, 14], [89, 49]]]]], [], 17, null, ["loc", [null, [89, 8], [92, 15]]]], ["block", "if", [["subexpr", "eq", ["18", ["get", "session.data.currentlevel", ["loc", [null, [93, 23], [93, 48]]]]], [], ["loc", [null, [93, 14], [93, 49]]]]], [], 18, null, ["loc", [null, [93, 8], [98, 15]]]]],
              locals: [],
              templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9, child10, child11, child12, child13, child14, child15, child16, child17, child18]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 13,
                  "column": 4
                },
                "end": {
                  "line": 105,
                  "column": 4
                }
              },
              "moduleName": "game/templates/completed.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              return morphs;
            },
            statements: [["block", "if", [["subexpr", "nnull", [["get", "user.password", ["loc", [null, [14, 21], [14, 34]]]]], [], ["loc", [null, [14, 14], [14, 35]]]]], [], 0, null, ["loc", [null, [14, 8], [103, 9]]]]],
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
                "line": 11,
                "column": 2
              },
              "end": {
                "line": 106,
                "column": 0
              }
            },
            "moduleName": "game/templates/completed.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "eq", [["get", "session.data.email", ["loc", [null, [13, 14], [13, 32]]]], ["get", "user.email", ["loc", [null, [13, 33], [13, 43]]]]], [], ["loc", [null, [13, 10], [13, 44]]]]], [], 0, null, ["loc", [null, [13, 4], [105, 11]]]]],
          locals: ["user"],
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
              "line": 10,
              "column": 4
            },
            "end": {
              "line": 107,
              "column": 0
            }
          },
          "moduleName": "game/templates/completed.hbs"
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
        statements: [["block", "each", [["get", "model", ["loc", [null, [11, 10], [11, 15]]]]], [], 0, null, ["loc", [null, [11, 2], [106, 9]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 107,
              "column": 0
            },
            "end": {
              "line": 109,
              "column": 2
            }
          },
          "moduleName": "game/templates/completed.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-info survey-next");
          var el2 = dom.createTextNode("Next Level");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["next", ["get", "session.data.level", ["loc", [null, [108, 24], [108, 42]]]]], [], ["loc", [null, [108, 8], [108, 44]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 111,
            "column": 0
          }
        },
        "moduleName": "game/templates/completed.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "jumbotron text-center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element20 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(element20, 1, 1);
        morphs[2] = dom.createMorphAt(element20, 2, 2);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [2, 8], [2, 31]]]]], [], 0, null, ["loc", [null, [2, 2], [4, 9]]]], ["block", "link-to", ["new"], [], 1, null, ["loc", [null, [7, 2], [9, 14]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [10, 10], [10, 33]]]]], [], 2, 3, ["loc", [null, [10, 4], [109, 9]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("game/templates/components/advanced-eighteen", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/advanced-eighteen.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("votePercents.length");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" return the length of votePercents.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Array indexing starts with 0 in Java. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" should be ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" in this program.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The most commonly used Integer data type in Java is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("int");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("== (equal to)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Checks if the values of two operands are equal or not, if yes then condition becomes true.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/advanced-fifteen", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/advanced-fifteen.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  A ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("class");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" (not Object or object) is a blueprint from which individual objects are created.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("new");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" (not New) keyword is a Java operator that creates the object.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Any method declared ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("void");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" doesn't return a value.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" semicolon ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/advanced-fourteen", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/advanced-fourteen.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  You can concatenate two Java String fields using the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("+");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" operator.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" class represents character strings. The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String[]");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" represents an array of String.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" semicolon ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Within the body of the method, you use the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("return statement");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to return the value.\n  a return statement can be used to branch out of a control flow block and exit the method and is simply used like ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("return;");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/advanced-seventeen", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/advanced-seventeen.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  In Java, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("extends");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is for extending a class. While, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("implements");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is for implementing an interface.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  A class contains ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("constructors");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" that are invoked to create objects from the class blueprint. Constructor declarations look like method declarations—except that they use the name of the class and have no return type.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" class represents character strings. The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String[]");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" represents an array of String.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/advanced-sixteen", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/advanced-sixteen.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Within the body of the method, you use the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("return statement");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to return the value.\n  a return statement can be used to branch out of a control flow block and exit the method and is simply used like ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("return;");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("boolean");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" data type has only two possible values: true and false. Use this data type for simple flags that track true/false conditions.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("+ (Addition)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Adds values on either side of the operator. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("+=");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Add AND assignment operator. It adds right operand to the left operand and assign the result to left operand.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" class represents character strings. The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String[]");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" represents an array of String.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/advanced-thirteen", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/advanced-thirteen.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Java cannot convert from int to String.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("3_min");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is not a valid name in Java. By convention, method names should be a verb in lowercase or a multi-word name that begins with a verb in lowercase, followed by adjectives, nouns, etc. In multi-word names, the first letter of each of the second and following words should be capitalized.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The most commonly used Integer data type in Java is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("int");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The Java main method declaration is, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("public static void main(String[] args)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/beginner-five", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/beginner-five.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" class represents character strings.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/beginner-four", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/beginner-four.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode(">");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" creates a semantic error in the program.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" class represents character strings.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/beginner-one", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/beginner-one.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The Java main method declaration is, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("public static void main(String[] args)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" semicolon ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/beginner-six", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/beginner-six.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("* (Multiplication)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Multiplies values on either side of the operator.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("% (Modulus)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Divides left-hand operand by right-hand operand and returns remainder.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("!= (not equal to)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Checks if the values of two operands are equal or not, if values are not equal then condition becomes true. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("== (equal to)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Checks if the values of two operands are equal or not, if yes then condition becomes true.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The Java main method declaration is, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("public static void main(String[] args)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/beginner-three", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/beginner-three.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("+ (Addition)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Adds values on either side of the operator. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("- (Subtraction)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Subtracts right-hand operand from left-hand operand.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The most commonly used ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Integer");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" data type in Java is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("int");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/beginner-two", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/beginner-two.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("+ (Addition)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Adds values on either side of the operator. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("++ (Increment)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Increases the value of operand by 1.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The most commonly used Integer data type in Java is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("int");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/bs-accordion-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-accordion-item.hbs"
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
          dom.setAttribute(el1, "class", "panel-body");
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
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [10, 8], [10, 17]]]]],
        locals: [],
        templates: []
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
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/bs-accordion-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "role", "tab");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        dom.setAttribute(el2, "class", "panel-title");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
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
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["panel-heading ", ["subexpr", "if", [["get", "collapsed", ["loc", [null, [1, 68], [1, 77]]]], "collapsed", "expanded"], [], ["loc", [null, [1, 63], [1, 102]]]]]]], ["element", "action", ["toggleActive"], [], ["loc", [null, [1, 16], [1, 41]]]], ["content", "title", ["loc", [null, [4, 12], [4, 21]]]], ["block", "bs-collapse", [], ["collapsed", ["subexpr", "@mut", [["get", "collapsed", ["loc", [null, [8, 25], [8, 34]]]]], [], []], "class", "panel-collapse"], 0, null, ["loc", [null, [8, 0], [12, 16]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/bs-alert", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 0
              }
            },
            "moduleName": "game/templates/components/bs-alert.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "type", "button");
            dom.setAttribute(el1, "class", "close");
            dom.setAttribute(el1, "aria-label", "Close");
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "aria-hidden", "true");
            var el3 = dom.createTextNode("×");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [["element", "action", ["dismiss"], [], ["loc", [null, [3, 59], [3, 79]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-alert.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "if", [["get", "dismissible", ["loc", [null, [2, 6], [2, 17]]]]], [], 0, null, ["loc", [null, [2, 0], [4, 7]]]], ["content", "yield", ["loc", [null, [5, 0], [5, 9]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/bs-alert.hbs"
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
      statements: [["block", "unless", [["get", "hidden", ["loc", [null, [1, 10], [1, 16]]]]], [], 0, null, ["loc", [null, [1, 0], [6, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/bs-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 1,
              "column": 37
            }
          },
          "moduleName": "game/templates/components/bs-button.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "icon", ["loc", [null, [1, 24], [1, 28]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 61
          }
        },
        "moduleName": "game/templates/components/bs-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "icon", ["loc", [null, [1, 6], [1, 10]]]]], [], 0, null, ["loc", [null, [1, 0], [1, 44]]]], ["content", "text", ["loc", [null, [1, 44], [1, 52]]]], ["content", "yield", ["loc", [null, [1, 52], [1, 61]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/bs-form-element", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 31
          }
        },
        "moduleName": "game/templates/components/bs-form-element.hbs"
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
      statements: [["inline", "partial", [["get", "formElementTemplate", ["loc", [null, [1, 10], [1, 29]]]]], [], ["loc", [null, [1, 0], [1, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/bs-form-group", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-form-group.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "aria-hidden", "true");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["form-control-feedback ", ["get", "iconName", ["loc", [null, [3, 41], [3, 49]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 7
          }
        },
        "moduleName": "game/templates/components/bs-form-group.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]], ["block", "if", [["get", "hasFeedback", ["loc", [null, [2, 6], [2, 17]]]]], [], 0, null, ["loc", [null, [2, 0], [4, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/bs-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "moduleName": "game/templates/components/bs-form.hbs"
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
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/bs-modal-dialog", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 8
            },
            "end": {
              "line": 5,
              "column": 8
            }
          },
          "moduleName": "game/templates/components/bs-modal-dialog.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "bs-modal-header", [], ["title", ["subexpr", "@mut", [["get", "title", ["loc", [null, [4, 36], [4, 41]]]]], [], []], "closeButton", ["subexpr", "@mut", [["get", "closeButton", ["loc", [null, [4, 54], [4, 65]]]]], [], []]], ["loc", [null, [4, 12], [4, 67]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 12
              },
              "end": {
                "line": 9,
                "column": 12
              }
            },
            "moduleName": "game/templates/components/bs-modal-dialog.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [8, 16], [8, 25]]]]],
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
              "line": 6,
              "column": 8
            },
            "end": {
              "line": 10,
              "column": 8
            }
          },
          "moduleName": "game/templates/components/bs-modal-dialog.hbs"
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
        statements: [["block", "bs-modal-body", [], [], 0, null, ["loc", [null, [7, 12], [9, 30]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 8
            },
            "end": {
              "line": 12,
              "column": 8
            }
          },
          "moduleName": "game/templates/components/bs-modal-dialog.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [11, 12], [11, 21]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
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
          "moduleName": "game/templates/components/bs-modal-dialog.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "bs-modal-footer", ["loc", [null, [15, 12], [15, 31]]]]],
        locals: [],
        templates: []
      };
    })();
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
            "line": 18,
            "column": 6
          }
        },
        "moduleName": "game/templates/components/bs-modal-dialog.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-content");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 2, 2);
        morphs[3] = dom.createMorphAt(element1, 4, 4);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["modal-dialog ", ["get", "sizeClass", ["loc", [null, [1, 27], [1, 36]]]]]]], ["block", "if", [["get", "header", ["loc", [null, [3, 14], [3, 20]]]]], [], 0, null, ["loc", [null, [3, 8], [5, 15]]]], ["block", "if", [["get", "body", ["loc", [null, [6, 14], [6, 18]]]]], [], 1, 2, ["loc", [null, [6, 8], [12, 15]]]], ["block", "if", [["get", "footer", ["loc", [null, [14, 14], [14, 20]]]]], [], 3, null, ["loc", [null, [14, 8], [16, 15]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("game/templates/components/bs-modal-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-modal-footer.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "this", ["loc", [null, [2, 12], [2, 16]]]]], [], ["loc", [null, [2, 4], [2, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 5,
                  "column": 8
                },
                "end": {
                  "line": 5,
                  "column": 66
                }
              },
              "moduleName": "game/templates/components/bs-modal-footer.hbs"
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
            statements: [["content", "closeTitle", ["loc", [null, [5, 52], [5, 66]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
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
                  "line": 6,
                  "column": 96
                }
              },
              "moduleName": "game/templates/components/bs-modal-footer.hbs"
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
            statements: [["content", "submitTitle", ["loc", [null, [6, 81], [6, 96]]]]],
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
                "line": 4,
                "column": 4
              },
              "end": {
                "line": 7,
                "column": 4
              }
            },
            "moduleName": "game/templates/components/bs-modal-footer.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["block", "bs-button", [], ["type", "default", "action", "close"], 0, null, ["loc", [null, [5, 8], [5, 80]]]], ["block", "bs-button", [], ["type", "primary", "buttonType", "submit", "disabled", ["subexpr", "@mut", [["get", "submitDisabled", ["loc", [null, [6, 65], [6, 79]]]]], [], []]], 1, null, ["loc", [null, [6, 8], [6, 110]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 8,
                  "column": 8
                },
                "end": {
                  "line": 8,
                  "column": 66
                }
              },
              "moduleName": "game/templates/components/bs-modal-footer.hbs"
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
            statements: [["content", "closeTitle", ["loc", [null, [8, 52], [8, 66]]]]],
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
                "line": 7,
                "column": 4
              },
              "end": {
                "line": 9,
                "column": 4
              }
            },
            "moduleName": "game/templates/components/bs-modal-footer.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["block", "bs-button", [], ["type", "primary", "action", "close"], 0, null, ["loc", [null, [8, 8], [8, 80]]]]],
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
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-modal-footer.hbs"
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
        statements: [["block", "if", [["get", "hasSubmitButton", ["loc", [null, [4, 10], [4, 25]]]]], [], 0, 1, ["loc", [null, [4, 4], [9, 11]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 7
          }
        },
        "moduleName": "game/templates/components/bs-modal-footer.hbs"
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
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [10, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/components/bs-modal-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "modifiers",
            "modifiers": ["action"]
          },
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-modal-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "class", "close");
          dom.setAttribute(el1, "aria-label", "Close");
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "aria-hidden", "true");
          var el3 = dom.createTextNode("×");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["close"], [], ["loc", [null, [2, 59], [2, 77]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-modal-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "this", ["loc", [null, [5, 12], [5, 16]]]]], [], ["loc", [null, [5, 4], [5, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-modal-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          dom.setAttribute(el1, "class", "modal-title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "title", ["loc", [null, [7, 28], [7, 37]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/bs-modal-header.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "closeButton", ["loc", [null, [1, 6], [1, 17]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["block", "if", [["get", "hasBlock", ["loc", [null, [4, 6], [4, 14]]]]], [], 1, 2, ["loc", [null, [4, 0], [8, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/components/bs-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 0
              }
            },
            "moduleName": "game/templates/components/bs-modal.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "this", ["loc", [null, [4, 10], [4, 14]]]]], [], ["loc", [null, [4, 2], [4, 16]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
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
                "line": 9,
                "column": 0
              }
            },
            "moduleName": "game/templates/components/bs-modal.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createAttrMorph(element0, 'id');
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["modal-backdrop ", ["subexpr", "if", [["get", "fade", ["loc", [null, [8, 34], [8, 38]]]], "fade"], [], ["loc", [null, [8, 29], [8, 47]]]], " ", ["subexpr", "if", [["get", "in", ["loc", [null, [8, 53], [8, 55]]]], "in"], [], ["loc", [null, [8, 48], [8, 62]]]]]]], ["attribute", "id", ["concat", [["get", "backdropId", ["loc", [null, [8, 70], [8, 80]]]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["block", "bs-modal-dialog", [], ["close", ["subexpr", "action", ["close"], [], ["loc", [null, [3, 25], [3, 41]]]], "fade", ["subexpr", "@mut", [["get", "fade", ["loc", [null, [3, 47], [3, 51]]]]], [], []], "in", ["subexpr", "@mut", [["get", "in", ["loc", [null, [3, 55], [3, 57]]]]], [], []], "id", ["subexpr", "@mut", [["get", "modalId", ["loc", [null, [3, 61], [3, 68]]]]], [], []], "title", ["subexpr", "@mut", [["get", "title", ["loc", [null, [3, 75], [3, 80]]]]], [], []], "closeButton", ["subexpr", "@mut", [["get", "closeButton", ["loc", [null, [3, 93], [3, 104]]]]], [], []], "keyboard", ["subexpr", "@mut", [["get", "keyboard", ["loc", [null, [3, 114], [3, 122]]]]], [], []], "header", ["subexpr", "@mut", [["get", "header", ["loc", [null, [3, 130], [3, 136]]]]], [], []], "body", ["subexpr", "@mut", [["get", "body", ["loc", [null, [3, 142], [3, 146]]]]], [], []], "footer", ["subexpr", "@mut", [["get", "footer", ["loc", [null, [3, 154], [3, 160]]]]], [], []], "size", ["subexpr", "@mut", [["get", "size", ["loc", [null, [3, 166], [3, 170]]]]], [], []], "backdropClose", ["subexpr", "@mut", [["get", "backdropClose", ["loc", [null, [3, 185], [3, 198]]]]], [], []]], 0, null, ["loc", [null, [3, 0], [5, 20]]]], ["block", "if", [["get", "showBackdrop", ["loc", [null, [7, 6], [7, 18]]]]], [], 1, null, ["loc", [null, [7, 0], [9, 7]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 19
          }
        },
        "moduleName": "game/templates/components/bs-modal.hbs"
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
      statements: [["block", "ember-wormhole", [], ["to", "ember-bootstrap-modal-container", "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [1, 69], [1, 82]]]]], [], []]], 0, null, ["loc", [null, [1, 0], [11, 19]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/bs-progress-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "game/templates/components/bs-progress-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "percentRounded", ["loc", [null, [4, 16], [4, 30]]]]], [], ["loc", [null, [4, 8], [4, 32]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 4
              },
              "end": {
                "line": 7,
                "column": 4
              }
            },
            "moduleName": "game/templates/components/bs-progress-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("%\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "percentRounded", ["loc", [null, [6, 8], [6, 26]]]]],
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
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-progress-bar.hbs"
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
        statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [3, 10], [3, 18]]]]], [], 0, 1, ["loc", [null, [3, 4], [7, 11]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
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
                "line": 11,
                "column": 4
              }
            },
            "moduleName": "game/templates/components/bs-progress-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "sr-only");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "percentRounded", ["loc", [null, [10, 38], [10, 52]]]]], [], ["loc", [null, [10, 30], [10, 54]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 4
              },
              "end": {
                "line": 13,
                "column": 4
              }
            },
            "moduleName": "game/templates/components/bs-progress-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "sr-only");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("%");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "percentRounded", ["loc", [null, [12, 30], [12, 48]]]]],
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
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-progress-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [9, 10], [9, 18]]]]], [], 0, 1, ["loc", [null, [9, 4], [13, 11]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/bs-progress-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "showLabel", ["loc", [null, [2, 6], [2, 15]]]]], [], 0, 1, ["loc", [null, [2, 0], [15, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/components/bs-progress", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/bs-progress.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/bs-select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          dom.setAttribute(el1, "disabled", "");
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
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'selected');
          morphs[1] = dom.createMorphAt(element1, 1, 1);
          return morphs;
        },
        statements: [["attribute", "selected", ["subexpr", "bs-not", [["get", "value", ["loc", [null, [2, 39], [2, 44]]]]], [], ["loc", [null, [2, 30], [2, 46]]]]], ["content", "prompt", ["loc", [null, [3, 8], [3, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
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
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/bs-select.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
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
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createAttrMorph(element0, 'selected');
          morphs[2] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "value", ["concat", [["subexpr", "bs-read-path", [["get", "item", ["loc", [null, [8, 34], [8, 38]]]], ["get", "optionValuePath", ["loc", [null, [8, 39], [8, 54]]]]], [], ["loc", [null, [8, 19], [8, 56]]]]]]], ["attribute", "selected", ["subexpr", "bs-eq", [["get", "item", ["loc", [null, [9, 29], [9, 33]]]], ["get", "value", ["loc", [null, [9, 34], [9, 39]]]]], [], ["loc", [null, [9, 21], [9, 41]]]]], ["inline", "bs-read-path", [["get", "item", ["loc", [null, [10, 23], [10, 27]]]], ["get", "optionLabelPath", ["loc", [null, [10, 28], [10, 43]]]]], [], ["loc", [null, [10, 8], [10, 45]]]]],
        locals: ["item"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
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
            "column": 9
          }
        },
        "moduleName": "game/templates/components/bs-select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "prompt", ["loc", [null, [1, 6], [1, 12]]]]], [], 0, null, ["loc", [null, [1, 0], [5, 7]]]], ["block", "each", [["get", "content", ["loc", [null, [7, 8], [7, 15]]]]], ["key", "@identity"], 1, null, ["loc", [null, [7, 0], [12, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/components/code-block", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/code-block.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("code");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element0, 0, 0);
        return morphs;
      },
      statements: [["attribute", "class", ["get", "languageClass", ["loc", [null, [1, 14], [1, 27]]]]], ["content", "yield", ["loc", [null, [1, 30], [1, 39]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/code-section", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
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
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/code-section.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "content");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["content", "handlebarsHtml", ["loc", [null, [1, 21], [1, 39]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/code-snippet", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/code-snippet.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "source", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/form-element/errors", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/errors.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "help-block");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "validationMessages.firstObject", ["loc", [null, [2, 29], [2, 63]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 7
          }
        },
        "moduleName": "game/templates/components/form-element/errors.hbs"
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
      statements: [["block", "if", [["get", "showValidationMessages", ["loc", [null, [1, 6], [1, 28]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/form-element/feedback-icon", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/feedback-icon.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "aria-hidden", "true");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["form-control-feedback ", ["get", "iconName", ["loc", [null, [2, 41], [2, 49]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 7
          }
        },
        "moduleName": "game/templates/components/form-element/feedback-icon.hbs"
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
      statements: [["block", "if", [["get", "hasFeedback", ["loc", [null, [1, 6], [1, 17]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/form-element/horizontal/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
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
            "line": 8,
            "column": 6
          }
        },
        "moduleName": "game/templates/components/form-element/horizontal/checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "checkbox");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [1, 14], [1, 38]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [1, 43], [1, 73]]]]]]], ["inline", "input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 25], [4, 29]]]]], [], []], "type", "checkbox", "checked", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 54], [4, 59]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [4, 69], [4, 77]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [4, 87], [4, 95]]]]], [], []]], ["loc", [null, [4, 12], [4, 97]]]], ["content", "label", ["loc", [null, [4, 98], [4, 107]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [7, 4], [7, 48]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/form-element/horizontal/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
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
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "value", ["loc", [null, [5, 20], [5, 25]]]], ["get", "formElementId", ["loc", [null, [5, 26], [5, 39]]]], ["get", "validation", ["loc", [null, [5, 40], [5, 50]]]]], [], ["loc", [null, [5, 12], [5, 52]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
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
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "bs-input", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [7, 26], [7, 39]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [7, 45], [7, 49]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [7, 55], [7, 66]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [7, 73], [7, 78]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [7, 91], [7, 102]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [7, 113], [7, 122]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [7, 132], [7, 140]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [7, 150], [7, 158]]]]], [], []]], ["loc", [null, [7, 12], [7, 160]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
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
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createAttrMorph(element2, 'class');
          morphs[4] = dom.createMorphAt(element2, 1, 1);
          morphs[5] = dom.createMorphAt(element2, 3, 3);
          morphs[6] = dom.createMorphAt(element2, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["get", "horizontalLabelGridClass", ["loc", [null, [2, 34], [2, 58]]]], " ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 66], [2, 80]]]], "sr-only"], [], ["loc", [null, [2, 61], [2, 92]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 101], [2, 114]]]]]]], ["content", "label", ["loc", [null, [2, 118], [2, 127]]]], ["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [3, 18], [3, 42]]]]]]], ["block", "if", [["get", "hasBlock", ["loc", [null, [4, 14], [4, 22]]]]], [], 0, 1, ["loc", [null, [4, 8], [8, 15]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [9, 8], [9, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [10, 8], [10, 52]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
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
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "value", ["loc", [null, [15, 20], [15, 25]]]], ["get", "formElementId", ["loc", [null, [15, 26], [15, 39]]]], ["get", "validation", ["loc", [null, [15, 40], [15, 50]]]]], [], ["loc", [null, [15, 12], [15, 52]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
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
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "bs-input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [17, 28], [17, 32]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [17, 38], [17, 49]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [17, 56], [17, 61]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [17, 74], [17, 85]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [17, 96], [17, 105]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [17, 115], [17, 123]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [17, 133], [17, 141]]]]], [], []]], ["loc", [null, [17, 12], [17, 143]]]]],
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
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          morphs[3] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [13, 18], [13, 42]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [13, 47], [13, 77]]]]]]], ["block", "if", [["get", "hasBlock", ["loc", [null, [14, 14], [14, 22]]]]], [], 0, 1, ["loc", [null, [14, 8], [18, 15]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [19, 8], [19, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [20, 8], [20, 52]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
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
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [22, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/components/form-element/horizontal/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/select.hbs"
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
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
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
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createAttrMorph(element2, 'class');
          morphs[4] = dom.createMorphAt(element2, 1, 1);
          morphs[5] = dom.createMorphAt(element2, 3, 3);
          morphs[6] = dom.createMorphAt(element2, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["get", "horizontalLabelGridClass", ["loc", [null, [2, 34], [2, 58]]]], " ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 66], [2, 80]]]], "sr-only"], [], ["loc", [null, [2, 61], [2, 92]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 101], [2, 114]]]]]]], ["content", "label", ["loc", [null, [2, 118], [2, 127]]]], ["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [3, 18], [3, 42]]]]]]], ["inline", "bs-select", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [4, 23], [4, 36]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 42], [4, 46]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [4, 55], [4, 62]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "choiceValueProperty", ["loc", [null, [4, 79], [4, 98]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "choiceLabelProperty", ["loc", [null, [4, 115], [4, 134]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 141], [4, 146]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [4, 156], [4, 164]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [4, 174], [4, 182]]]]], [], []]], ["loc", [null, [4, 8], [4, 184]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 8], [5, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 8], [6, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/select.hbs"
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
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
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
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          morphs[3] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [9, 18], [9, 42]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [9, 47], [9, 77]]]]]]], ["inline", "bs-select", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [10, 25], [10, 29]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [10, 38], [10, 45]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "choiceValueProperty", ["loc", [null, [10, 62], [10, 81]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "choiceLabelProperty", ["loc", [null, [10, 98], [10, 117]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 124], [10, 129]]]]], [], []]], ["loc", [null, [10, 8], [10, 131]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [11, 8], [11, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [12, 8], [12, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/horizontal/select.hbs"
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
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/components/form-element/horizontal/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/textarea.hbs"
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
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
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
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createAttrMorph(element2, 'class');
          morphs[4] = dom.createMorphAt(element2, 1, 1);
          morphs[5] = dom.createMorphAt(element2, 3, 3);
          morphs[6] = dom.createMorphAt(element2, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["get", "horizontalLabelGridClass", ["loc", [null, [2, 34], [2, 58]]]], " ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 66], [2, 80]]]], "sr-only"], [], ["loc", [null, [2, 61], [2, 92]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 101], [2, 114]]]]]]], ["content", "label", ["loc", [null, [2, 118], [2, 127]]]], ["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [3, 18], [3, 42]]]]]]], ["inline", "bs-textarea", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [4, 25], [4, 38]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 44], [4, 48]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 55], [4, 60]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 73], [4, 84]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [4, 95], [4, 104]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [4, 110], [4, 114]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [4, 120], [4, 124]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [4, 134], [4, 142]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [4, 152], [4, 160]]]]], [], []]], ["loc", [null, [4, 8], [4, 162]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 8], [5, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 8], [6, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/horizontal/textarea.hbs"
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
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
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
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          morphs[3] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [9, 18], [9, 42]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [9, 47], [9, 77]]]]]]], ["inline", "bs-textarea", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [10, 27], [10, 31]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 38], [10, 43]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [10, 56], [10, 67]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [10, 78], [10, 87]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [10, 93], [10, 97]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [10, 103], [10, 107]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [10, 117], [10, 125]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [10, 135], [10, 143]]]]], [], []]], ["loc", [null, [10, 8], [10, 145]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [11, 8], [11, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [12, 8], [12, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/horizontal/textarea.hbs"
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
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/components/form-element/inline/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
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
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "game/templates/components/form-element/inline/checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "checkbox");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["inline", "input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [3, 21], [3, 25]]]]], [], []], "type", "checkbox", "checked", ["subexpr", "@mut", [["get", "value", ["loc", [null, [3, 50], [3, 55]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [3, 65], [3, 73]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [3, 83], [3, 91]]]]], [], []]], ["loc", [null, [3, 8], [3, 93]]]], ["content", "label", ["loc", [null, [3, 94], [3, 103]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/form-element/inline/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/inline/default.hbs"
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 37], [2, 51]]]], "sr-only"], [], ["loc", [null, [2, 32], [2, 63]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 72], [2, 85]]]]]]], ["content", "label", ["loc", [null, [2, 89], [2, 98]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/inline/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "value", ["loc", [null, [5, 12], [5, 17]]]], ["get", "formElementId", ["loc", [null, [5, 18], [5, 31]]]], ["get", "validation", ["loc", [null, [5, 32], [5, 42]]]]], [], ["loc", [null, [5, 4], [5, 44]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/inline/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "bs-input", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [7, 18], [7, 31]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [7, 37], [7, 41]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [7, 47], [7, 58]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [7, 65], [7, 70]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [7, 83], [7, 94]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [7, 105], [7, 114]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [7, 124], [7, 132]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [7, 142], [7, 150]]]]], [], []]], ["loc", [null, [7, 4], [7, 152]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/inline/default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["block", "if", [["get", "hasBlock", ["loc", [null, [4, 6], [4, 14]]]]], [], 1, 2, ["loc", [null, [4, 0], [8, 7]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [9, 0], [9, 51]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/components/form-element/inline/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/inline/select.hbs"
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 37], [2, 51]]]], "sr-only"], [], ["loc", [null, [2, 32], [2, 63]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 72], [2, 85]]]]]]], ["content", "label", ["loc", [null, [2, 89], [2, 98]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/inline/select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-select", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [4, 15], [4, 28]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 34], [4, 38]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [4, 47], [4, 54]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "choiceValueProperty", ["loc", [null, [4, 71], [4, 90]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "choiceLabelProperty", ["loc", [null, [4, 107], [4, 126]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 133], [4, 138]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [4, 148], [4, 156]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [4, 166], [4, 174]]]]], [], []]], ["loc", [null, [4, 0], [4, 176]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/form-element/inline/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/inline/textarea.hbs"
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 37], [2, 51]]]], "sr-only"], [], ["loc", [null, [2, 32], [2, 63]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 72], [2, 85]]]]]]], ["content", "label", ["loc", [null, [2, 89], [2, 98]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/inline/textarea.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-textarea", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [4, 17], [4, 30]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 36], [4, 40]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 47], [4, 52]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 65], [4, 76]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [4, 87], [4, 96]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [4, 102], [4, 106]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [4, 112], [4, 116]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [4, 126], [4, 134]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [4, 144], [4, 152]]]]], [], []]], ["loc", [null, [4, 0], [4, 154]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/form-element/vertical/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
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
            "line": 6,
            "column": 44
          }
        },
        "moduleName": "game/templates/components/form-element/vertical/checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "checkbox");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [3, 21], [3, 25]]]]], [], []], "type", "checkbox", "checked", ["subexpr", "@mut", [["get", "value", ["loc", [null, [3, 50], [3, 55]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [3, 65], [3, 73]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [3, 83], [3, 91]]]]], [], []]], ["loc", [null, [3, 8], [3, 93]]]], ["content", "label", ["loc", [null, [3, 94], [3, 103]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/form-element/vertical/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/vertical/default.hbs"
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 37], [2, 51]]]], "sr-only"], [], ["loc", [null, [2, 32], [2, 63]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 72], [2, 85]]]]]]], ["content", "label", ["loc", [null, [2, 89], [2, 98]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/vertical/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "value", ["loc", [null, [5, 12], [5, 17]]]], ["get", "formElementId", ["loc", [null, [5, 18], [5, 31]]]], ["get", "validation", ["loc", [null, [5, 32], [5, 42]]]]], [], ["loc", [null, [5, 4], [5, 44]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/vertical/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "bs-input", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [7, 18], [7, 31]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [7, 37], [7, 41]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [7, 47], [7, 58]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [7, 65], [7, 70]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [7, 83], [7, 94]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [7, 105], [7, 114]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [7, 124], [7, 132]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [7, 142], [7, 150]]]]], [], []]], ["loc", [null, [7, 4], [7, 152]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/vertical/default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["block", "if", [["get", "hasBlock", ["loc", [null, [4, 6], [4, 14]]]]], [], 1, 2, ["loc", [null, [4, 0], [8, 7]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [9, 0], [9, 51]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [10, 0], [10, 44]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/components/form-element/vertical/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/vertical/select.hbs"
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 37], [2, 51]]]], "sr-only"], [], ["loc", [null, [2, 32], [2, 63]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 72], [2, 85]]]]]]], ["content", "label", ["loc", [null, [2, 89], [2, 98]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/vertical/select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-select", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [4, 15], [4, 28]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 34], [4, 38]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [4, 47], [4, 54]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "choiceValueProperty", ["loc", [null, [4, 71], [4, 90]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "choiceLabelProperty", ["loc", [null, [4, 107], [4, 126]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 133], [4, 138]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [4, 148], [4, 156]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [4, 166], [4, 174]]]]], [], []]], ["loc", [null, [4, 0], [4, 176]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/form-element/vertical/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/form-element/vertical/textarea.hbs"
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["subexpr", "if", [["get", "invisibleLabel", ["loc", [null, [2, 37], [2, 51]]]], "sr-only"], [], ["loc", [null, [2, 32], [2, 63]]]]]]], ["attribute", "for", ["concat", [["get", "formElementId", ["loc", [null, [2, 72], [2, 85]]]]]]], ["content", "label", ["loc", [null, [2, 89], [2, 98]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/form-element/vertical/textarea.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-textarea", [], ["id", ["subexpr", "@mut", [["get", "formElementId", ["loc", [null, [4, 17], [4, 30]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 37], [4, 42]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 48], [4, 52]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 65], [4, 76]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [4, 87], [4, 96]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [4, 106], [4, 114]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [4, 124], [4, 132]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [4, 138], [4, 142]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [4, 148], [4, 152]]]]], [], []]], ["loc", [null, [4, 0], [4, 154]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/info-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 5,
              "column": 4
            }
          },
          "moduleName": "game/templates/components/info-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      Back to Menu\n");
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
            "line": 103,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/info-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "id", "contact");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Quick Survey");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Tell us a little about your self");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode(" Your Gender");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likertt");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4, "type", "radio");
        dom.setAttribute(el4, "name", "gender");
        dom.setAttribute(el4, "value", "male");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Male   ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4, "type", "radio");
        dom.setAttribute(el4, "name", "gender");
        dom.setAttribute(el4, "value", "female");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Female");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("How old are you?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likertt");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4, "name", "age");
        dom.setAttribute(el4, "value", "");
        dom.setAttribute(el4, "type", "text");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("How many months/years do you have programming experience");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likert");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "experience");
        dom.setAttribute(el5, "value", "1");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Less than a month");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "experience");
        dom.setAttribute(el5, "value", "2");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("1-06 months");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "experience");
        dom.setAttribute(el5, "value", "3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("6-12 months");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "experience");
        dom.setAttribute(el5, "value", "4");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("1-2 years");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "experience");
        dom.setAttribute(el5, "value", "5");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("2+ years");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("I enjoy mobile games very much");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likert");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "enjoy");
        dom.setAttribute(el5, "value", "1");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly disagree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "enjoy");
        dom.setAttribute(el5, "value", "2");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Disagree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "enjoy");
        dom.setAttribute(el5, "value", "3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Neutral");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "enjoy");
        dom.setAttribute(el5, "value", "4");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "enjoy");
        dom.setAttribute(el5, "value", "5");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("Which programming languages have you used before");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likertt");
        var el4 = dom.createTextNode("\n\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        dom.setAttribute(el4, "style", "width:100%");
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createTextNode("  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "name", "language");
        dom.setAttribute(el7, "value", "java");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        var el8 = dom.createTextNode("Java");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createTextNode("  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "name", "language");
        dom.setAttribute(el7, "value", "c");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        var el8 = dom.createTextNode("C");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createTextNode("  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "name", "language");
        dom.setAttribute(el7, "value", "c++");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        var el8 = dom.createTextNode("C++");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n  ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createTextNode("  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "name", "language");
        dom.setAttribute(el7, "value", "python");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        var el8 = dom.createTextNode("Python");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createTextNode("  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "name", "language");
        dom.setAttribute(el7, "value", "javascript");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        var el8 = dom.createTextNode("JavaScript");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n   \n  ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n \n  ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("fieldset");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "name", "submit");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "id", "contact-submit");
        dom.setAttribute(el4, "data-submit", "...Sending");
        var el5 = dom.createTextNode("Submit");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["submit"], ["on", "submit"], ["loc", [null, [2, 23], [2, 54]]]], ["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back-button", "tagName", "button"], 0, null, ["loc", [null, [3, 4], [5, 16]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("game/templates/components/intermediate-eight", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/intermediate-eight.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  A ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("class");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is a blueprint from which individual objects are created.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Any method declared ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("void");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" doesn't return a value.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" semicolon ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("+ (Addition)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Adds values on either side of the operator. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("++ (Increment)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Increases the value of operand by 1.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/intermediate-eleven", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/intermediate-eleven.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("boolean");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" data type has only two possible values: true and false. Use this data type for simple flags that track true/false conditions.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Any method declared ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("void");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" doesn't return a value.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" class represents character strings.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/intermediate-nine", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/intermediate-nine.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Unlike if-then and if-then-else statements, the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("switch");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" statement can have a number of possible execution paths.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  Each ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("break;");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" statement terminates the enclosing ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("switch");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" statement.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/intermediate-seven", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/intermediate-seven.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\nAny method that is not declared void must contain a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("return statement");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" with a corresponding return value, like:\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("\nreturn returnValue;\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("+ (Addition)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Adds values on either side of the operator. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("++ (Increment)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Increases the value of operand by 1.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" semicolon ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The most commonly used ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Integer");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" data type in Java is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("int");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/intermediate-ten", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/intermediate-ten.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Creates semantic error. It should be ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The most commonly used ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("Integer");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" data type in Java is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("int");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("/ (Division)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Divides left-hand operand by right-hand operand. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("% (Modulus)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Divides left-hand operand by right-hand operand and returns remainder.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("!= (not equal to)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Checks if the values of two operands are equal or not, if values are not equal then condition becomes true. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("== (equal to)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Checks if the values of two operands are equal or not, if yes then condition becomes true.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/intermediate-twelve", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/intermediate-twelve.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  An ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("interface");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is a group of related methods with empty bodies.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" class represents character strings. The ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("String[]");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" represents an array of String.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("; (Semicolon)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ends a statement, not function declaration.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "notice notice-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("{ } Braces");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" are used to group statements and declarations. There must be equal numbers of opening and close braces.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("game/templates/components/markdown-section", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
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
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/markdown-section.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "content");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["content", "handlebarsHtml", ["loc", [null, [1, 21], [1, 39]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/components/program-details", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/program-details.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("center");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createTextNode("\n  Press Start to Begin\n");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "btn btn-primary btn-lg");
          dom.setAttribute(el2, "id", "start-button");
          var el3 = dom.createTextNode("Start");
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
          var element1 = dom.childAt(fragment, [0, 3]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["element", "action", ["clickCode", ["get", "program.errorindexes", ["loc", [null, [9, 31], [9, 51]]]]], [], ["loc", [null, [9, 10], [9, 53]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
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
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/program-details.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("center");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "btn btn-primary btn-lg next-level-none");
          dom.setAttribute(el2, "id", "retry-button");
          var el3 = dom.createTextNode("Retry");
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
          var element0 = dom.childAt(fragment, [0, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["clickCode", ["get", "program.errorindexes", ["loc", [null, [14, 29], [14, 49]]]]], [], ["loc", [null, [14, 8], [14, 51]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 0
            },
            "end": {
              "line": 29,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/program-details.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "id", "timer");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "id", "scores");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "id", "first-score");
          dom.setAttribute(el2, "class", "star-icon");
          var el3 = dom.createTextNode("☆");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "id", "second-score");
          dom.setAttribute(el2, "class", "star-icon");
          var el3 = dom.createTextNode("☆");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "id", "third-score");
          dom.setAttribute(el2, "class", "star-icon");
          var el3 = dom.createTextNode("☆");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "id", "fourth-score");
          dom.setAttribute(el2, "class", "hide-star-icon");
          var el3 = dom.createTextNode("☆");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "id", "fifth-score");
          dom.setAttribute(el2, "class", "hide-star-icon");
          var el3 = dom.createTextNode("☆");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
          return morphs;
        },
        statements: [["inline", "x-timer", [], ["autoStart", "true", "format", "HH:MM:SS", "stopRequired", false], ["loc", [null, [20, 0], [20, 65]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/program-details.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("pre");
        dom.setAttribute(el1, "id", "pre-code");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2, "id", "p-code");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" {{#code-block language='java'}}\n  {{program.code}}\n{{/code-block}} ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" {{#link-to 'login' id='index-button' class=\"btn btn-primary btn-lg\" }}login{{/link-to}} ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [7, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "ember-notify", [], ["messageStyle", "bootstrap", "classPrefix", "custom-notify"], ["loc", [null, [1, 0], [1, 69]]]], ["block", "if", [["subexpr", "eq", [["get", "clicked", ["loc", [null, [4, 10], [4, 17]]]], "false"], [], ["loc", [null, [4, 6], [4, 26]]]]], [], 0, null, ["loc", [null, [4, 0], [11, 7]]]], ["block", "if", [["subexpr", "eq", [["get", "clicked", ["loc", [null, [12, 10], [12, 17]]]], "true"], [], ["loc", [null, [12, 6], [12, 25]]]]], [], 1, null, ["loc", [null, [12, 0], [16, 7]]]], ["block", "if", [["subexpr", "eq", [["get", "clicked", ["loc", [null, [18, 10], [18, 17]]]], "true"], [], ["loc", [null, [18, 6], [18, 25]]]]], [], 2, null, ["loc", [null, [18, 0], [29, 7]]]], ["content", "program.code", ["loc", [null, [33, 4], [33, 20]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/components/signup-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 6
            },
            "end": {
              "line": 8,
              "column": 6
            }
          },
          "moduleName": "game/templates/components/signup-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        Back to Menu\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 61,
              "column": 26
            },
            "end": {
              "line": 64,
              "column": 26
            }
          },
          "moduleName": "game/templates/components/signup-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                            What is this?\n                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" <i class=\"material-icons\">mode_edit</i> ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 72,
              "column": 26
            },
            "end": {
              "line": 74,
              "column": 26
            }
          },
          "moduleName": "game/templates/components/signup-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                            Cancel\n");
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 84,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/signup-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "wrapper");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Main Content ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "signupbox");
        dom.setAttribute(el2, "style", "margin-top:50px");
        dom.setAttribute(el2, "class", "mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "panel panel-warning");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "panel-heading");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "panel-title");
        var el6 = dom.createTextNode("Sign Up");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "panel-body");
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("form");
        dom.setAttribute(el5, "id", "save-user");
        dom.setAttribute(el5, "class", "form-horizontal");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "id", "signupalert");
        dom.setAttribute(el6, "style", "display:none");
        dom.setAttribute(el6, "class", "alert alert-danger");
        var el7 = dom.createTextNode("\n                          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Error:");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" <div class=\"form-group\">\n                        <label for=\"userName\" class=\"col-md-3 control-label\">Full Name</label>\n                        <div class=\"col-md-9\">\n                            <input id=\"signUpNameInput\" type=\"text\" class=\"form-control\" name=\"userName\" placeholder=\"Firstname Lastname\">\n                        </div>\n                    </div> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "form-group");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "email");
        dom.setAttribute(el7, "class", "col-md-3 control-label");
        var el8 = dom.createTextNode("Email (username)");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "col-md-9");
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "form-group");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "password");
        dom.setAttribute(el7, "class", "col-md-3 control-label");
        var el8 = dom.createTextNode("Password");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "col-md-9");
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "form-group");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "passwordConfirmation");
        dom.setAttribute(el7, "class", "col-md-3 control-label");
        var el8 = dom.createTextNode("Confirm Password");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "col-md-9");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" <div class=\"form-group\">\n                        <label for=\"levelcompleted\" class=\"col-md-3 control-label\">Level Completed</label>\n                        <div class=\"col-md-9\">\n                            {{input value=user.levelcompleted id=\"levelcompleted\" type=\"text\" class=\"form-control\" name=\"levelcompleted\" placeholder=\"1\"}}\n                        </div>\n                    </div> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "form-group");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment(" <label for=\"consent\" class=\"col-md-3 control-label\"><input id=\"consent-checkbox\" type=\"checkbox\" name=\"consent\" value=\"consent\"></label> ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "col-md-9");
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("label");
        var el9 = dom.createElement("input");
        dom.setAttribute(el9, "id", "consent-checkbox");
        dom.setAttribute(el9, "type", "checkbox");
        dom.setAttribute(el9, "name", "consent");
        dom.setAttribute(el9, "value", "1");
        dom.setAttribute(el9, "checked", "");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                          My data can be used for research purposes.\n                          ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "form-group");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment(" Button ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "col-md-offset-3 col-md-9");
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("button");
        dom.setAttribute(el8, "class", "btn btn-info");
        dom.setAttribute(el8, "type", "submit");
        dom.setAttribute(el8, "id", "signup-submit");
        var el9 = dom.createTextNode("Sign Up");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
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
        var element0 = dom.childAt(fragment, [2, 3]);
        var element1 = dom.childAt(element0, [3, 3, 1]);
        if (this.cachedFragment) {
          dom.repairClonedNode(dom.childAt(element1, [13, 3, 1, 0]), [], true);
        }
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createElementMorph(element1);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [5, 3]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [7, 3]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element1, [9, 3]), 1, 1);
        morphs[6] = dom.createMorphAt(dom.childAt(element1, [13, 3]), 3, 3);
        morphs[7] = dom.createMorphAt(dom.childAt(element1, [15, 3]), 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "ember-notify", [], ["messageStyle", "bootstrap", "classPrefix", "custom-notify"], ["loc", [null, [1, 0], [1, 69]]]], ["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back-button", "tagName", "button"], 0, null, ["loc", [null, [6, 6], [8, 18]]]], ["element", "action", ["submit"], ["on", "submit"], ["loc", [null, [14, 59], [14, 90]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "user.email", ["loc", [null, [29, 40], [29, 50]]]]], [], []], "id", "signUpEmailInput", "type", "text", "class", "form-control", "name", "userEmail", "placeholder", "Email (username)"], ["loc", [null, [29, 26], [29, 155]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "user.password", ["loc", [null, [37, 40], [37, 53]]]]], [], []], "id", "signUpPasswordInput", "type", "password", "class", "form-control", "name", "userPassword", "placeholder", "Password"], ["loc", [null, [37, 26], [37, 161]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "user.passwordConfirmation", ["loc", [null, [44, 42], [44, 67]]]]], [], []], "id", "signUpConfirmInput", "type", "password", "class", "form-control", "name", "icode", "placeholder", "Confirm Password"], ["loc", [null, [44, 28], [44, 174]]]], ["block", "link-to", ["consent"], ["id", "signup-consent"], 1, null, ["loc", [null, [61, 26], [64, 38]]]], ["block", "link-to", ["index"], ["class", "btn btn-default"], 2, null, ["loc", [null, [72, 26], [74, 38]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/components/survey-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 5
            }
          },
          "moduleName": "game/templates/components/survey-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Logged in as ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "session.data.email", ["loc", [null, [2, 18], [2, 40]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 5
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/survey-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment(" \n  <button onclick={{action 'login'}}>Login</button> ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/survey-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/survey-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  Back to Menu\n");
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 121,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/survey-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "id", "contact");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "beginner-statement");
        var el4 = dom.createTextNode("\n      Please indicate how strongly you agree or disagree with all the following statements.\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("1. Using CodeReadingDojo improves my code reading skills in Java.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likert");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s1");
        dom.setAttribute(el5, "value", "1");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly disagree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s1");
        dom.setAttribute(el5, "value", "2");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Disagree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s1");
        dom.setAttribute(el5, "value", "3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Neutral");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s1");
        dom.setAttribute(el5, "value", "4");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s1");
        dom.setAttribute(el5, "value", "5");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("2. Using CodeReadingDojo improves my code writing skills in Java.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likert");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s2");
        dom.setAttribute(el5, "value", "1");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly disagree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s2");
        dom.setAttribute(el5, "value", "2");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Disagree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s2");
        dom.setAttribute(el5, "value", "3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Neutral");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s2");
        dom.setAttribute(el5, "value", "4");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s2");
        dom.setAttribute(el5, "value", "5");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly Agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("3. Using CodeReadingDojo improves my abbility to find errors in my own program.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likert");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s3");
        dom.setAttribute(el5, "value", "1");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly disgree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s3");
        dom.setAttribute(el5, "value", "2");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Disgree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s3");
        dom.setAttribute(el5, "value", "3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Neutral");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s3");
        dom.setAttribute(el5, "value", "4");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s3");
        dom.setAttribute(el5, "value", "5");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "statement");
        var el4 = dom.createTextNode("4. CodeReadingDojo improves my overall programming ability.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "likert");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s4");
        dom.setAttribute(el5, "value", "1");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly disgree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s4");
        dom.setAttribute(el5, "value", "2");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Disagree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s4");
        dom.setAttribute(el5, "value", "3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Neutral");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s4");
        dom.setAttribute(el5, "value", "4");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "radio");
        dom.setAttribute(el5, "name", "s4");
        dom.setAttribute(el5, "value", "5");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strongly agree");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "beginner-statement");
        var el4 = dom.createTextNode("We're asking these questions to make this game a better experiece. By answering to this questions you're giving permission to use your answers for research purposes.\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "buttons");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "btn btn-info");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "id", "signup-submit");
        var el5 = dom.createTextNode("Submit Survey");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" {{#link-to 'new' class=\"btn btn-primary btn-s submit\" type=\"submit\" id=\"survey-submit\"}}Submit{{/link-to}} ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
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
        var element0 = dom.childAt(fragment, [3, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createElementMorph(element0);
        morphs[3] = dom.createMorphAt(element0, 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [1, 6], [1, 29]]]]], [], 0, 1, ["loc", [null, [1, 0], [5, 7]]]], ["block", "link-to", ["new"], [], 2, null, ["loc", [null, [8, 0], [10, 12]]]], ["element", "action", ["submit"], ["on", "submit"], ["loc", [null, [12, 21], [12, 52]]]], ["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back-button", "tagName", "button"], 3, null, ["loc", [null, [13, 0], [15, 12]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("game/templates/components/x-timer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/x-timer.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-sm btn-primary");
          var el2 = dom.createTextNode("Start");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element2);
          morphs[1] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["element", "bind-attr", [], ["class", ":btn :btn-sm isRunning:btn-default:btn-primary"], ["loc", [null, [3, 22], [3, 90]]]], ["element", "action", ["start"], [], ["loc", [null, [3, 122], [3, 140]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/x-timer.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          var el2 = dom.createTextNode("Stop");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["element", "bind-attr", [], ["class", ":btn :btn-sm isRunning:btn-primary:btn-default"], ["loc", [null, [6, 22], [6, 90]]]], ["element", "action", ["stop", true], [], ["loc", [null, [6, 91], [6, 113]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 72
              },
              "end": {
                "line": 9,
                "column": 94
              }
            },
            "moduleName": "game/templates/components/x-timer.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Pause");
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
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 94
              },
              "end": {
                "line": 9,
                "column": 107
              }
            },
            "moduleName": "game/templates/components/x-timer.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Cont.");
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
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "game/templates/components/x-timer.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "class", "btn btn-sm btn-default");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["pause"], [], ["loc", [null, [9, 53], [9, 71]]]], ["block", "if", [["get", "isRunning", ["loc", [null, [9, 78], [9, 87]]]]], [], 0, 1, ["loc", [null, [9, 72], [9, 114]]]]],
        locals: [],
        templates: [child0, child1]
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
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "game/templates/components/x-timer.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "duration", ["loc", [null, [1, 4], [1, 16]]]], ["block", "if", [["get", "showStartBtn", ["loc", [null, [2, 6], [2, 18]]]]], [], 0, null, ["loc", [null, [2, 0], [4, 7]]]], ["block", "if", [["get", "stopRequired", ["loc", [null, [5, 6], [5, 18]]]]], [], 1, null, ["loc", [null, [5, 0], [7, 7]]]], ["block", "if", [["get", "isStopWatch", ["loc", [null, [8, 6], [8, 17]]]]], [], 2, null, ["loc", [null, [8, 0], [10, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/consent", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "game/templates/consent.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Back to Signup page\n");
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
    var child1 = (function () {
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
                      "line": 39,
                      "column": 6
                    },
                    "end": {
                      "line": 41,
                      "column": 6
                    }
                  },
                  "moduleName": "game/templates/consent.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("        Submit\n");
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
                    "line": 31,
                    "column": 6
                  },
                  "end": {
                    "line": 42,
                    "column": 6
                  }
                },
                "moduleName": "game/templates/consent.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("label");
                dom.setAttribute(el1, "class", "consent-form");
                var el2 = dom.createElement("input");
                dom.setAttribute(el2, "type", "radio");
                dom.setAttribute(el2, "name", "consent");
                dom.setAttribute(el2, "value", "1");
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n      I agree\n      ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("label");
                dom.setAttribute(el1, "class", "consent-form");
                var el2 = dom.createElement("input");
                dom.setAttribute(el2, "type", "radio");
                dom.setAttribute(el2, "name", "consent");
                dom.setAttribute(el2, "value", "0");
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n      I disagree\n      ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n\n");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 5, 5, contextualElement);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "submit-consent", "tagName", "button", "invokeAction", ["subexpr", "action", ["submit", ["get", "user", ["loc", [null, [39, 114], [39, 118]]]]], [], ["loc", [null, [39, 97], [39, 119]]]]], 0, null, ["loc", [null, [39, 6], [41, 18]]]]],
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
                  "line": 30,
                  "column": 4
                },
                "end": {
                  "line": 43,
                  "column": 4
                }
              },
              "moduleName": "game/templates/consent.hbs"
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
            statements: [["block", "if", [["subexpr", "nnull", [["get", "user.password", ["loc", [null, [31, 19], [31, 32]]]]], [], ["loc", [null, [31, 12], [31, 33]]]]], [], 0, null, ["loc", [null, [31, 6], [42, 13]]]]],
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
                "line": 29,
                "column": 2
              },
              "end": {
                "line": 44,
                "column": 2
              }
            },
            "moduleName": "game/templates/consent.hbs"
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
          statements: [["block", "if", [["subexpr", "eq", [["get", "session.data.email", ["loc", [null, [30, 14], [30, 32]]]], ["get", "user.email", ["loc", [null, [30, 33], [30, 43]]]]], [], ["loc", [null, [30, 10], [30, 44]]]]], [], 0, null, ["loc", [null, [30, 4], [43, 11]]]]],
          locals: ["user"],
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
              "line": 28,
              "column": 0
            },
            "end": {
              "line": 45,
              "column": 0
            }
          },
          "moduleName": "game/templates/consent.hbs"
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
        statements: [["block", "each", [["get", "model", ["loc", [null, [29, 10], [29, 15]]]]], [], 0, null, ["loc", [null, [29, 2], [44, 11]]]]],
        locals: [],
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
            "line": 46,
            "column": 0
          }
        },
        "moduleName": "game/templates/consent.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        dom.setAttribute(el1, "id", "consent-box");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "id", "consent-title");
        var el3 = dom.createTextNode(" Want to win a $10 Amazon gift card?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  I would like to invite you to participate in a research project. CodeReadingDojo is a new educationally-oriented mobile game application, aimed at promoting the development of code reading skills in a new and fun way. Data collected during the project will help evaluate the impact of game-based learning on code reading, and results will be published in academic papers and a master’s thesis.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nAll data obtained from participants will be kept confidential and will only be reported in combined format. We won’t use your name or any other personally identifiable information in any publications.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nYour participation is voluntary and will not affect your grades or relationship with Virginia Tech in any way. Participation in this research will not place you at more than minimal risk of physical or psychological harm. If you agree to participate, you are also giving us permission to use collected data (such as game level completed and completion time) in our research. If you do not wish to participate, simply do not agree to collect your data; you still can play the game. You are free not to answer any questions or withdraw from this study at any time, for any reason. You must be 18 or older to take part in this research. If you are under 18 but still want to play the game, please select disagree below.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nPlaying with CodeReadingDojo until you reach level 6 should take approximately an hour, although you may also want to continue to the last level (level 18). You will be able to play each level more than once.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nIn exchange for your participation, all people who have completed through level 6 in the game by ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("Feb 5th 2017");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" will be entered into a raffle where 20 players will be selected each to receive a ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("$10 Amazon gift card");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nShould you have any questions about this study, you may contact ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("Zahra Ghaed");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" (principal investigator), at ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("540-449-5717");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(", ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("ghaed@vt.edu");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" or ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("Prof. Stephen Edwards");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(", edwards@cs.vt.edu.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nShould you have any questions or concerns about the study’s conduct or your rights as a research subject, or need to report a research-related injury or event, you may contact the VT IRB Chair, Dr. David M. Moore at moored@vt.edu or (540) 231-4991.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "link-to", ["signup"], ["class", "btn btn-primary", "id", "back-button", "tagName", "button"], 0, null, ["loc", [null, [2, 2], [4, 14]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [28, 6], [28, 29]]]]], [], 1, null, ["loc", [null, [28, 0], [45, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/contact", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "game/templates/contact.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Back\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 7,
              "column": 2
            }
          },
          "moduleName": "game/templates/contact.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "game/templates/contact.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        dom.setAttribute(el1, "id", "about");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "id", "consent-title");
        var el3 = dom.createTextNode("Contact");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nIf you have any questions about this application, you may contact me, Zahra Ghaed, at ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("strong");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("ghaed@vt.edu");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" or Prof. Stephen Edwards, edwards@cs.vt.edu.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode(" ");
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
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 2, 2);
        return morphs;
      },
      statements: [["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back", "tagName", "button"], 0, null, ["loc", [null, [2, 2], [4, 14]]]], ["block", "link-to", ["new"], [], 1, null, ["loc", [null, [5, 2], [7, 14]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 0
              },
              "end": {
                "line": 11,
                "column": 63
              }
            },
            "moduleName": "game/templates/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Play");
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
      var child1 = (function () {
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
                "line": 14,
                "column": 0
              }
            },
            "moduleName": "game/templates/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  Instruction\n");
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
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "game/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment(" {{#link-to 'info' class=\"btn btn-primary\" id=\"survey\"}}\n  Info Survey\n{{/link-to}} ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["new"], ["class", "btn btn-primary btn-lg", "id", "play"], 0, null, ["loc", [null, [11, 0], [11, 75]]]], ["block", "link-to", ["instruction"], ["id", "skip-ready"], 1, null, ["loc", [null, [12, 0], [14, 12]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 21,
                "column": 0
              },
              "end": {
                "line": 23,
                "column": 0
              }
            },
            "moduleName": "game/templates/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  Sign Up\n");
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
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 24,
                "column": 0
              },
              "end": {
                "line": 26,
                "column": 0
              }
            },
            "moduleName": "game/templates/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  Quick Play\n");
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
              "line": 15,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "game/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          var el2 = dom.createTextNode("Welcome!");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\nCodeReadingDojo is an educationally-oriented mobile game aimed at promoting Java reading skills.\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 6, 6, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["signup"], ["class", "btn btn-primary", "id", "signup"], 0, null, ["loc", [null, [21, 0], [23, 12]]]], ["block", "link-to", ["new"], ["id", "skip-login", "invokeAction", ["subexpr", "action", ["setLevel"], [], ["loc", [null, [24, 46], [24, 65]]]]], 1, null, ["loc", [null, [24, 0], [26, 12]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
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
            "line": 31,
            "column": 0
          }
        },
        "moduleName": "game/templates/index.hbs"
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
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "id", "index-title");
        var el3 = dom.createTextNode("CodeReadingDojo");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        var el3 = dom.createTextNode("A new and fun way to find bugs!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "id", "index-logo");
        dom.setAttribute(el2, "src", "assets/images/logo.png");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 10, 10);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [7, 6], [7, 29]]]]], [], 0, 1, ["loc", [null, [7, 0], [28, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/info", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/info.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "info-form", [], ["info", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 17], [1, 22]]]]], [], []], "triggerSave", ["subexpr", "action", ["save"], [], ["loc", [null, [1, 35], [1, 50]]]], "errorMessage", ["subexpr", "@mut", [["get", "errorMessage", ["loc", [null, [1, 64], [1, 76]]]]], [], []]], ["loc", [null, [1, 0], [1, 78]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/instruction", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "game/templates/instruction.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Back\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 7,
              "column": 2
            }
          },
          "moduleName": "game/templates/instruction.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "game/templates/instruction.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        dom.setAttribute(el1, "id", "about");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "id", "consent-title");
        var el3 = dom.createTextNode("Instruction");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nCodeReadingDojo is a new educationally-oriented mobile game application, aimed at promoting the development of code reading skills in a new and fun way.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  The strategy of this game is to find errors in pieces of Java codes.\n  At each level, players should find syntactic and semantic errors in the code in a certain time in order to advance to the next level.\n  To find the errors in the code, simply mark mistakes by touch.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  There are 18 levels overall. As players go futher in the game the level difficulty will be increased and there will be more errors to find.\n");
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
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 2, 2);
        return morphs;
      },
      statements: [["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back", "tagName", "button"], 0, null, ["loc", [null, [2, 2], [4, 14]]]], ["block", "link-to", ["new"], [], 1, null, ["loc", [null, [5, 2], [7, 14]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
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
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 14
            },
            "end": {
              "line": 21,
              "column": 14
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
          var el1 = dom.createTextNode("                Sign Up\n");
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
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
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "jumbotron text-center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "id", "index-title");
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
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "form-horizontal form-group form-group-lg row");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "signin-container");
        dom.setAttribute(el3, "class", "col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-4 col-md-offset-4");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "user-pass");
        var el6 = dom.createTextNode("Email:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "user-pass");
        var el6 = dom.createTextNode("password:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "id", "index-button");
        dom.setAttribute(el5, "class", "btn btn-primary btn-lg btn-block");
        dom.setAttribute(el5, "type", "submit");
        var el6 = dom.createTextNode("Login");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [7, 1, 1]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createElementMorph(element1);
        morphs[3] = dom.createMorphAt(element1, 3, 3);
        morphs[4] = dom.createMorphAt(element1, 7, 7);
        morphs[5] = dom.createMorphAt(element1, 11, 11);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "ember-notify", [], ["messageStyle", "bootstrap", "classPrefix", "custom-notify"], ["loc", [null, [1, 0], [1, 69]]]], ["block", "link-to", ["new"], [], 0, null, ["loc", [null, [4, 2], [6, 14]]]], ["element", "action", ["authenticate"], ["on", "submit"], ["loc", [null, [11, 18], [11, 55]]]], ["inline", "input", [], ["type", "email", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [13, 41], [13, 46]]]]], [], []], "class", "form-control", "placeholder", "Email", "autofocus", "autofocus"], ["loc", [null, [13, 14], [13, 111]]]], ["inline", "input", [], ["type", "password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [16, 44], [16, 52]]]]], [], []], "class", "form-control", "placeholder", "Password", "autofocus", "autofocus"], ["loc", [null, [16, 14], [16, 120]]]], ["block", "link-to", ["signup"], ["id", "signup-login"], 1, null, ["loc", [null, [19, 14], [21, 26]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/navbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 10,
              "column": 55
            }
          },
          "moduleName": "game/templates/navbar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Game App");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 12
            },
            "end": {
              "line": 15,
              "column": 64
            }
          },
          "moduleName": "game/templates/navbar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "href", "");
          var el2 = dom.createTextNode("Home");
          dom.appendChild(el1, el2);
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
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 14
            },
            "end": {
              "line": 16,
              "column": 68
            }
          },
          "moduleName": "game/templates/navbar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "href", "");
          var el2 = dom.createTextNode("New Game");
          dom.appendChild(el1, el2);
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
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 12
            },
            "end": {
              "line": 17,
              "column": 65
            }
          },
          "moduleName": "game/templates/navbar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "href", "");
          var el2 = dom.createTextNode("About");
          dom.appendChild(el1, el2);
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
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 12
            },
            "end": {
              "line": 18,
              "column": 69
            }
          },
          "moduleName": "game/templates/navbar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "href", "");
          var el2 = dom.createTextNode("Contact");
          dom.appendChild(el1, el2);
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
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "game/templates/navbar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "navbar navbar-inverse");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "navbar-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "navbar-toggle collapsed");
        dom.setAttribute(el4, "data-toggle", "collapse");
        dom.setAttribute(el4, "data-target", "#main-navbar");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "collapse navbar-collapse");
        dom.setAttribute(el3, "id", "main-navbar");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "nav navbar-nav");
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.navbar-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /.container-fluid ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 3, 3);
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(element1, 5, 5);
        morphs[4] = dom.createMorphAt(element1, 7, 7);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["class", "navbar-brand"], 0, null, ["loc", [null, [10, 6], [10, 67]]]], ["block", "link-to", ["index"], ["tagName", "li"], 1, null, ["loc", [null, [15, 12], [15, 76]]]], ["block", "link-to", ["new"], ["tagName", "li"], 2, null, ["loc", [null, [16, 14], [16, 80]]]], ["block", "link-to", ["about"], ["tagName", "li"], 3, null, ["loc", [null, [17, 12], [17, 77]]]], ["block", "link-to", ["contact"], ["tagName", "li"], 4, null, ["loc", [null, [18, 12], [18, 81]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("game/templates/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 9,
              "column": 2
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
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Logged in as ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" <button onclick={{action 'login'}}>Login</button> ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "session.data.email", ["loc", [null, [6, 20], [6, 42]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 2
            },
            "end": {
              "line": 16,
              "column": 2
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
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 0
            },
            "end": {
              "line": 20,
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
          var el1 = dom.createTextNode("  Instruction\n");
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
    var child3 = (function () {
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
                    "line": 27,
                    "column": 10
                  },
                  "end": {
                    "line": 29,
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
                dom.setAttribute(el1, "class", "item-completed");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element6 = dom.childAt(fragment, [1]);
                var morphs = new Array(2);
                morphs[0] = dom.createAttrMorph(element6, 'id');
                morphs[1] = dom.createAttrMorph(element6, 'src');
                return morphs;
              },
              statements: [["attribute", "id", ["get", "p.level", ["loc", [null, [28, 45], [28, 52]]]]], ["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "p.level", ["loc", [null, [28, 102], [28, 109]]]]], [], ["loc", [null, [28, 68], [28, 110]]]], ".png"], [], ["loc", [null, [28, 59], [28, 119]]]]]],
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
                  "line": 26,
                  "column": 8
                },
                "end": {
                  "line": 30,
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
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "link-to", ["programs", ["get", "p.level", ["loc", [null, [27, 32], [27, 39]]]]], ["class", "item-completed"], 0, null, ["loc", [null, [27, 10], [29, 22]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 31,
                    "column": 10
                  },
                  "end": {
                    "line": 33,
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
                dom.setAttribute(el1, "class", "item-notcompleted");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element5 = dom.childAt(fragment, [1]);
                var morphs = new Array(2);
                morphs[0] = dom.createAttrMorph(element5, 'id');
                morphs[1] = dom.createAttrMorph(element5, 'src');
                return morphs;
              },
              statements: [["attribute", "id", ["get", "p.level", ["loc", [null, [32, 48], [32, 55]]]]], ["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "p.level", ["loc", [null, [32, 105], [32, 112]]]]], [], ["loc", [null, [32, 71], [32, 113]]]], ".png"], [], ["loc", [null, [32, 62], [32, 122]]]]]],
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
                  "line": 30,
                  "column": 8
                },
                "end": {
                  "line": 34,
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
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "link-to", ["programs", ["get", "p.level", ["loc", [null, [31, 32], [31, 39]]]]], ["class", "item-notcompleted"], 0, null, ["loc", [null, [31, 10], [33, 22]]]]],
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
                "line": 25,
                "column": 8
              },
              "end": {
                "line": 35,
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
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "gt", [["get", "session.data.level", ["loc", [null, [26, 18], [26, 36]]]], ["get", "p.level", ["loc", [null, [26, 37], [26, 44]]]]], [], ["loc", [null, [26, 14], [26, 45]]]]], [], 0, 1, ["loc", [null, [26, 8], [34, 15]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 6
            },
            "end": {
              "line": 36,
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "eq", [["get", "p.difficulty", ["loc", [null, [25, 18], [25, 30]]]], "beginner"], [], ["loc", [null, [25, 14], [25, 42]]]]], [], 0, null, ["loc", [null, [25, 8], [35, 15]]]]],
        locals: ["p"],
        templates: [child0]
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 40,
                "column": 8
              },
              "end": {
                "line": 42,
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
            var el1 = dom.createTextNode("          Survey\n");
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
              "line": 39,
              "column": 6
            },
            "end": {
              "line": 43,
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
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["survey"], ["class", "btn btn-primary survey-completed", "id", "survey"], 0, null, ["loc", [null, [40, 8], [42, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child5 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 44,
                "column": 8
              },
              "end": {
                "line": 46,
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
            var el1 = dom.createTextNode("          Survey\n");
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
              "line": 43,
              "column": 8
            },
            "end": {
              "line": 47,
              "column": 6
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
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["survey"], ["class", "btn btn-primary survey-notcompleted", "id", "survey"], 0, null, ["loc", [null, [44, 8], [46, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child6 = (function () {
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
                      "line": 54,
                      "column": 14
                    },
                    "end": {
                      "line": 56,
                      "column": 14
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
                  var el1 = dom.createTextNode("                ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("img");
                  dom.setAttribute(el1, "class", "item-completed");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element4 = dom.childAt(fragment, [1]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createAttrMorph(element4, 'id');
                  morphs[1] = dom.createAttrMorph(element4, 'src');
                  return morphs;
                },
                statements: [["attribute", "id", ["get", "p.level", ["loc", [null, [55, 49], [55, 56]]]]], ["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "p.level", ["loc", [null, [55, 106], [55, 113]]]]], [], ["loc", [null, [55, 72], [55, 114]]]], ".png"], [], ["loc", [null, [55, 63], [55, 123]]]]]],
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
                    "line": 53,
                    "column": 12
                  },
                  "end": {
                    "line": 57,
                    "column": 12
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
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["block", "link-to", ["programs", ["get", "p.level", ["loc", [null, [54, 36], [54, 43]]]]], ["class", "item-completed"], 0, null, ["loc", [null, [54, 14], [56, 26]]]]],
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
                  "line": 52,
                  "column": 10
                },
                "end": {
                  "line": 58,
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
            statements: [["block", "if", [["subexpr", "gt", ["9", ["get", "p.level", ["loc", [null, [53, 26], [53, 33]]]]], [], ["loc", [null, [53, 18], [53, 34]]]]], [], 0, null, ["loc", [null, [53, 12], [57, 19]]]]],
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
                "line": 51,
                "column": 8
              },
              "end": {
                "line": 59,
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
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "gt", [["get", "session.data.level", ["loc", [null, [52, 20], [52, 38]]]], ["get", "p.level", ["loc", [null, [52, 39], [52, 46]]]]], [], ["loc", [null, [52, 16], [52, 47]]]]], [], 0, null, ["loc", [null, [52, 10], [58, 17]]]]],
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
              "line": 50,
              "column": 6
            },
            "end": {
              "line": 60,
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "eq", [["get", "p.difficulty", ["loc", [null, [51, 18], [51, 30]]]], "intermediate"], [], ["loc", [null, [51, 14], [51, 46]]]]], [], 0, null, ["loc", [null, [51, 8], [59, 15]]]]],
        locals: ["p"],
        templates: [child0]
      };
    })();
    var child7 = (function () {
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
                      "line": 66,
                      "column": 14
                    },
                    "end": {
                      "line": 68,
                      "column": 14
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
                  var el1 = dom.createTextNode("                ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("img");
                  dom.setAttribute(el1, "class", "item-completed");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element3 = dom.childAt(fragment, [1]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createAttrMorph(element3, 'id');
                  morphs[1] = dom.createAttrMorph(element3, 'src');
                  return morphs;
                },
                statements: [["attribute", "id", ["get", "p.level", ["loc", [null, [67, 49], [67, 56]]]]], ["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "p.level", ["loc", [null, [67, 106], [67, 113]]]]], [], ["loc", [null, [67, 72], [67, 114]]]], ".png"], [], ["loc", [null, [67, 63], [67, 123]]]]]],
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
                    "line": 64,
                    "column": 12
                  },
                  "end": {
                    "line": 69,
                    "column": 12
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
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["block", "link-to", ["programs", ["get", "p.level", ["loc", [null, [66, 36], [66, 43]]]]], ["class", "item-completed"], 0, null, ["loc", [null, [66, 14], [68, 26]]]]],
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
                  "line": 63,
                  "column": 10
                },
                "end": {
                  "line": 70,
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
            statements: [["block", "if", [["subexpr", "gt", [["get", "p.level", ["loc", [null, [64, 22], [64, 29]]]], "10"], [], ["loc", [null, [64, 18], [64, 35]]]]], [], 0, null, ["loc", [null, [64, 12], [69, 19]]]]],
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
                "line": 62,
                "column": 8
              },
              "end": {
                "line": 71,
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
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "gt", [["get", "session.data.level", ["loc", [null, [63, 20], [63, 38]]]], ["get", "p.level", ["loc", [null, [63, 39], [63, 46]]]]], [], ["loc", [null, [63, 16], [63, 47]]]]], [], 0, null, ["loc", [null, [63, 10], [70, 17]]]]],
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
              "line": 61,
              "column": 6
            },
            "end": {
              "line": 72,
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "eq", [["get", "p.difficulty", ["loc", [null, [62, 18], [62, 30]]]], "intermediate"], [], ["loc", [null, [62, 14], [62, 46]]]]], [], 0, null, ["loc", [null, [62, 8], [71, 15]]]]],
        locals: ["p"],
        templates: [child0]
      };
    })();
    var child8 = (function () {
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
                    "line": 78,
                    "column": 12
                  },
                  "end": {
                    "line": 80,
                    "column": 12
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
                dom.setAttribute(el1, "class", "item-notcompleted");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element2 = dom.childAt(fragment, [1]);
                var morphs = new Array(2);
                morphs[0] = dom.createAttrMorph(element2, 'id');
                morphs[1] = dom.createAttrMorph(element2, 'src');
                return morphs;
              },
              statements: [["attribute", "id", ["get", "p.level", ["loc", [null, [79, 50], [79, 57]]]]], ["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "p.level", ["loc", [null, [79, 107], [79, 114]]]]], [], ["loc", [null, [79, 73], [79, 115]]]], ".png"], [], ["loc", [null, [79, 64], [79, 124]]]]]],
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
                  "line": 77,
                  "column": 10
                },
                "end": {
                  "line": 81,
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
            statements: [["block", "link-to", ["programs", ["get", "p.level", ["loc", [null, [78, 34], [78, 41]]]]], ["class", "item-notcompleted"], 0, null, ["loc", [null, [78, 12], [80, 24]]]]],
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
                "line": 76,
                "column": 8
              },
              "end": {
                "line": 82,
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
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "gt", [["get", "p.level", ["loc", [null, [77, 20], [77, 27]]]], ["subexpr", "add", [["get", "session.data.level", ["loc", [null, [77, 33], [77, 51]]]], "1"], [], ["loc", [null, [77, 28], [77, 56]]]]], [], ["loc", [null, [77, 16], [77, 57]]]]], [], 0, null, ["loc", [null, [77, 10], [81, 17]]]]],
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
              "line": 75,
              "column": 6
            },
            "end": {
              "line": 83,
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "eq", [["get", "p.difficulty", ["loc", [null, [76, 18], [76, 30]]]], "intermediate"], [], ["loc", [null, [76, 14], [76, 46]]]]], [], 0, null, ["loc", [null, [76, 8], [82, 15]]]]],
        locals: ["p"],
        templates: [child0]
      };
    })();
    var child9 = (function () {
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
                    "line": 88,
                    "column": 12
                  },
                  "end": {
                    "line": 90,
                    "column": 12
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
                var el1 = dom.createTextNode("                ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("img");
                dom.setAttribute(el1, "class", "item-completed");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element1 = dom.childAt(fragment, [1]);
                var morphs = new Array(2);
                morphs[0] = dom.createAttrMorph(element1, 'id');
                morphs[1] = dom.createAttrMorph(element1, 'src');
                return morphs;
              },
              statements: [["attribute", "id", ["get", "p.level", ["loc", [null, [89, 49], [89, 56]]]]], ["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "p.level", ["loc", [null, [89, 106], [89, 113]]]]], [], ["loc", [null, [89, 72], [89, 114]]]], ".png"], [], ["loc", [null, [89, 63], [89, 123]]]]]],
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
                  "line": 87,
                  "column": 10
                },
                "end": {
                  "line": 91,
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
            statements: [["block", "link-to", ["programs", ["get", "p.level", ["loc", [null, [88, 34], [88, 41]]]]], ["class", "item-completed"], 0, null, ["loc", [null, [88, 12], [90, 24]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 92,
                    "column": 12
                  },
                  "end": {
                    "line": 94,
                    "column": 12
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
                var el1 = dom.createTextNode("                ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("img");
                dom.setAttribute(el1, "class", "item-notcompleted");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element0 = dom.childAt(fragment, [1]);
                var morphs = new Array(2);
                morphs[0] = dom.createAttrMorph(element0, 'id');
                morphs[1] = dom.createAttrMorph(element0, 'src');
                return morphs;
              },
              statements: [["attribute", "id", ["get", "p.level", ["loc", [null, [93, 52], [93, 59]]]]], ["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "p.level", ["loc", [null, [93, 109], [93, 116]]]]], [], ["loc", [null, [93, 75], [93, 117]]]], ".png"], [], ["loc", [null, [93, 66], [93, 126]]]]]],
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
                  "line": 91,
                  "column": 10
                },
                "end": {
                  "line": 95,
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
            statements: [["block", "link-to", ["programs", ["get", "p.level", ["loc", [null, [92, 34], [92, 41]]]]], ["class", "item-notcompleted"], 0, null, ["loc", [null, [92, 12], [94, 24]]]]],
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
                "line": 86,
                "column": 8
              },
              "end": {
                "line": 96,
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
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "gt", [["get", "session.data.level", ["loc", [null, [87, 20], [87, 38]]]], ["get", "p.level", ["loc", [null, [87, 39], [87, 46]]]]], [], ["loc", [null, [87, 16], [87, 47]]]]], [], 0, 1, ["loc", [null, [87, 10], [95, 17]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 85,
              "column": 6
            },
            "end": {
              "line": 97,
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "eq", [["get", "p.difficulty", ["loc", [null, [86, 18], [86, 30]]]], "advanced"], [], ["loc", [null, [86, 14], [86, 42]]]]], [], 0, null, ["loc", [null, [86, 8], [96, 15]]]]],
        locals: ["p"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 102,
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
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" {{#link-to 'index' classNames='navbar-brand'}}\n    Home\n  {{/link-to}} ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "jumbotron text-center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Select an excercise you want to play");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "form-horizontal form-group form-group-lg row");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "levels");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
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
        var element7 = dom.childAt(fragment, [2]);
        var element8 = dom.childAt(element7, [6, 1]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 3, 3);
        morphs[1] = dom.createMorphAt(element7, 1, 1);
        morphs[2] = dom.createMorphAt(element7, 4, 4);
        morphs[3] = dom.createMorphAt(element8, 1, 1);
        morphs[4] = dom.createMorphAt(element8, 3, 3);
        morphs[5] = dom.createMorphAt(element8, 5, 5);
        morphs[6] = dom.createMorphAt(element8, 6, 6);
        morphs[7] = dom.createMorphAt(element8, 8, 8);
        morphs[8] = dom.createMorphAt(element8, 10, 10);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [5, 8], [5, 31]]]]], [], 0, null, ["loc", [null, [5, 2], [9, 9]]]], ["block", "link-to", ["new"], [], 1, null, ["loc", [null, [14, 2], [16, 14]]]], ["block", "link-to", ["instruction"], ["id", "skip-ready"], 2, null, ["loc", [null, [18, 0], [20, 12]]]], ["block", "each", [["get", "model", ["loc", [null, [24, 14], [24, 19]]]]], [], 3, null, ["loc", [null, [24, 6], [36, 15]]]], ["block", "if", [["subexpr", "gt", [["get", "session.data.level", ["loc", [null, [39, 16], [39, 34]]]], 6], [], ["loc", [null, [39, 12], [39, 37]]]]], [], 4, 5, ["loc", [null, [39, 6], [47, 13]]]], ["block", "each", [["get", "model", ["loc", [null, [50, 14], [50, 19]]]]], [], 6, null, ["loc", [null, [50, 6], [60, 15]]]], ["block", "each", [["get", "model", ["loc", [null, [61, 14], [61, 19]]]]], [], 7, null, ["loc", [null, [61, 6], [72, 15]]]], ["block", "each", [["get", "model", ["loc", [null, [75, 14], [75, 19]]]]], [], 8, null, ["loc", [null, [75, 6], [83, 15]]]], ["block", "each", [["get", "model", ["loc", [null, [85, 14], [85, 19]]]]], [], 9, null, ["loc", [null, [85, 6], [97, 15]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9]
    };
  })());
});
define("game/templates/practice", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 12
            },
            "end": {
              "line": 7,
              "column": 90
            }
          },
          "moduleName": "game/templates/practice.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Beginners");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 12
            },
            "end": {
              "line": 8,
              "column": 96
            }
          },
          "moduleName": "game/templates/practice.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Intermediates");
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
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 12
            },
            "end": {
              "line": 9,
              "column": 89
            }
          },
          "moduleName": "game/templates/practice.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Advancedes");
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
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "game/templates/practice.hbs"
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
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Please select difficulty");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "form-horizontal form-group form-group-lg row");
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-10 col-xs-offset-1 col-sm-offset-4 col-sm-4 col-md-4");
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
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
        var element0 = dom.childAt(fragment, [0, 3, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        return morphs;
      },
      statements: [["block", "link-to", ["beginner", "1"], ["class", "btn btn-primary btn-lg btn-block"], 0, null, ["loc", [null, [7, 12], [7, 102]]]], ["block", "link-to", ["intermediate", 1], ["class", "btn btn-primary btn-lg btn-block"], 1, null, ["loc", [null, [8, 12], [8, 108]]]], ["block", "link-to", ["advanced", 1], ["class", "btn btn-primary btn-lg btn-block"], 2, null, ["loc", [null, [9, 12], [9, 101]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/privacy", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "game/templates/privacy.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Back\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 2
            },
            "end": {
              "line": 8,
              "column": 2
            }
          },
          "moduleName": "game/templates/privacy.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "game/templates/privacy.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        dom.setAttribute(el1, "id", "about");
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "id", "consent-title");
        var el3 = dom.createTextNode("Privacy Statement");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n Our privacy statement can be found here:\n ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        dom.setAttribute(el3, "id", "privacy-link");
        var el4 = dom.createTextNode("http://codereadingdojo.cs.vt.edu/static_pages/privacy");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 2, 2);
        return morphs;
      },
      statements: [["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back", "tagName", "button"], 0, null, ["loc", [null, [3, 2], [5, 14]]]], ["block", "link-to", ["new"], [], 1, null, ["loc", [null, [6, 2], [8, 14]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("game/templates/profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 6,
              "column": 4
            }
          },
          "moduleName": "game/templates/profile.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      Back to Menu\n");
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
    var child1 = (function () {
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
                    "line": 27,
                    "column": 6
                  },
                  "end": {
                    "line": 29,
                    "column": 6
                  }
                },
                "moduleName": "game/templates/profile.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("i");
                dom.setAttribute(el1, "class", "material-icons");
                var el2 = dom.createTextNode("mode_edit");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
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
                  "column": 8
                },
                "end": {
                  "line": 33,
                  "column": 2
                }
              },
              "moduleName": "game/templates/profile.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("    ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("table");
              dom.setAttribute(el1, "class", "table");
              var el2 = dom.createTextNode("\n      ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("tbody");
              var el3 = dom.createTextNode("\n        ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("tr");
              var el4 = dom.createTextNode("\n          ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("th");
              dom.setAttribute(el4, "scope", "row");
              var el5 = dom.createTextNode("Email");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n          ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("td");
              var el5 = dom.createComment("");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n        ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n\n        ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("tr");
              var el4 = dom.createTextNode("\n          ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("th");
              dom.setAttribute(el4, "scope", "row");
              var el5 = dom.createTextNode("Levelcompleted");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n          ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("td");
              var el5 = dom.createComment("");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n        ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n      ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n    ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n       \n    ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("label");
              var el2 = dom.createTextNode("My data can be used for research purposes\n");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("    ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n       \n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(3);
              morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 0, 0);
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 3]), 0, 0);
              morphs[2] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
              return morphs;
            },
            statements: [["content", "user.email", ["loc", [null, [15, 14], [15, 28]]]], ["content", "user.levelcompleted", ["loc", [null, [20, 14], [20, 37]]]], ["block", "link-to", ["consent"], [], 0, null, ["loc", [null, [27, 6], [29, 18]]]]],
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
                "column": 6
              },
              "end": {
                "line": 34,
                "column": 2
              }
            },
            "moduleName": "game/templates/profile.hbs"
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
          statements: [["block", "if", [["subexpr", "nnull", [["get", "user.password", ["loc", [null, [10, 21], [10, 34]]]]], [], ["loc", [null, [10, 14], [10, 35]]]]], [], 0, null, ["loc", [null, [10, 8], [33, 9]]]]],
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
              "column": 4
            },
            "end": {
              "line": 35,
              "column": 2
            }
          },
          "moduleName": "game/templates/profile.hbs"
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
        statements: [["block", "if", [["subexpr", "eq", [["get", "user.email", ["loc", [null, [9, 16], [9, 26]]]], ["get", "session.data.email", ["loc", [null, [9, 27], [9, 45]]]]], [], ["loc", [null, [9, 12], [9, 46]]]]], [], 0, null, ["loc", [null, [9, 6], [34, 9]]]]],
        locals: ["user"],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 2
            },
            "end": {
              "line": 38,
              "column": 2
            }
          },
          "moduleName": "game/templates/profile.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Complete your Profile\n");
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
            "line": 44,
            "column": 0
          }
        },
        "moduleName": "game/templates/profile.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "id", "contact");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        morphs[2] = dom.createMorphAt(element1, 4, 4);
        return morphs;
      },
      statements: [["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back-button", "tagName", "button"], 0, null, ["loc", [null, [4, 4], [6, 16]]]], ["block", "each", [["get", "model", ["loc", [null, [8, 12], [8, 17]]]]], [], 1, null, ["loc", [null, [8, 4], [35, 11]]]], ["block", "link-to", ["info"], ["tagName", "button", "id", "play"], 2, null, ["loc", [null, [36, 2], [38, 14]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/programs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
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
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "id", "new-logo");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 2
              },
              "end": {
                "line": 15,
                "column": 2
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
            var el1 = dom.createTextNode("  Back to Menu\n");
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
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 16,
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
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n  Mark mistakes by touch.\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n   You need to find at least three errors in the code.\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "id", "confirm-button");
          dom.setAttribute(el1, "class", "btn btn-primary bt-lg");
          var el2 = dom.createTextNode("Ready?");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [5]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(fragment, 7, 7, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["element", "action", ["getCurrentUrl", "clicked"], [], ["loc", [null, [12, 61], [12, 97]]]], ["block", "link-to", ["new"], ["id", "skip-ready"], 0, null, ["loc", [null, [13, 2], [15, 14]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
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
                    "line": 23,
                    "column": 6
                  },
                  "end": {
                    "line": 25,
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
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("img");
                dom.setAttribute(el1, "id", "new-logo");
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
              statements: [["attribute", "src", ["subexpr", "concat", [["subexpr", "concat", ["assets/images/beginner/", ["get", "program.level", ["loc", [null, [24, 74], [24, 87]]]]], [], ["loc", [null, [24, 40], [24, 88]]]], ".png"], [], ["loc", [null, [24, 31], [24, 97]]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 28,
                    "column": 8
                  },
                  "end": {
                    "line": 30,
                    "column": 8
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
                var el1 = dom.createTextNode("          Next Level\n");
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
          var child2 = (function () {
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
                "moduleName": "game/templates/programs.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("            Back to Menu\n");
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
          var child3 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 38,
                    "column": 12
                  },
                  "end": {
                    "line": 40,
                    "column": 12
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
                var el1 = dom.createTextNode("              Next Level\n");
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
                  "line": 21,
                  "column": 6
                },
                "end": {
                  "line": 43,
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
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "next-level-none");
              dom.setAttribute(el1, "id", "next");
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("center");
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("      ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n      ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "next-level-none");
              dom.setAttribute(el1, "id", "next");
              var el2 = dom.createTextNode("\n");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("          ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(5);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3, 1]), 1, 1);
              morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
              morphs[3] = dom.createMorphAt(fragment, 7, 7, contextualElement);
              morphs[4] = dom.createMorphAt(dom.childAt(fragment, [9]), 1, 1);
              return morphs;
            },
            statements: [["block", "link-to", ["new"], [], 0, null, ["loc", [null, [23, 6], [25, 18]]]], ["block", "link-to", ["completed", ["subexpr", "add", [["get", "currentUrl", ["loc", [null, [28, 36], [28, 46]]]], "1"], [], ["loc", [null, [28, 31], [28, 51]]]]], ["tagName", "button", "invokeAction", ["subexpr", "action", ["clicked"], [], ["loc", [null, [28, 82], [28, 100]]]], "class", "btn btn-primary btn-lg", "id", "next-button"], 1, null, ["loc", [null, [28, 8], [30, 20]]]], ["inline", "program-details", [], ["program", ["subexpr", "@mut", [["get", "program", ["loc", [null, [33, 36], [33, 43]]]]], [], []]], ["loc", [null, [33, 10], [33, 45]]]], ["block", "link-to", ["new"], ["class", "btn btn-primary", "id", "back-button", "tagName", "button", "invokeAction", ["subexpr", "action", ["clicked"], [], ["loc", [null, [34, 98], [34, 116]]]]], 2, null, ["loc", [null, [34, 10], [36, 22]]]], ["block", "link-to", ["completed", ["subexpr", "add", [["get", "currentUrl", ["loc", [null, [38, 40], [38, 50]]]], "1"], [], ["loc", [null, [38, 35], [38, 55]]]]], ["tagName", "button", "invokeAction", ["subexpr", "action", ["clicked"], [], ["loc", [null, [38, 86], [38, 104]]]], "class", "btn btn-primary btn-lg", "id", "next-button2"], 3, null, ["loc", [null, [38, 12], [40, 24]]]]],
            locals: [],
            templates: [child0, child1, child2, child3]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.2",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 2
              },
              "end": {
                "line": 44,
                "column": 2
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
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "eq", [["get", "program.level", ["loc", [null, [21, 16], [21, 29]]]], ["get", "currentUrl", ["loc", [null, [21, 30], [21, 40]]]]], [], ["loc", [null, [21, 12], [21, 41]]]]], [], 0, null, ["loc", [null, [21, 6], [43, 11]]]]],
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
              "line": 18,
              "column": 0
            },
            "end": {
              "line": 45,
              "column": 0
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
        statements: [["block", "if", [["subexpr", "eq", [["get", "clicked", ["loc", [null, [19, 12], [19, 19]]]], "true"], [], ["loc", [null, [19, 8], [19, 27]]]]], [], 0, null, ["loc", [null, [19, 2], [44, 9]]]]],
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
            "line": 46,
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
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element2, 1, 1);
        morphs[1] = dom.createMorphAt(element2, 2, 2);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "link-to", ["new"], [], 0, null, ["loc", [null, [2, 2], [4, 14]]]], ["block", "if", [["subexpr", "eq", [["get", "clicked", ["loc", [null, [5, 10], [5, 17]]]], "false"], [], ["loc", [null, [5, 6], [5, 26]]]]], [], 1, null, ["loc", [null, [5, 0], [16, 7]]]], ["block", "each", [["get", "model", ["loc", [null, [18, 8], [18, 13]]]]], [], 2, null, ["loc", [null, [18, 0], [45, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("game/templates/protected", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "game/templates/protected.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("PROTECTED");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/signup", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/signup.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "signup-form", [], ["user", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 19], [1, 24]]]]], [], []], "triggerSave", ["subexpr", "action", ["save"], [], ["loc", [null, [1, 37], [1, 52]]]], "errorMessage", ["subexpr", "@mut", [["get", "errorMessage", ["loc", [null, [1, 66], [1, 78]]]]], [], []]], ["loc", [null, [1, 0], [1, 80]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/survey", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/survey.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "survey-form", [], ["survey", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 21], [1, 26]]]]], [], []], "triggerSave", ["subexpr", "action", ["save"], [], ["loc", [null, [1, 39], [1, 54]]]], "errorMessage", ["subexpr", "@mut", [["get", "errorMessage", ["loc", [null, [1, 68], [1, 80]]]]], [], []]], ["loc", [null, [1, 0], [1, 82]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("game/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "game/templates/users.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('game/config/environment', ['ember'], function(Ember) {
  var prefix = 'game';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("game/app")["default"].create({"name":"game","version":"0.0.0+cb047365"});
}

/* jshint ignore:end */
//# sourceMappingURL=game.map
