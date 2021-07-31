import Pagination, {PaginationType} from "../interface/anime/Pagination";
import ComicatParse from "../parse/ComicatParse";

class ComicatPagination implements Pagination {
    max: number;
    page: number = 1;
    url: string;
    host: string = 'm.kisssub.org';
    hosts: string[] = [
        'm.comicat.org',
        'm.kisssub.org',
    ];
    protocol: string = 'http:';
    keyword: string;
    type: PaginationType = PaginationType.DEFAULT;


    switchHost(){
        this.host= this.host === this.hosts[0]? this.hosts[1]: this.hosts[0];
        ComicatParse.switchHost(this.host,()=>{});
    }
    first(): string {
        return this.go(1);
    }

    getUrl(): string {
        let url;
        if (this.type == PaginationType.DEFAULT) {
            url = `${this.protocol}//${this.host}/${this.page}.html`;
        } else {
            url = `${this.protocol}//${this.host}/search.php?keyword=${this.keyword}&page=${this.page}`;
        }
        return url;
    }

    go(page: number): string {
        if (!this.max || page <= this.max) {
            this.page = page;
        } else {
            this.page = this.max;
        }
        return this.getUrl();
    }

    hasNext(): boolean {
        return !this.max || this.page < this.max;
    }

    last(): string {
        return this.go(this.max);
    }

    next(): string {
        this.page++;
        return this.getUrl();
    }

    reset(): void {
        this.page = 1;
    }


}

export default ComicatPagination;
