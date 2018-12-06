export default (url) => {
    return fetch(url, {
        headers: {
            "user-agent": 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'
        }
    });
};
