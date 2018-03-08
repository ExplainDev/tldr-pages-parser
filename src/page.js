const fs = require("fs");
const path = require("path");
const marked = require("marked");
const _ = require("underscore");

const findPages = (pagesPath, platforms) => {
  const promises = [];
  console.log(`Finding pages in ${platforms.length} platforms...`);
  console.time("findPages");
  platforms.forEach(platform => {
    const p = new Promise((resolve, reject) => {
      fs.readdir(path.join(pagesPath, platform.directory), (err, files) => {
        if (err) reject(err);
        const pages = files.map(file => ({
          platformId: platform.id,
          name: file.substr(0, file.indexOf(".")),
          file,
          path: path.join(pagesPath, platform.directory)
        }));
        resolve(pages);
      });
    });
    promises.push(p);
  });
  return Promise.all(promises)
    .then(platformPages => {
      console.timeEnd("findPages");
      return _.flatten(platformPages).map((platformPage, idx) => ({
        ...platformPage,
        id: idx + 1
      }));
    })
    .catch(err => {
      console.log("There was an error while trying to find pages", err);
    });
};

const readPages = async pages => {
  const promises = [];
  console.log(`Reading ${pages.length} pages`);
  console.time("readPages");
  pages.forEach(page => {
    const p = new Promise((resolve, reject) => {
      fs.readFile(path.join(page.path, page.file), "utf8", (err, data) => {
        if (err) reject(err);
        resolve({ ...page, contents: data });
      });
    });
    promises.push(p);
  });
  return Promise.all(promises)
    .then(readFiles => {
      console.timeEnd("readPages");
      return readFiles;
    })
    .catch(err => {
      console.error("There was an error while trying to read pages", err);
    });
};

const parsePages = pages => {
  console.log("Parsing pages");
  console.time("parsePages");
  const parsedPages = pages.map(page => {
    const lexer = new marked.Lexer();
    let tokens = lexer.lex(page.contents);
    tokens = tokens.filter(
      token =>
        token.type === "heading" ||
        token.type === "paragraph" ||
        token.type === "text"
    );
    return {
      ...page,
      tokens
    };
  });
  console.timeEnd("parsePages");
  return parsedPages;
};

module.exports = {
  readPages,
  parsePages,
  findPages
};
