class Url {
    url:string;
    constructor(url:string){
        this.url = url;
    }
    /**
     * 获取url对应参数值
     * @param {String} name parameter
     */
    getParameter(name:string) {
        name = decodeURIComponent(name);
        const search = this.url;
        const pattern = new RegExp(name + "[=][^&#]*", "g");
        const result = search.match(pattern);
        if (result && result.length > 0) {
            return decodeURIComponent(result[0].substring(name.length + 1, result[0].length));
        } else {
            return null;
        }
    }

    /**
     * 设置URL参数
     * @param name
     * @param value
     * @returns {string}
     */
    setParameter(name:string, value:string) {
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        const url = this.url;
        const split = url.indexOf("?") !== -1 ? "&" : "?";
        this.url = url + split + name + "=" + value;
        return this;
    }

    /**
     * search转obj
     */
    getParams() {
        if (this.url.indexOf('?') === -1) {
            return {_isEmpty: true}
        }
        const pattern = /[?&][^&#]+[=][^&#]*/g;
        let result = this.url.match(pattern);
        if (!result) {
            return {_isEmpty: true}
        }
        //有值
        const obj = {};
        result.forEach(function (item) {
            const arr = item.substr(1).split('=');
            obj[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        });
        return obj;
    }

    removeParameter(name:string) {
        name = decodeURIComponent(name);
        const search = this.url;
        const pattern = new RegExp(name + "[=][^&#]*", "g");
        const result = search.match(pattern);
        if (result && result.length > 0) {
            const $this = this;
            result.forEach(function (item) {
                if ($this.url.indexOf(item) === $this.url.length - item.length) {
                    $this.url = $this.url.replace('&' + item, '').replace('?' + item, '');
                } else {
                    $this.url = $this.url.replace(item + '&', '');
                }
            });
        }
        return this;
    }

    /**
     * *obj转search
     */
    setParams(obj:Object) {
        const arr = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const type = typeof obj[key];
                if ((type === 'string' || type === 'number' || type === 'boolean')) {
                    this.removeParameter(key);
                    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
                }
            }


        }
        this.url = this.url + (this.url.indexOf('?') > -1 ? '&' : '?') + arr.join('&');

        return this;
    }

    /**
     * 获取绝对路径，去掉host
     */
    getPath():string {
        return this.url.replace(/http[s]{0,1}:\/\/[^/]*/, '');
    }
    getHost(){
        let result=this.url.match(/http[s]{0,1}:\/\/[^/]*/);
        return result?result[0]:result;
    }
}


export default Url;