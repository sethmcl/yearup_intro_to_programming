var fs       = require('fs');
var path     = require('path');
var rimraf   = require('rimraf');
var ncp      = require('ncp').ncp;
var q        = require('q');
var mkdirp   = require('mkdirp');
var mustache = require('mustache');
var watch    = require('watch');
var clone    = require('clone');

process.env.DEBUG     = '*';
var debug             = require('debug')('BUILD');
var examplesPath      = path.resolve(__dirname, 'extension', 'examples');
var examplesBuildPath = path.resolve(__dirname, 'build', 'extension', 'examples');

function loadExamples() {
  return fs.readdirSync(examplesPath).map(function (file) {
    var ex = require(path.resolve(examplesPath, file));
    ex.id  = parseInt(file.match(/[0-9]+/)[0]);

    return {
      id: ex.id,
      filename: ex.id + '.html',
      filepath: path.resolve(examplesBuildPath, ex.id + '.html'),
      label: ex.id + '. ' + ex.title,
      code: fnBody(ex.example),
      children: ex.puzzles.map(function (puz, idx) {
        return {
          filename: [ex.id, String.fromCharCode(97 + idx), '.html'].join(''),
          filepath: path.resolve(examplesBuildPath, [ex.id, String.fromCharCode(97 + idx), '.html'].join('')),
          label: [ex.id, String.fromCharCode(65 + idx)].join('-'),
          code: fnBody(puz)
        };
      })
    };
  })
  .sort(function (a, b) {
    return a.id - b.id;
  });
}

function writeFiles(examples) {
  var template = fs.readFileSync(path.resolve(__dirname, 'extension', 'panel.tl')).toString();

  return copyBase().then(function () {
    examples.forEach(function (ex) {
      writeExample(ex, examples, template);
    });
  });
}

function fnBody(fn) {
  var raw = fn.toString();
  var code = raw.substring(raw.indexOf('{') + 1, raw.lastIndexOf('}')).split('\n').slice(1);

  var indent = code[0].match(/^\s*/)[0].length;

  code = code.map(function (line) {
    return line.slice(indent);
  });

  return code.join('\n');
}

function copyBase() {
  var src  = path.resolve(__dirname, 'extension');
  var dest = path.resolve(__dirname, 'build', 'extension');
  var def  = q.defer();

  mkdirp.sync(dest);

  ncp(src, dest, function (err) {
    if (err) {
      def.reject(err);
    } else {
      def.resolve();
    }
  });

  return def.promise;
}

function writeExample(data, examples, template) {
  writeHtml(data, examples, template);

  data.children.forEach(function (d) {
    writeHtml(d, examples, template);
  });

}

function writeHtml(data, examples, template) {
  var list = clone(examples).map(function (ex) {
    if (data.filename === ex.filename) {
      ex.selected = true;
    }

    ex.children = ex.children.map(function (child) {
      if (data.filename === child.filename) {
        child.childSelected = true;
      }

      return child;
    });

    return ex;
  });

  var contents = mustache.render(template, { data: data, examples: list });

  debug('writing file', data.filepath);
  fs.writeFileSync(data.filepath, contents);

}

function clean() {
  rimraf.sync(path.resolve(__dirname, 'build'));
}

function build() {
  debug('Building project');
  clean();
  writeFiles(loadExamples()).then(function () {
    debug('Success!');
  }, function (err) {
    debug(err);
  });
}

// ----------------------------------------------------------------------------
if (process.argv[2] === 'watch') {
  watch.watchTree(path.resolve(__dirname, 'extension'), function () {
    build();
  });
} else {
  build();
}

