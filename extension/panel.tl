<!DOCTYPE html>
<html>
<head>
  <title>{{exercise}}</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="../panel.css" type="text/css">
</head>
<body>
  <div id="editor">{{data.code}}</div>
  {{calc}}
  <ol id="toc" class="hidden">
    {{#examples}}
      <li class="parent">
        <a href="{{filename}}"{{#selected}} class="selected"{{/selected}}>{{label}}</a>
        <ul>
          {{#children}}
            <li class="child">
              <a href="{{filename}}" class="{{#childSelected}}selected {{/childSelected}}puzzle">{{label}}</a>
            </li>
          {{/children}}
        </ul>
      </li>
    {{/examples}}
  </ol>

  <script src="../lib/jquery-1.11.1.min.js"></script>
  <script src="../lib/ace/ace.js"></script>
  <script src="../panel.js"></script>
</body>
</html>
