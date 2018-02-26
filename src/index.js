const marked = require('marked');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');

const pagesPath = path.join('vendor', 'tldr', 'pages');
const platforms = [
  { id: 1, name: 'generic', directory: 'common',  },
  { id: 2, name: 'linux', directory: 'linux' },
  { id: 3, name: 'osx', directory: 'osx' },
  { id: 4, name: 'windows', directory: 'windows' }
];

const findPages = () => {
  const promises = [];
  platforms.forEach((platform) => {
    const p = new Promise((resolve, reject) => {
      fs.readdir(path.join(pagesPath, platform.directory), (err, files) => {
        if (err) reject(err);
        const pages = files.map(file => ({
          platformId: platform.id,
          name: file.substr(0, file.indexOf('.')),
          file,
          path: path.join(pagesPath, platform.directory),
        }));
        resolve(pages);
      });
    });
    promises.push(p);
  });
  return Promise.all(promises).then((platformPages) => {
    return platformPages.reduce((prev, curr) => {
      return prev.concat(curr);
    });
  }, (error) => {
    console.log(error);
  }).catch(() => {
    console.log('Error');
  });
}

const readPages = async (pages) => {
  const promises = [];
  pages.forEach((page) => {
    const p = new Promise((resolve, reject) => {
      fs.readFile(path.join(page.path, page.file), 'utf8', (err, data) => {
        if (err) reject(err);
        resolve({ ...page, contents: data });
      });
    });
    promises.push(p);
  });
  return Promise.all(promises).then((readFiles) => {
    return readFiles;
  }, (error) => {
    console.log(error);
  }).catch(() => {
    console.log('error');
  });
};

const parsePages = (pages) => {
  return pages.map((page) => {
    const lexer = new marked.Lexer();
    let tokens = lexer.lex(page.contents);
    tokens = tokens.filter(token => token.type === 'heading' || token.type === 'paragraph' || token.type === 'text');
    return {
      ...page,
      tokens,
    };
  });
};


const getPrograms = (pages) => {
  return pages.map((page, idx) => {
    const cliName = _.chain(page.tokens)
      .find({ type: 'heading' })
      .pick('text')
      .value()
      .text;
    return {
      id: idx + 1,
      cliName,
      name: page.name,
      platformId: page.platformId,
    };
  });
};

/*
const getCommands = (programs) => {

}
*/

const process = async () => {
  let pages = await findPages();
  pages = await readPages(pages);
  pages = parsePages(pages);
  let programs = getPrograms(pages);
  console.log(programs);
}

process();
