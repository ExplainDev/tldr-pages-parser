# tldr pages parser

A custom set of scripts that read, parse and extract [tldr pages](https://github.com/tldr-pages/tldr) and creates JS objects useful to initialize and populate a database with Sequelize seeders.

## Installation

Install npm packages
`npm install --save`

## Running the tests
`npm test`

## Usage
From the CLI

`node src/index.js`

The programs creates two files:
* programs.seeds.js
* commands.seeds.js

## Contributing
Please submit an issue explaining the kind of request (help, bug reports, feature). PRs are very welcome ;)

## Authors
Eddie Ramirez

## License
Copyright (c) 2018, Eddie Ramirez, (MIT License)

## Acknowledgments
* All contributors of [tldr pages](https://tldr.sh/)
* [marked](https://www.npmjs.com/package/marked)