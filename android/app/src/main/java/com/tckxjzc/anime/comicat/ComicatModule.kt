package com.tckxjzc.anime.comicat

import android.support.annotation.ArrayRes
import android.util.Log
import com.tckxjzc.anime.bean.Anime
import com.facebook.react.bridge.*
import com.facebook.react.bridge.Callback
import okhttp3.*
import org.jsoup.nodes.Element
import org.jsoup.parser.Parser
import java.io.IOException
import java.util.ArrayList
import java.util.regex.Pattern

class ComicatModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    var count=0
    var host = "m.kisssub.org";
    val hosts = arrayOf("m.kisssub.org","m.comicat.org")

    companion object {

        val okHttpClient = OkHttpClient()
                .newBuilder()
                .followRedirects(false)
                .followSslRedirects(false)
                .cookieJar(object : CookieJar {
                    internal var cookies: MutableList<Cookie> = ArrayList()

                    override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {
                        for(item in cookies){
                            if(!"return_url".equals(item.name())){
                                this.cookies.add(item)
                            }
                        }
                        Log.w("cookies",this.cookies.toString())

                    }

                    override fun loadForRequest(url: HttpUrl): List<Cookie> {
                        return cookies
                    }
                })
                .build()!!

    }

    override fun getName(): String {
        return "Comicat"
    }
    @ReactMethod
    fun switchHost(str: String, callback: Callback){
        host = str
        callback.invoke();
    }
    @ReactMethod
    fun parseToList(doc: String, callback: Callback) {
//        val result = Arguments.createMap()
        Log.w("doc",doc)
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
    @ReactMethod
    private fun request(readableMap: ReadableMap,callback: Callback){
        val url = readableMap.getString("url")
//        val method = writableMap.getString("method")
        val request = Request.Builder()
                .url(url)
                .addHeader("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1")
                .build()

        okHttpClient.newCall(request).enqueue(object : okhttp3.Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.w("request", e.toString())
                val result = Arguments.createMap()
                result.putBoolean("ok",false)
                result.putString("body","")
                callback.invoke(result)
            }

            @Throws(IOException::class)
            override fun onResponse(call: Call, response: Response) {
                Log.d("request", response.isRedirect.toString() + "")
                Log.d("request", response.headers().toString())
                Log.d("request", response.code().toString())
                if(response.isRedirect){
                    if(count<5){
                        count++
                        sign()
                        val map = Arguments.createMap()
                        map.putString("url",url);
                        request(map,callback)
                    }else{
                        count=0
                        val result = Arguments.createMap()
                        result.putBoolean("ok",false)
                        callback.invoke(result)
                    }
                }else{
                    count=0
                    val result = Arguments.createMap()
                    result.putBoolean("ok",true)
                    result.putString("body",response.body()!!.string())
                    callback.invoke(result)
                }

            }
        })

    }

    private fun sign(){
        val body = FormBody.Builder()
                .add("visitor_test", "human")
                .build()
        val request = Request.Builder()
                .url("http://$host/addon.php?r=document/view&page=visitor-test")
                .addHeader("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1")
                .post(body)
                .build()
        val response = okHttpClient.newCall(request).execute()
        Log.w("sign",response.headers().toString())
    }

}