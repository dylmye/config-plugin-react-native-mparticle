package expo.modules.mparticle

import expo.modules.core.interfaces.ApplicationLifecycleListener
import expo.modules.core.interfaces.Package
import android.content.Context

class MparticlePluginPackage : Package {
  override fun createApplicationLifecycleListeners(context: Context): List<ApplicationLifecycleListener> {
    return listOf(MparticlePluginApplicationLifecycleListener(context))
  }
}