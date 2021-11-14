require('dotenv').config()

const { askForAcceptanceCriterias, manageError } = require('./utils')
const { clearAttachments, uploadZipToTrello } = require('./services/trello')
const {
  buildExtension,
  clearBuildFile,
  runCommitUpgradeVersion,
  runTests,
  upgradeExtensionVersion,
  runCheckoutManifest,
  zipBuild
} = require('./commands')

const formatBuildName = (buildVersion) => `My_extension_${buildVersion}.zip`

const deploy = async () => {
  const newVersion = await upgradeExtensionVersion()
  const buildFilename = formatBuildName(newVersion)

  try {
    await askForAcceptanceCriterias()
    console.log(`\n🤖  Running tests...`)
    runTests()
    console.log(`\n🏗  Buildind extension...`)
    buildExtension()
    zipBuild(buildFilename)
    console.log(`\n✨ Extension successfully built!`)
    uploadZipToTrello(buildFilename)
    console.log(`\n📦 Build ${buildFilename} successfully uploaded to Trello`)

    clearAttachments()
    clearBuildFile(buildFilename)
    runCommitUpgradeVersion(newVersion)
    console.log('\n🚿 Successfully cleared attachments\n')
  } catch (e) {
    runCheckoutManifest()
    clearBuildFile(buildFilename)
    manageError(e)
  }
}

deploy()
