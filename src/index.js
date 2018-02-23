var marked = require('marked');
var fs = require('fs');
var path = require('path');

const manPagesPath = path.join('vendor', 'tldr', 'pages', 'common');;

const platforms = [
  { id: 0, name: 'generic', directory: 'common' },
  { id: 1, name: 'linux', directory: 'linux' },
  { id: 2, name: 'osx', directory: 'osx' },
  { id: 3, name: 'windows', directory: 'windows' }
];

platforms.
fs.readdir(manPagesPath, (error, items) => {
    fs.readFile(path.join(manPagesPath, 'ansible.md'), 'utf8', (error, data) => {
      var tokens = marked.lexer(data);
      tokens = tokens.filter((token, idx) => {
        if (token.type === 'heading' || token.type === 'text' || token.type === 'paragraph')
          return true;
        else
          return false;
      })
      console.log(tokens);
    });
});