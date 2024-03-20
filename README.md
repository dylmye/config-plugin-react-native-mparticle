# mParticle Expo Config Plugin

> **Warning**
> This package is in beta and not yet confirmed working. Use at your own risk.

Sets up mParticle so you can use react-native-mparticle in your Expo project.

# Install

Install the package from [mParticle](https://github.com/mParticle/react-native-mparticle/) and this config plugin:

```
yarn add react-native-mparticle @dylmye/config-plugin-react-native-mparticle
```

Set up the plugin in your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "@dylmye/config-plugin-react-native-mparticle",
        {
          "androidMparticleKey": "us1-YOUR_ANDROID_KEY_HERE",
          "androidMparticleSecret": "YOUR_ANDROID_SECRET_HERE"
        }
      ]
    ]
  }
}
```

Here's all the possible values. They're all optional however you need both the key and secret for each platform to activate mParticle for that platform.

See how to get your Android and/or iOS keys [in this help guide](https://docs.mparticle.com/developers/quickstart/android/create-input/).

If you want to enforce a Data Plan, see how to grab its ID and version [in this guide](https://docs.mparticle.com/developers/quickstart/android/data-planning/).

| Key                               | Value                       |
| --------------------------------- | --------------------------- |
| `androidMparticleKey`             | Key for Android input       |
| `androidMparticleSecret`          | Secret for Android input    |
| `androidMparticleDataplanId`      | Data Plan 'Plan ID'         |
| `androidMparticleDataplanVersion` | Data Plan 'v' number        |
| `iosMparticleKey`                 | Key for iOS input           |
| `iosMparticleSecret`              | Secret for iOS input        |
| `iosMparticleDataplanId`          | Data Plan 'Plan ID'         |
| `iosMparticleDataplanVersion`     | Data Plan 'v' number        |


> For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Configure for iOS

Run `npx pod-install` after installing the npm package.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).

Make sure to test your changes with the [example app](./example/).

To create a release, bump the version number in package.json (in its own commit) then create a tag using `git tag vx.x.x` (where x.x.x is the semantic release version), then push it with `git push && git push --tags`.

# Authors

* [Dylan @dylmye](https://github.com/dylmye)