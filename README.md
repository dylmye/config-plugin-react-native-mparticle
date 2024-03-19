# mParticle Expo Config Plugin

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

> For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Configure for iOS

Run `npx pod-install` after installing the npm package.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).

Make sure to test your changes with the [example app](./example/).

To create a release, bump the version number in package.json (in its own commit) then create a tag using `git tag vx.x.x` (where x.x.x is the semantic release version), then push it with `git push && git push --tags`.

# Authors

* [Dylan @dylmye](https://github.com/dylmye)