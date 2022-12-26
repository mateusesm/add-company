const readline = require('node:readline').promises
const { stdin, stdout } = require('node:process')

const input = stdin
const output = stdout

const rl = readline.createInterface({ input, output });

module.exports = async () => {
    console.clear()
    console.log('-----------------------------------------------------')
    console.log('CADASTRAR EMPRESAS QUE VOCÊ SE CANDIDATOU A EMPREGO')
    console.log('-----------------------------------------------------')

    console.log('-------------')
    console.log('   M e n u   ')
    console.log('-------------')
    console.log('[1] - Cadastrar nova candidatura')
    console.log('[2] - Listar todas as candidaturas')
    console.log('[3] - Editar status das candidaturas')
    console.log('[4] - Excluir candidaturas')
    console.log('[5] - Sair\n')

    const num = await rl.question('Escolha o número da opção desejada: ')
    rl.close()
    console.clear()

    switch (Number(num)) {
        case 1: {
            const addCompany = require('./addCompany')
            addCompany()
            break
        }
        case 2: {
            const listCompany = require('./listCompany')
            listCompany()
            break
        }
        case 3: {
            const editCompany = require('./editCompany')
            editCompany()
            break
        }
        case 4: {
            const deleteCompany = require('./deleteCompany')
            deleteCompany()
            break
        }
        case 5: {
            rl.close()
            break
        }
    }
}