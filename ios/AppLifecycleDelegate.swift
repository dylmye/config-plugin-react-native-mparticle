import ExpoModulesCore
import mParticle_Apple_SDK

public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
  public func applicationDidFinishLaunchingWithOptions(_ application: UIApplication) -> Bool {
    let apiKey = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_API_KEY") as? String
    let apiSecret = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_API_SECRET") as? String
    let dataplanId = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_DATAPLAN_ID") as? String
    let dataplanVersion = Bundle.main.object(forInfoDictionaryKey: "IOS_MPARTICLE_DATAPLAN_VERSION") as? NSNumber

    guard 
      let apiKey,
      let apiSecret
    else {
      return true
    }

    let mParticleOptions = MParticleOptions(key: apiKey, secret: apiSecret)
    mParticleOptions.logLevel = MPILogLevel.verbose
    
    let request = MPIdentityApiRequest.withEmptyUser()
    mParticleOptions.identifyRequest = request

    if let dataplanId {
      mParticleOptions.dataPlanId = dataplanId
    }

    if let dataplanVersion {
      mParticleOptions.dataPlanVersion = dataplanVersion
    }

    MParticle.sharedInstance().start(with: mParticleOptions)        
    return true
  }
}
