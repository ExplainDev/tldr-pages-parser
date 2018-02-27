const fs = require('fs');
const path = require('path');
const marked = require('marked');

const findPages = (pagesPath, platforms) => {
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
  return Promise.all(promises).then(
    platformPages => _.flatten(platformPages)
      .map((platformPage, idx) => ({ ...platformPage, id: idx + 1 }))
    , (error) => {
      console.log(error);
    },
  ).catch(() => {
    console.log('Error');
  });
};

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
    console.error(error);
  }).catch(() => {
    console.error('error');
  });
};

const parsePages = pages => pages.map((page) => {
  const lexer = new marked.Lexer();
  let tokens = lexer.lex(page.contents);
  tokens = tokens.filter(token => token.type === 'heading' || token.type === 'paragraph' || token.type === 'text');
  return {
    ...page,
    tokens,
  };
});

module.exports = {
  readPages,
  parsePages,
  findPages,
};
