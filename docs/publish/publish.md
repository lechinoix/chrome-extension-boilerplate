# Publish a new version of your Chrome Extension

To publish a new version of your Chrome Extension:

Modify the Extension information:

- Go to the [Chrome dashboard](https://chrome.google.com/webstore/developer/dashboard).
- Login
- Click on "modify"

## Chrome Store validation

You will not have access to your dashboard / publicated extension until the Chrome Store team validate the new build.

⚠️ **Modifying the publication information cancel the previous validation process (if not finished)**

⏱ Validation takes around 2 - 4 days

## Publish a new version

- Click on "import updated package"
- Select your new zipped build
- Validate

## Update extension information

You can modify any information on the page.
It will be used by Google to update the Chrome Store page and to promote the extension.

## Internationalization

⚠️ __Need changes made by a developer__

To make the Chrome extension available in multiple languages, you will have to modify your `manifest.json` file and to internationalize your information in the `_locales/fr/messages.json` file.

[The Chrome documentation on internationalization](https://developer.chrome.com/webstore/i18n?hl=en#details)
