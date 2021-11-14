# Install the Chrome extension

Clone the repository and install the extension:

```
git clone git@github.com:lechinoix/chrome-extension-boilerplate.git
cd chrome-extension-boilerplate
yarn
```

To create the extension build:

```
yarn build
```

This will create a `build` folder containing the built extension

Go to chrome://extensions > developer mode > load unpacked extension and select the `build` folder.

You are good to go!

---

To see how to develop check the [development doc](./dev.md)

To see how to deploy the application check the [deployment doc](./deploy.md)