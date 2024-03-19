import {
  withInfoPlist,
  withAndroidManifest,
  AndroidConfig,
  ConfigPlugin,
} from "@expo/config-plugins";

const withMyApiKey: ConfigPlugin<{
  androidMparticleKey?: string;
  androidMparticleSecret?: string;
  androidMparticleDataplanId?: string;
  androidMparticleDataplanVersion?: number;
  iosMparticleKey?: string;
  iosMparticleSecret?: string;
  iosMparticleDataplanId?: string;
  iosMparticleDataplanVersion?: number;
}> = (
  config,
  {
    androidMparticleKey,
    androidMparticleSecret,
    androidMparticleDataplanId,
    androidMparticleDataplanVersion,
    iosMparticleKey,
    iosMparticleSecret,
    iosMparticleDataplanId,
    iosMparticleDataplanVersion,
  }
) => {
  config = withInfoPlist(config, (config) => {
    if (iosMparticleKey) {
      config.modResults["IOS_MPARTICLE_API_KEY"] = iosMparticleKey;
    }

    if (iosMparticleSecret) {
      config.modResults["IOS_MPARTICLE_API_SECRET"] = iosMparticleSecret;
    }

    if (iosMparticleDataplanId) {
      config.modResults["IOS_MPARTICLE_DATAPLAN_ID"] = iosMparticleDataplanId;
    }

    if (iosMparticleDataplanVersion) {
      config.modResults["IOS_MPARTICLE_DATAPLAN_VERSION"] =
        iosMparticleDataplanVersion;
    }

    return config;
  });

  config = withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    if (androidMparticleKey) {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "ANDROID_MPARTICLE_API_KEY",
        androidMparticleKey
      );
    }

    if (androidMparticleSecret) {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "ANDROID_MPARTICLE_API_SECRET",
        androidMparticleSecret
      );
    }

    if (androidMparticleDataplanId) {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "ANDROID_MPARTICLE_DATAPLAN_ID",
        androidMparticleDataplanId
      );
    }

    if (androidMparticleDataplanVersion) {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "ANDROID_MPARTICLE_DATAPLAN_VERSION",
        androidMparticleDataplanVersion.toString()
      );
    }

    return config;
  });

  return config;
};

export default withMyApiKey;
