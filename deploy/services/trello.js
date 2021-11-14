const axios = require('axios')
const { manageError } = require('../utils')
const { execSync } = require('child_process')

const NUMBER_OF_VERSIONS_TO_KEEP = 1

// stdio: 'inherit' does not work well with CURL, use execSync instead of execCommand
const uploadZipToTrello = (attachmentName) => execSync(`curl -s -F token=${process.env.TRELLO_API_TOKEN} -F file=@${attachmentName} https://api.trello.com/1/cards/${process.env.BUILD_CARD_ID}/attachments?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN} > /dev/null`)

const clearAttachments = async () => {
  try {
    const { data: attachments } = await axios.get(`https://api.trello.com/1/cards/${process.env.BUILD_CARD_ID}/attachments?token=${process.env.TRELLO_API_TOKEN}&key=${process.env.TRELLO_API_KEY}`)
    if (attachments.length > NUMBER_OF_VERSIONS_TO_KEEP) {
      const orderedAttachments = attachments.reverse()
      for (var i = NUMBER_OF_VERSIONS_TO_KEEP; i < attachments.length; i++) {
        await axios.delete(`https://api.trello.com/1/cards/${process.env.BUILD_CARD_ID}/attachments/${orderedAttachments[i].id}?token=${process.env.TRELLO_API_TOKEN}&key=${process.env.TRELLO_API_KEY}`)
      }
    }
  } catch (e) {
    manageError(e)
  }
}

module.exports = {
  clearAttachments,
  uploadZipToTrello
}
