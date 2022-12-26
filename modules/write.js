const fs = require('node:fs').promises

module.exports = (caminho, dados, flag = 'a') => fs.writeFile(caminho, dados, { flag: flag })


