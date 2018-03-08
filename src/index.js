const path = require("path");
const config = require("config");
const page = require("./page");
const program = require("./program");
const command = require("./command");
const fs = require("fs");

const writeOutput = async ({ fileName, data }) => {
  console.log(`Writing file ${fileName}`);
  console.time(fileName);
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data), err => {
      if (err) reject(err);
      console.timeEnd(fileName);
      resolve(data);
    });
  });
};

const process = async () => {
  console.time("Total execution time");
  const pagesPath = path.join("vendor", "tldr", "pages");
  const platforms = config.get("platforms");
  let pages = await page.findPages(pagesPath, platforms);
  pages = await page.readPages(pages);
  pages = page.parsePages(pages);
  const programs = program.getPrograms(pages);
  const commands = command.getCommands(pages);
  await writeOutput({ fileName: "programs.json", data: programs });
  await writeOutput({ fileName: "commands.json", data: commands });
  console.timeEnd("Total execution time");
};

process();
