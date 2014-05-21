(function () {
  var editor = ace.edit('editor');
  editor.on('change', onDocumentChange);
  editor.getSession().setMode('ace/mode/javascript');
  editor.getSession().setTabSize(2);


  load();

  try {
    chrome.devtools.inspectedWindow.eval('window.location.reload()');

    setTimeout(function () {
      chrome.devtools.inspectedWindow.eval(__log.toString());
      chrome.devtools.inspectedWindow.eval(__lineNumber.toString());
    }, 1000);
  } catch (e) {
    console.error(e.stack);
  }

  $(document).on('keydown', function(e) {
    if(e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
      run();
    }

    if(e.keyCode == 190 && (e.metaKey || e.ctrlKey)) {
      toggleToc();
    }

    if (e.keyCode === 27) {
      hideToc();
    }
  });

  $('#reset').click(reset);

  function reset() {
    delete localStorage[window.location.href];
    load();
  }

  function onDocumentChange(e) {
    localStorage[window.location.href] = editor.getSession().getValue();
  }

  function load() {
    var saved = localStorage[window.location.href];
    var code;

    if (saved) {
      code = saved;
    } else {
      code = document.querySelector('#default-code').innerHTML;
    }

    editor.getSession().setValue(code);
  }

  function run() {
    var code = [
        'clear();',
        'try {\n',
        getCode(),
        '} catch(e) { console.error(e.message); };',
        equal.toString(),
        ';',
        deepEqual.toString()
    ].join('');

    chrome.devtools.inspectedWindow.eval(code);
  }

  function __lineNumber() {
    var line = new Error().stack.split('\n')[3].match(/([0-9]+):[0-9]+/)[1] - 2;

    var spaces = new Array(4 - Math.min(3, line.toString().length)).join(' ');

    return '(line ' + line + ')' + spaces;
  }

  function getCode() {
    var code = editor.getValue();

    return code.replace(/console.log\((.*)\)/g, function (match, a) {
      return '__log(' + a + ')';
    });
  }

  function toggleToc() {
    $('#toc').toggleClass('hidden');
  }

  function hideToc() {
    $('#toc').addClass('hidden');
  }
})();

function __log() {
  var args = Array.prototype.slice.call(arguments, 0);
  var line = new Error().stack.split('\n')[2].match(/([0-9]+):[0-9]+/)[1] - 2;

  if (typeof args[0] !== 'undefined') {
    args[0] = '%c' + __lineNumber() + '%c' + args[0];
    args.push('color:blue');
    args.push('color:#000');
  } else {
    args.push('%c' + __lineNumber());
    args.push('color:blue');
  }

  console.log.apply(console, args);
}

function equal(actual, expected) {
  var result = (actual === expected);
  var line = new Error().stack.split('\n')[2].match(/([0-9]+):[0-9]+/)[1] - 2;

  if (!result) {
    console.log('%c' + __lineNumber() + '%s !== %s', 'color:red', actual, expected);
  } else {
    console.log('%c' + __lineNumber() + '%s === %s', 'color:green', actual, expected);
  }
}

function deepEqual(actual, expected) {
  var result = deepCompare(actual, expected);
  var line = new Error().stack.split('\n')[2].match(/([0-9]+):[0-9]+/)[1] - 2;
  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);

  if (!result) {
    console.log('%c' + __lineNumber() + '%s does not equal %s', 'color: red', actualJSON, expectedJSON);
  } else {
    console.log('%c' + __lineNumber() + '%s equals %s', 'color:green', actualJSON, expectedJSON);
  }

  function deepCompare () {
    var leftChain, rightChain;

    function compare2Objects (x, y) {
      var p;

      // remember that NaN === NaN returns false
      // and isNaN(undefined) returns true
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
           return true;
      }

      // Compare primitives and functions.
      // Check if both arguments link to the same object.
      // Especially useful on step when comparing prototypes
      if (x === y) {
          return true;
      }

      // Works in case when functions are created in constructor.
      // Comparing dates is a common scenario. Another built-ins?
      // We can even handle functions passed across iframes
      if ((typeof x === 'function' && typeof y === 'function') ||
         (x instanceof Date && y instanceof Date) ||
         (x instanceof RegExp && y instanceof RegExp) ||
         (x instanceof String && y instanceof String) ||
         (x instanceof Number && y instanceof Number)) {
          return x.toString() === y.toString();
      }

      // At last checking prototypes as good a we can
      if (!(x instanceof Object && y instanceof Object)) {
          return false;
      }

      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
          return false;
      }

      if (x.constructor !== y.constructor) {
          return false;
      }

      if (x.prototype !== y.prototype) {
          return false;
      }

      // check for infinitive linking loops
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
           return false;
      }

      // Quick checking of one object beeing a subset of another.
      // todo: cache the structure of arguments[0] for performance
      for (p in y) {
          if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
              return false;
          }
          else if (typeof y[p] !== typeof x[p]) {
              return false;
          }
      }

      for (p in x) {
          if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
              return false;
          }
          else if (typeof y[p] !== typeof x[p]) {
              return false;
          }

          switch (typeof (x[p])) {
              case 'object':
              case 'function':

                  leftChain.push(x);
                  rightChain.push(y);

                  if (!compare2Objects (x[p], y[p])) {
                      return false;
                  }

                  leftChain.pop();
                  rightChain.pop();
                  break;

              default:
                  if (x[p] !== y[p]) {
                      return false;
                  }
                  break;
          }
      }

      return true;
    }

    if (arguments.length < 1) {
      return true; //Die silently? Don't know how to handle such case, please help...
      // throw "Need two or more arguments to compare";
    }

    for (var i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
  }
}
