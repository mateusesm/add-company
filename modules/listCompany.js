const readline = require('node:readline').promises
const { stdin, stdout } = require('node:process')

const input = stdin
const output = stdout

const rl = readline.createInterface({ input, output });

const read = require('./read')

const path = require('node:path')
const caminhoArquivo = path.resolve(__dirname, '../companies', 'companies.txt')

module.exports = async () => {
    try {
        const datas = await read(caminhoArquivo)
        const datasObj = JSON.parse(datas)
        console.table(datasObj)
        rl.close()
        return null
        
    } catch (error) {
        console.log(error)
        console.log('Não foram encontrados dados no arquivo lido.')
        rl.close()
        return null
    }

}