// const fs = require("fs");

// fs.writeFileSync("notes.txt", " My name is Avneet Pandey");
// fs.appendFileSync("notes.txt", " I love coding");

// const getNotes = require("./notes.js");
// const validator = require("validator");
// console.log(validator.isEmail("maasdawqdil@mail.in"));

const chalk = require("chalk");
const { demandOption } = require("yargs");
const yargs = require("yargs");
// console.log(chalk.green("Success"));

//add,remove,read,list
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
    },
    body: {
      describe: "Enter the body part...",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log(`Title: ${argv.title}\nBody: ${argv.body}`);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a new note",
  handler: function () {
    console.log("Removing a new note!!");
  },
});

yargs.command({
  command: "list",
  describe: "Create a list",
  handler: function () {
    console.log("list created");
  },
});
yargs.command({
  command: "read",
  describe: "Read from the list",
  handler: function () {
    console.log("read from the list");
  },
});

yargs.parse();
// console.log(yargs.argv);
