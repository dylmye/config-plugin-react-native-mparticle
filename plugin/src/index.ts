import {
  withDangerousMod,
  withInfoPlist,
  withAndroidManifest,
  AndroidConfig,
  ConfigPlugin,
} from "@expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import path from "path";
import fs from "fs";

interface MparticlePluginOptions {
  androidMparticleKey?: string;
  androidMparticleSecret?: string;
  androidMparticleDataplanId?: string;
  androidMparticleDataplanVersion?: number;
  iosMparticleKey?: string;
  iosMparticleSecret?: string;
  iosMparticleDataplanId?: string;
  iosMparticleDataplanVersion?: number;
}

/**
 * Modify configuration files to give native code access to API keys
 */
const withApiKeys: ConfigPlugin<MparticlePluginOptions> = (
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

const linkingPodfileCode = `
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if pod.name == 'mParticle-Apple-SDK'
      def pod.build_type;
        Pod::BuildType.new(:linkage => :dynamic, :packaging => :framework)
      end
    end
  end
end
`;

/**
 * Modify Podfile to add dynamic linking just for mParticle
 *
 * @see https://github.com/mParticle/react-native-mparticle?tab=readme-ov-file#ios
 */
const withPodLinkingSettings: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (cfg) => {
      const filePath = path.join(cfg.modRequest.platformProjectRoot, "Podfile");
      const contents = fs.readFileSync(filePath, "utf-8");

      const addCodeOperation = mergeContents({
        tag: "withReactNativeMparticle",
        src: contents,
        newSrc: linkingPodfileCode,
        /*
            Anchor last updated: 2024-03-25, line: 69
            Check the line below still exists here: https://github.com/expo/expo/blob/main/templates/expo-template-bare-minimum/ios/Podfile
         */
        anchor: "post_install do |installer|",
        offset: -1,
        comment: "#",
      });

      if (!addCodeOperation.didMerge) {
        throw new Error("Unable to set mParticle linking settings - please contact the plugin author with a copy of your generated Podfile: https://github.com/dylmye/config-plugin-react-native-mparticle")
      }

      fs.writeFileSync(filePath, addCodeOperation.contents);

      return cfg;
    },
  ]);
};

/**
 * Apply all above plugins
 */
const withMparticle: ConfigPlugin<MparticlePluginOptions> = (config, opts) => {
  config = withApiKeys(config, opts);
  config = withPodLinkingSettings(config);
  return config;
};

export default withMparticle;
