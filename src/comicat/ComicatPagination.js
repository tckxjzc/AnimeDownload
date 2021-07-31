import { PaginationType } from "../interface/anime/Pagination";
import ComicatParse from "../parse/ComicatParse";
class ComicatPagination {
    constructor() {
        this.page = 1;
        this.host = 'm.kisssub.org';
        this.hosts = [
            'm.comicat.org',
            'm.kisssub.org',
        ];
        this.protocol = 'http:';
        this.type = PaginationType.DEFAULT;
    }
    switchHost() {
        this.host = this.host === this.hosts[0] ? this.hosts[1] : this.hosts[0];
        ComicatParse.switchHost(this.host, () => { });
    }
    first() {
        return this.go(1);
    }
    getUrl() {
        let url;
        if (this.type == PaginationType.DEFAULT) {
            url = `${this.protocol}//${this.host}/${this.page}.html`;
        }
        else {
            url = `${this.protocol}//${this.host}/search.php?keyword=${this.keyword}&page=${this.page}`;
        }
        return url;
    }
    go(page) {
        if (!this.max || page <= this.max) {
            this.page = page;
        }
        else {
            this.page = this.max;
        }
        return this.getUrl();
    }
    hasNext() {
        return !this.max || this.page < this.max;
    }
    last() {
        return this.go(this.max);
    }
    next() {
        this.page++;
        return this.getUrl();
    }
    reset() {
        this.page = 1;
    }
}
export default ComicatPagination;
