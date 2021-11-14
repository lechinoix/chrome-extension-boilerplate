const readline = require('readline')
const { execSync } = require('child_process')

const manageError = (e) => {
  let error = e
  if (e.response) {
    error = `${e.response.status} ${e.response.statusText}`
  }
  console.log(`\n❌ Something went wrong...\n\n${error}\n`)
}

const askForAcceptanceCriterias = () => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Did you check the acceptance criterias (wording...) ? (y/n)', (answer) => {
    rl.close()
    if (answer === 'y') {
      resolve(true)
    } else {
      reject(new Error('Then check them'))
    }
  })
})

const execCommand = (command) => execSync(command, { stdio: 'inherit' })

module.exports = {
  askForAcceptanceCriterias,
  execCommand,
  manageError
}
