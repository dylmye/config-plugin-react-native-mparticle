package expo.modules.mparticle

import android.app.Application
import android.content.Context
import android.content.pm.PackageManager
import expo.modules.core.interfaces.ApplicationLifecycleListener

import com.mparticle.MParticle
import com.mparticle.MParticleOptions
import com.mparticle.identity.IdentityApiRequest

class MparticlePluginApplicationLifecycleListener(val context: Context) : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    val appContext = context.getApplicationContext()
    val applicationInfo = appContext.packageManager?.getApplicationInfo(appContext?.packageName.toString(), PackageManager.GET_META_DATA)

    val apiKey: String? = applicationInfo?.metaData?.getString("ANDROID_MPARTICLE_API_KEY")
    val apiSecret: String? = applicationInfo?.metaData?.getString("ANDROID_MPARTICLE_API_SECRET")

    if (apiKey is String && apiSecret is String) {
      val identityRequest = IdentityApiRequest.withEmptyUser()

      // more options: https://docs.mparticle.com/developers/quickstart/android/create-input/#13-initialize-the-sdk
      val options: MParticleOptions.Builder = MParticleOptions.builder(context)
        .credentials(apiKey, apiSecret)
        .logLevel(MParticle.LogLevel.VERBOSE)
        .identify(identityRequest.build())

      val dataplanId: String? = applicationInfo.metaData?.getString("ANDROID_MPARTICLE_DATAPLAN_ID")

      if (dataplanId is String) {
        options.dataplan(dataplanId, applicationInfo.metaData?.getString("ANDROID_MPARTICLE_DATAPLAN_VERSION")?.toInt())
      }
        
      MParticle.start(options.build())
    }
  }
}