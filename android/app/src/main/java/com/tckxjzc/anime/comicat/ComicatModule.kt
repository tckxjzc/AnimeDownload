package com.tckxjzc.anime.comicat

import com.tckxjzc.anime.bean.Anime
import com.facebook.react.bridge.*
import org.jsoup.nodes.Element
import org.jsoup.parser.Parser
import java.util.regex.Pattern

class ComicatModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "Comicat"
    }

    @ReactMethod
    fun parseToList(doc: String, callback: Callback) {
//        val result = Arguments.createMap()
        val list = Arguments.createArray()
        val document = Parser.parse(doc, "localhost")
        val lists = document.getElementsByClass("content_list").get(0)
                .getElementsByClass("lists").get(0)
                .getElementsByTag("li")
        val iterator = lists.iterator()
        while (iterator.hasNext()) {
            list.pushMap(parseToItem(iterator.next()).toWritableMap())
        }
//        result.putArray("list", list)
//        result.putMap("page", parseToPage(document))
        callback.invoke(list)
    }

    @ReactMethod
    fun parseMaxPage(doc: String, callback: Callback) {
        val document = Parser.parse(doc, "localhost")
        callback.invoke(parseToPage(document))
    }

    @ReactMethod
    fun parseDetails(doc: String, callback: Callback) {
        val document = Parser.parse(doc, "localhost")
        val anime = Anime()
        anime.details = document.getElementsByClass("content detail")
                .get(0).html()
        callback.invoke(anime.toWritableMap())
    }


    private fun parseToPage(element: Element): Int {
        val writableMap = Arguments.createMap()
        val last = element.getElementsByClass("pager-last")
        if (last.size > 0)
            writableMap.putInt("max", last.get(0).ownText().toInt())
        else
            writableMap.putInt("max", 1)

        return writableMap.getInt("max")

    }

    private fun parseToItem(element: Element): Anime {
        val anime = Anime()
        val anchor = element.getElementsByClass("name")
                .get(0)
                .getElementsByTag("a")
                .get(0)
        anime.title = anchor.text()
        anime.link = anchor.attr("href")
        val pattern = Pattern.compile("show-(.+)\\.html")
        val matcher = pattern.matcher(anime.link)
        if (matcher.find())
            anime.torrent = matcher.group(1)
        val menu = element.getElementsByClass("menu")
                .get(0)
                .getElementsByTag("span")

        anime.updateDate = menu.get(0).ownText()
        anime.size = menu.get(1).ownText()
        anime.id = anime.torrent
        return anime
    }


}