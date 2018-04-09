const _ = require("underscore");

const getPrograms = pages => {
  console.log("Building programs object");
  console.time("getPrograms");
  const programs = pages.map(page => {
    const { id, name, platformId, tokens } = page;
    // refactor this zone below
    const cliName = _.chain(tokens)
      .find({ type: "heading" })
      .pick("text")
      .value().text;
    const shortDescription = _.chain(tokens)
      .find({ type: "paragraph" })
      .pick("text")
      .value().text;
    return {
      id,
      cliName,
      name,
      platformId,
      shortDescription
    };
  });
  console.timeEnd("getPrograms");
  return programs;
};

module.exports = {
  getPrograms
};
