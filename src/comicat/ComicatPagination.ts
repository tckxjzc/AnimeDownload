import Pagination, {PaginationType} from "../interface/anime/Pagination";


class ComicatPagination implements Pagination {
    max: number;
    page: number = 1;
    url: string;
    host: string = 'm.comicat.org';
    protocol: string = 'http:';
    keyword: string;
    type: PaginationType = PaginationType.DEFAULT;


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