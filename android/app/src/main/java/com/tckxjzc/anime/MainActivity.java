package com.tckxjzc.anime;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import org.devio.rn.splashscreen.SplashScreen;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AnimeDownload";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true);  // here
        super.onCreate(savedInstanceState);
//        testA();
    }

    private void testA() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                String url = "http://comicat.org";
                OkHttpClient okHttpClient = new OkHttpClient()
                        .newBuilder()
                        .followRedirects(false)
                        .followSslRedirects(false)
                        .cookieJar(new CookieJar() {
                            List<Cookie> cookies = new ArrayList<Cookie>();

                            @Override
                            public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
                                this.cookies.addAll(cookies);
                            }

                            @Override
                            public List<Cookie> loadForRequest(HttpUrl url) {
                                return cookies;
                            }
                        })
                        .build();
                Request request = new Request.Builder()
                        .url(url)
                        .addHeader("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1")
                        .build();

                okHttpClient.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        Log.d("test", e.toString());
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        Log.d("test", response.isRedirect() + "");
                        Log.d("test", response.headers().toString());
                        Log.d("test", response.body().string());
                    }
                });


            }
        }).run();

    }

}
