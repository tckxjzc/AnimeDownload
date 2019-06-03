import ComicatParse from "../parse/ComicatParse";


export default (url:string)=>{


    return new Promise(function (resolve,reject) {
        ComicatParse.request({
            url:url,
            method:'get',

        },function ({ok,body}) {
            if(ok){
                resolve({
                    ok:true,
                    text:function () {
                        return new Promise(function (resolve) {
                            resolve(body);
                        });
                    },
                });
            }else {
                reject();
            }

        });
    });
    // return fetch(url,{
    //     headers:{
    //         "user-agent":'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'
    //     }
    // })
}