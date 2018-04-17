# tldr pages parser

A custom set of scripts that read, parse and extract [tldr pages](https://github.com/tldr-pages/tldr) and creates JS objects useful to initialize and populate a database with Sequelize seeders.

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
`$ npm install --save`

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

## Contributing
Please submit an issue explaining the kind of request (help, bug reports, feature). PRs are very welcome ;)

## Authors
Eddie Ramirez

## License
Copyright (c) 2018, Eddie Ramirez, (Apache-2.0)

## Acknowledgments
* All contributors of [tldr pages](https://tldr.sh/)
* [marked](https://www.npmjs.com/package/marked)
