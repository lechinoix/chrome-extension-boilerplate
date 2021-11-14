const fs = require('fs')
const manifest = require('../src/manifest.json')
const { execCommand } = require('./utils')

const pathToBuildFolder = 'build'

const buildExtension = () => execCommand('yarn build')

const zipBuild = (buildName) => execCommand(`zip -r ${buildName} ${pathToBuildFolder}`)

const clearBuildFile = (buildName) => execCommand(`rm -f ${buildName}`)

const runCommitUpgradeVersion = (newVersion) => execCommand(`git add src/manifest.json && git commit -m "Upgrade version to ${newVersion}"`)

const runTests = () => execCommand('yarn test')

const runCheckoutManifest = () => execCommand('git checkout -f src/manifest.json')

const upgradeExtensionVersion = () => new Promise((resolve, reject) => {
  const versionNumbers = manifest.version.split('.').map(Number)
  versionNumbers[2] += 1
  manifest.version = versionNumbers.join('.')

  fs.writeFile('src/manifest.json', JSON.stringify(manifest, null, 2), function (err) {
    if (err) return reject(err)
    resolve(manifest.version)
  })
})

module.exports = {
  buildExtension,
  clearBuildFile,
  zipBuild,
  upgradeExtensionVersion,
  runCheckoutManifest,
  runCommitUpgradeVersion,
  runTests
}
