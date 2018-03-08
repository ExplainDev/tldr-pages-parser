const buildCommand = (id, programId, title, rawCommand) => ({
  id,
  programId,
  title,
  rawCommand
});

const getCommands = pages => {
  let id = 1;
  const commands = [];
  console.log("Building commands object");
  console.time("getCommands");
  pages.forEach(page => {
    for (let i = 2; i < page.tokens.length; i += 2) {
      id += 1;
      commands.push(
        buildCommand(id, page.id, page.tokens[i].text, page.tokens[i + 1].text)
      );
    }
  });
  console.timeEnd("getCommands");
  return commands;
};

module.exports = {
  getCommands,
  buildCommand
};
