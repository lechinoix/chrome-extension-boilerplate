# Architecture

This repository has been genereated using vue-cli with a [chrome extension template](https://github.com/YuraDev/vue-chrome-extension-template).


The project is structured as follows:

```
src
│
├─ backend
│  ├─ services
│  │  └─ ... // Services using background APIs (chrome.tabs...)
|  ├─ background.js // background script used to register listeners and create contextMenu
|  ├─ listeners.js
|  └─ contextMenu.js
│
├─ client
│  ├─ services
│  │  └─ ... // Services using front APIs (window, location...)
│  └─ view
│     ├─ components // Reusable components
│     ├─ contentScript // Script executed inside the webpages
│     ├─ popup // Extension popup
│     └─ tabs // List of pages
│
├─ shared
│  ├─ repositories // Abstraction above the chrome.storage to store data in extension
│  ├─ services // Services using common APIs (pure JS)
│  ├─ style // Common stylesheets
│  ├─ ChromeMessageEventManager // Class managing the ChromeMessageEvents
│  └─ messageTypes // List of possible messages
│
└─ manifest.json // The extension manifest
```

## Build

The build has several entry points:

- backend/background
- client/view/popup
- client/view/tabs/*
- **(Not a page)** client/view/contentScript

These will create `.html` files in `build/pages` folder that can be declared in manifest.json to be used. The `contentScript` does not generate a .html file, it is loaded in the currrent webpage as a `.js` file.

To understand how everything fit together, read the `manifest.json` file.
