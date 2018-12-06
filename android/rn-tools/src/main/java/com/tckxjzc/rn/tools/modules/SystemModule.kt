package com.tckxjzc.rn.tools.modules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod



class SystemModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TzSystem"
    }

    @ReactMethod
    fun exit() {
        android.os.Process.killProcess(android.os.Process.myPid())
    }
}