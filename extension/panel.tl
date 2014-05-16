<!DOCTYPE html>
<html>
<head>
  <title>{{exercise}}</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="../panel.css" type="text/css">
</head>
<body>
  <script id="default-code" type="code/template">{{{data.code}}}</script>
  <button id="reset">reset</button>
  <div id="editor"></div>
  {{calc}}
  <ol id="toc" class="hidden">
    {{#examples}}
      <li class="parent">
        <a href="{{filename}}"{{#selected}} class="selected"{{/selected}}>{{label}}</a>
        {{#children}}
         <a href="{{filename}}" class="{{#childSelected}}selected {{/childSelected}}puzzle">{{label}}</a>
        {{/children}}
      </li>
    {{/examples}}
  </ol>

  <script src="../lib/jquery-1.11.1.min.js"></script>
  <script src="../lib/ace/ace.js"></script>
  <script src="../panel.js"></script>
</body>
</html>
