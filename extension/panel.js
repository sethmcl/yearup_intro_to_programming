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
      toggleToc(false);
    }
  });

  function run() {
    var code = editor.getValue();
    code = assertEqual.toString() + ';clear();try {' + code + '} catch(e) { console.error(e.message); }';
    chrome.devtools.inspectedWindow.eval(code);
  }

  function toggleToc(bool) {
    $('#toc').toggleClass('hidden', bool);
  }
})();

function assertEqual(actual, expected) {
  var result = (actual === expected);

  if (!result) {
    console.error('Expected', actual, 'to equal', expected);
  }
}
