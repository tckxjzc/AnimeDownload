package com.tckxjzc.anime.bean

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

class Anime {
    var id:String=""
    var title:String=""
    var updateDate:String=""
    var link:String=""
    var torrent:String=""
    var size:String=""
    var details:String=""

    fun toWritableMap():WritableMap{
        val writableMap = Arguments.createMap()
        writableMap.putString("id",id)
        writableMap.putString("title",title)
        writableMap.putString("updateDate",updateDate)
        writableMap.putString("link",link)
        writableMap.putString("torrent",torrent)
        writableMap.putString("size",size)
        writableMap.putString("details",details)
        return writableMap
    }
}