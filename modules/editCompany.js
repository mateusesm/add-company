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
    const company = await rl.question('Qual empresa você quer editar o status?\n')
    let newStatus = ''
    
    try {
        const datas = await read(caminhoArquivo)
        const datasObj = JSON.parse(datas)
    
        for (let obj of datasObj) {
            if (obj.company === company) {

                console.log(`Escolha o novo status da candidatura para "${company}":\n`)
                console.log('[1] - Pendente')
                console.log('[2] - Negado')
                console.log('[3] - Aceito')
                const num = await rl.question('Escolha um número: ')
                rl.close()
                console.clear()
            
                newStatus = ''
            
                if (Number(num) === 1) newStatus = 'pendente'
                if (Number(num) === 2) newStatus = 'negado'
                if (Number(num) === 3) newStatus = 'aceito'

                if (obj.status === newStatus) {
                    console.log(`O status de "${company}" já está como ${newStatus}`)
                    rl.close()
                    return null
                } else {

                    obj.status = newStatus
                    let flag = 'w'

                    const datasJson = JSON.stringify(datasObj, '', 2)
                    write(caminhoArquivo, datasJson, flag)
                    console.log(`Status da candidatura de "${company}" editado com sucesso!`)
                    rl.close()
                    return null

                }   
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