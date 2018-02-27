const path = require("path");
const config = require("config");
const page = require("./page");
const program = require("./program");
const command = require("./command");

const process = async () => {
  const pagesPath = path.join("vendor", "tldr", "pages");
  const platforms = config.get("platforms");
  let pages = await page.findPages(pagesPath, platforms);
  pages = await page.readPages(pages);
  pages = page.parsePages(pages);
  const programs = program.getPrograms(pages);
  const commands = command.getCommands(pages);
  console.log(programs);
  console.log(commands);
};

process();
