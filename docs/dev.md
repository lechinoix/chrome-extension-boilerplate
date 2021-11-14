# Develop

To start webpack watcher run:

```
npm run dev
```

## Update on Refresh

If you loaded the unpacked extension, Chrome will directly watch your files for:

- Tabs
- Popup

You just need to refresh the page.

## Manual reload

You will need to manually reload extension for:

- Background
- ContentScript

To manually reload, go to chrome://extensions and hit the reload button of your extension
Then, reload the page where you want the updated contentScript to be executed
