# mParticle Expo Config Plugin

Sets up mParticle native setup code so you can use react-native-mparticle in your Expo project. It's designed for you to adapt and add your specific functionality to.

# Install

Install the package from [mParticle](https://github.com/mParticle/react-native-mparticle/) and this config plugin:

```
yarn add react-native-mparticle @dylmye/config-plugin-react-native-mparticle
```

**For iOS only**: Run `npx pod-install` after installing this plugin.

Set up the plugin in your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "@dylmye/config-plugin-react-native-mparticle",
        {
          "androidMparticleKey": "us1-YOUR_ANDROID_KEY_HERE",
          "androidMparticleSecret": "YOUR_ANDROID_SECRET_HERE",
          "iosMparticleKey": "us1-YOUR_IOS_KEY_HERE",
          "iosMparticleSecret": "YOUR_IOS_SECRET_HERE",
        }
      ]
    ]
  }
}
```

Here's all the possible values. They're all optional however you need both the key and secret for each platform to activate mParticle for that platform.

See how to get your Android and/or iOS keys [in this help guide](https://docs.mparticle.com/developers/quickstart/android/create-input/).

If you want to enforce a Data Plan, see how to grab its ID and version [in this guide](https://docs.mparticle.com/developers/quickstart/android/data-planning/).

| Key                               | Value                    |
| --------------------------------- | ------------------------ |
| `androidMparticleKey`             | Key for Android input    |
| `androidMparticleSecret`          | Secret for Android input |
| `androidMparticleDataplanId`      | Data Plan 'Plan ID'      |
| `androidMparticleDataplanVersion` | Data Plan 'v' number     |
| `iosMparticleKey`                 | Key for iOS input        |
| `iosMparticleSecret`              | Secret for iOS input     |
| `iosMparticleDataplanId`          | Data Plan 'Plan ID'      |
| `iosMparticleDataplanVersion`     | Data Plan 'v' number     |

> For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

## Adding other native code - Kits, User Attributes, etc

The mParticle setup code is quite custom in nature. Identifying users/IDSync, event tracking and user attributes are bespoke to your system and not every use case can be captured in this plugin. This plugin is intended to act as a base, with the intention that you clone it and integrate it with your expo project. You can see in the [app.json of the example project](./example/app.json) how it imports this plugin as a relative import instead of an npm module.

To modify this package:

0. Clone it locally and put it in a folder within your Expo project, like `plugins/mparticle`. You can delete the `.git` & `example` folders
1. Make your changes - the setup code is in `ios/AppLifecycleDelegate.swift` and `android/src/main/java/expo/modules/mparticle/MparticlePluginApplicationLifecycleListener.kit` (quite the mouthful!)
2. If you need to add any additional variables, you can add them into the `withApiKeys` method in `plugin/src/index.ts`
3. Run `yarn plugin build`
4. Add your configuration to your Expo app `app.json` file as done in the example app

You don't need to rebuild the plugin every time you make changes to the Swift/Kotlin code, however you should do another prebuild.

> The author of this plugin **cannot provide any support for specific feature support**. This library is also not officially supported by mParticle.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).

Make sure to test your changes with the [example app](./example/).

To create a release, bump the version number in package.json (in its own commit) then create a tag using `git tag vx.x.x` (where x.x.x is the semantic release version), then push it with `git push && git push --tags`.

## Testing process

0. Make changes to plugin
1. Run `yarn plugin build` to build changes
2. In example dir, run `yarn expo prebuild --clean`

# Authors

- [Dylan @dylmye](https://github.com/dylmye)

# Disclaimer

> This plugin is not created by, nor associated with mParticle Inc, its subsidiaries or affiliates. mParticle is a registered trademark of mParticle, Inc.