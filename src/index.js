const path = require('path');
const _ = require('underscore');
const config = require('config');
const page = require('./page');
const program = require('./program');
const pagesPath = path.join('vendor', 'tldr', 'pages');
const platforms = config.get('platforms');

const getPrograms = pages => pages.map((page) => {
  const {
    id,
    name,
    platformId,
    tokens,
  } = page;
  // refactor this zone below
  const cliName = _.chain(tokens)
    .find({ type: 'heading' })
    .pick('text')
    .value()
    .text;
  const shortDecription = _.chain(tokens)
    .find({ type: 'paragraph' })
    .pick('text')
    .value()
    .text;
  return {
    id,
    cliName,
    name,
    platformId,
    shortDecription,
  };
});

const buildCommand = (id, programId, title, rawCommand) => {
  return {
    id,
    programId,
    title,
    rawCommand,
  };
};

const getCommands = (pages) => {
  let id = 1;
  const commands = [];
  pages.forEach((page) => {
    for (let i = 2; i < page.tokens.length; i += 2) {
      id += 1;
      commands.push(buildCommand(id, page.id, page.tokens[i].text, page.tokens[i + 1].text));
    }
  });
  return commands;
};


const process = async () => {
  let pages = await page.findPages();
  pages = await page.readPages(pages);
  pages = page.parsePages(pages);
  const programs = getPrograms(pages);
  const commands = getCommands(pages);
  console.log(commands);
}

process();