(function () {
  var editor = ace.edit('editor');
  editor.getSession().setMode('ace/mode/javascript');
  editor.getSession().setTabSize(2);

  try {
    chrome.devtools.inspectedWindow.eval('window.location.reload()');
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

  function run() {
    var code = [
        'clear();',
        'try {\n',
        editor.getValue(),
        '} catch(e) { console.error(e.message); };',
        equal.toString(),
        ';',
        deepEqual.toString()
    ].join('');

    chrome.devtools.inspectedWindow.eval(code);
  }

  function toggleToc() {
    $('#toc').toggleClass('hidden');
  }

  function hideToc() {
    $('#toc').addClass('hidden');
  }
})();

function equal(actual, expected) {
  var result = (actual === expected);
  var line = new Error().stack.split('\n')[2].match(/([0-9]+):[0-9]+/)[1] - 2;

  if (!result) {
    console.error('(line ' + line + ') Expected', actual, '===', expected);
  } else {
    console.log('%c(line %s) %s === %s', 'color:green', line, actual, expected);
  }
}

function deepEqual(actual, expected) {
  var result = deepCompare(actual, expected);
  var line = new Error().stack.split('\n')[2].match(/([0-9]+):[0-9]+/)[1] - 2;
  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);

  if (!result) {
    console.error('(line ' + line + ') Expected', actualJSON, 'to equal', expectedJSON);
  } else {
    console.log('%c(line %s) %s equals %s', 'color:green', line, actualJSON, expectedJSON);
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
