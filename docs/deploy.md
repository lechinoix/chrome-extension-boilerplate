# Deployment

To deploy, you need to send the files to your users via Trello or the Chrome web store.

## Deploy for validation

To deploy to your PO for validation, you can use the following command:

```
npm run deploy
```

This will execute the script contained in `deploy/index.js` which does:

- Ask if you checked the acceptance criterias
- Upgrade the extension version and commit the new version
- Build the extension
- Zip this build
- Upload this build to a Trello card

To setup, you will need to add to your `.env` file:

- `TRELLO_BOARD_ID`
- `TRELLO_API_KEY`: You can find it [on Trello](https://trello.com/app-key)
- `TRELLO_API_TOKEN`: You will have to generate it with sufficient rights to push attachments to the the board board
- `BUILD_CARD_ID`: The card ID where you want to upload your build

Then the process for your PO to install the extension:

- Download the latest extension
- Unzip it on computer
- Go to chrome://extensions/
- Delete the previous installed extension
- Load the unpacked extension

## Deploy to Production

To depoy to production, you will need to be developer on the Chrome Web Store page.

### Prepare the build

In your project

```
npm run build
zip -r ~/Desktop/my-enxtension-build.zip build
```

Your build is on your desktop named `my-enxtension-build.zip`.

__To publish your build, read the [publish section](./publish/publish.md)__
