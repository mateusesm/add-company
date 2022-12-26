const fs = require('node:fs').promises

module.exports = (caminho) => fs.readFile(caminho)
