import AnimeManager, {ListResult} from "../interface/anime/AnimeManager";
import ComicatPagination from "./ComicatPagination";
import xhttp from "../tools/xhttp";
import ComicatParse from "../parse/ComicatParse";
import Anime from "../interface/bean/Anime";
import {PaginationType} from "../interface/anime/Pagination";


class ComicatManager implements AnimeManager<ComicatPagination> {
    pagination: ComicatPagination;

    constructor() {
        this.pagination = new ComicatPagination();
    }

    go(page: number): Promise<ListResult> {
        return this.request(this.pagination.go(page))
    }

    next(): Promise<ListResult> {
        return this.request(this.pagination.next());
    }

    refresh(): Promise<ListResult> {
        this.pagination.reset();
        return this.request(this.pagination.next());
    }

    search(keyword: string): AnimeManager<ComicatPagination> {
        this.pagination.type = PaginationType.SEARCH;
        this.pagination.keyword = keyword;
        return this;
    }

    request(url: string): Promise<ListResult> {
        return new Promise<ListResult>((resolve, reject) => {
            xhttp(url).then((response) => {
                if (response.ok) {
                    response.text().then((doc) => {
                        ComicatParse.parseToList(doc, (result) => {
                            resolve(result);
                        });
                    });
                } else {
                    reject(new Error(response.statusText));
                }
            });
        });
    }

    getDetails(id: string): Promise<Anime> {
        return new Promise<Anime>((resolve, reject) => {
            xhttp(`${this.pagination.protocol}//${this.pagination.host}/show-${id}.html`).then((response) => {
                if (response.ok) {
                    response.text().then((doc) => {
                        ComicatParse.parseDetails(doc, (anime) => {
                            resolve(anime);
                        });
                    });
                } else {
                    reject(new Error(response.statusText));
                }
            })
        });
    }

    first(): Promise<ListResult> {
        return new Promise<ListResult>((resolve, reject) => {
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
                } else {
                    reject(new Error(response.statusText));
                }
            });
        });
        ;
    }


}

export default ComicatManager;