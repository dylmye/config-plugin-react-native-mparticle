## Build

Three steps:

1. Install dependencies (make sure you've installed dependencies in the root folder too):

```
yarn
```

2. Add key and secret in app.json - you can use the sample credentials in [react-native-mparticle](https://github.com/mParticle/react-native-mparticle/):

* [Android](https://github.com/mParticle/react-native-mparticle/blob/main/sample/android/app/src/main/java/com/mparticlesample/MainApplication.java#L51)
* [iOS](https://github.com/mParticle/react-native-mparticle/blob/main/sample/ios/MParticleSample/AppDelegate.m#L20)

3. `yarn prebuild --clean` then `yarn android` or `yarn ios`