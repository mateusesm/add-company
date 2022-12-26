const readline = require('node:readline').promises
const { stdin, stdout } = require('node:process')

const input = stdin
const output = stdout

const rl = readline.createInterface({ input, output });

const read = require('./read')
const write = require('./write')

const path = require('node:path')
const caminhoArquivo = path.resolve(__dirname, '../companies', 'companies.txt')

module.exports = async () => {
    const company = await rl.question('Qual empresa você quer excluir?\n')
    rl.close()
    
    try {
        const datas = await read(caminhoArquivo)
        const datasObj = JSON.parse(datas)
    
        for (let obj of datasObj) {
            if (obj.company === company) {
                const index = datasObj.indexOf(obj)
                datasObj.splice(index, 1)
                
                let flag = 'w'
                const datasJson = JSON.stringify(datasObj, '', 2)
                write(caminhoArquivo, datasJson, flag)
                console.log(`Candidatura excluída com sucesso!`)
                rl.close()
                return null 
            }
        }
            
        console.log(`Não foi encontrada nenhuma empresa com o nome "${company}" cadastrada.`)
        rl.close()
        return null
        
    } catch (error) {
        console.log('Não foram encontrados dados no arquivo lido.')
        rl.close()
        return null
    }

}