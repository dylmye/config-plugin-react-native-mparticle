package expo.modules.mparticle

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.pm.PackageManager

class MparticlePluginModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MparticlePlugin")
  }
}
