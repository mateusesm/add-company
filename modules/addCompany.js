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
    const company = await rl.question('Para qual empresa você se candidatou a vaga?\n')
    let status = ''

    try {
        const datas = await read(caminhoArquivo)
        const datasObj = JSON.parse(datas)
        
        for (let obj of datasObj) {
            if (obj.company === company) {
                console.log(`A empresa "${company}" já está cadastrada.`)
                rl.close()
                return null
            }
        }

        console.log(`Escolha o status da candidatura:\n`)
        console.log('[1] - Pendente')
        console.log('[2] - Negado')
        console.log('[3] - Aceito')
        const num = await rl.question('Escolha um número: ')

        rl.close()
        console.clear()
                     
        if (Number(num) === 1) status = 'pendente'
        if (Number(num) === 2) status = 'negado'
        if (Number(num) === 3) status = 'aceito'

        const datasAdded = [ { company, status } ]
        datasObj.push(datasAdded[0])

        let flag = 'w'
        const datasJson = JSON.stringify(datasObj, '', 2)
        write(caminhoArquivo, datasJson, flag)
        console.log(`Sua candidatura foi cadastrada com sucesso!`)
        rl.close()
        return null
        
    } catch (error) {
        console.log(error)
        console.log('Não foram encontrados dados no arquivo lido... Preparando para cadastrar do zero...\n')

        console.log(`Escolha o status da candidatura:\n`)
        console.log('[1] - Pendente')
        console.log('[2] - Negado')
        console.log('[3] - Aceito')
        const num = await rl.question('Escolha um número: ')

        rl.close()
        console.clear()
                     
        if (Number(num) === 1) status = 'pendente'
        if (Number(num) === 2) status = 'negado'
        if (Number(num) === 3) status = 'aceito'

        let flag = 'w'
        const datasAdded = [ { company, status } ]
        const datasJson = JSON.stringify(datasAdded, '', 2)
        write(caminhoArquivo, datasJson, flag)
        console.log(`Sua candidatura foi cadastrada com sucesso!`)
        rl.close()
        return null

    }

}