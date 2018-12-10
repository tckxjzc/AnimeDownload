import ComicatPagination from "./ComicatPagination";
import xhttp from "../tools/xhttp";
import ComicatParse from "../parse/ComicatParse";
import { PaginationType } from "../interface/anime/Pagination";
class ComicatManager {
    constructor() {
        this.pagination = new ComicatPagination();
    }
    go(page) {
        return this.request(this.pagination.go(page));
    }
    next() {
        return this.request(this.pagination.next());
    }
    refresh() {
        this.pagination.reset();
        return this.request(this.pagination.next());
    }
    search(keyword) {
        this.pagination.type = PaginationType.SEARCH;
        this.pagination.keyword = keyword;
        return this;
    }
    request(url) {
        return new Promise((resolve, reject) => {
            xhttp(url).then((response) => {
                if (response.ok) {
                    response.text().then((doc) => {
                        ComicatParse.parseToList(doc, (result) => {
                            resolve(result);
                        });
                    });
                }
                else {
                    reject(new Error(response.statusText));
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }
    getDetails(id) {
        return new Promise((resolve, reject) => {
            xhttp(`${this.pagination.protocol}//${this.pagination.host}/show-${id}.html`).then((response) => {
                if (response.ok) {
                    response.text().then((doc) => {
                        ComicatParse.parseDetails(doc, (anime) => {
                            resolve(anime);
                        });
                    });
                }
                else {
                    reject(new Error(response.statusText));
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }
    first() {
        return new Promise((resolve, reject) => {
            xhttp(this.pagination.first()).then((response) => {
                if (response.ok) {
                    response.text().then((doc) => {
                        ComicatParse.parseToList(doc, (result) => {
                            resolve(result);
                        });
                        ComicatParse.parseMaxPage(doc, (max) => {
                            this.pagination.max = max;
                        });
                    });
                }
                else {
                    reject(new Error(response.statusText));
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }
}
export default ComicatManager;
