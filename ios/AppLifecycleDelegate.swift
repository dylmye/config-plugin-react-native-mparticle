import ExpoModulesCore
import mParticle_Apple_SDK

public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
  public func applicationDidFinishLaunchingWithOptions(_ application: UIApplication) -> Bool {
    let apiKey: String? = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_API_KEY")
    let apiSecret: String? = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_API_SECRET")
    let dataplanId: String? = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_DATAPLAN_ID")
    let dataplanVersion: String? = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_DATAPLAN_VERSION")

    if apiKey == nil || apiSecret == nil {
      return true
    }

    let mParticleOptions = MParticleOptions(key: apiKey, secret: apiSecret)
    mParticleOptions.logLevel = MPILogLevel.verbose
    
    let request = MPIdentityApiRequest().withEmptyUser()
    mParticleOptions.identifyRequest = request

    if dataplanId != nil {
      mParticleOptions.dataPlanId = dataplanId
    }

    if dataplanVersion != nil {
      mParticleOptions.dataPlanVersion = dataplanVersion
    }

    MParticle.sharedInstance().start(with: mParticleOptions)        
    return true
  }
}
