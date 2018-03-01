const command = require("../src/command");

test("builds an object command", () => {
  const mockCommand = {
    id: 1,
    programId: 1,
    title: "Delete everything",
    rawCommand: "rm -rf {{/}}"
  };
  expect(
    command.buildCommand(1, 1, "Delete everything", "rm -rf {{/}}")
  ).toEqual(mockCommand);
});
