# tldr pages parser

A custom set of scripts that read, parse and extract [tldr pages](https://github.com/tldr-pages/tldr) and creates two JSON files containing programs and commands.

## Installation
### Clone this project
```
$ git clone git@github.com:kommandr/tldr-pages-parser.git
```
### Initialize tldr-pages git submodule
```
$ git submodule init
$ git submodule update
```

### Install npm packages
`$ npm install`

## Running the tests
`$ npm test`

## Usage
From the CLI

```
$ npm start

Finding pages in 4 platforms...
findPages: 2.119ms
Reading 949 pages
readPages: 28.282ms
Parsing pages
parsePages: 29.468ms
Building programs object
getPrograms: 8.956ms
Building commands object
getCommands: 2.682ms
Writing file programs.json
programs.json: 2.329ms
Writing file commands.json
commands.json: 10.732ms
Total execution time: 88.026ms
```

The programs creates two files:
* programs.js
* commands.js

View the sample files programs.example.json and commands.example.json

### Data Dictionary

#### Platforms:
```json
{ "id": 1, "name": "generic", "directory": "common" },
{ "id": 2, "name": "linux", "directory": "linux" },
{ "id": 3, "name": "osx", "directory": "osx" },
{ "id": 4, "name": "windows", "directory": "windows" }
```

#### programs.json
- id: sequencial ID
- cliName: the CLI program name (the identifier used on you CLI to call this program)
- name: humanized name
- platformId: The ID of the platform this program belongs to
- shortDescription: A short description of the program

#### commands.json
- id: sequencial ID
- programId: the ID of the program the command belongs to.
- title: brief description of command
- rawContent: the actual command

## Contributing
Please submit an issue explaining the kind of request (help, bug reports, feature). PRs are very welcome ;)

## Authors
Eddie Ramirez

## License
Copyright (c) 2018, Eddie Ramirez, (Apache-2.0)

## Acknowledgments
* All contributors of [tldr pages](https://tldr.sh/)
* [marked](https://www.npmjs.com/package/marked)
