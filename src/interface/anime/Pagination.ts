export default interface Pagination {
    max: number;
    page: number;
    url: string;
    host: string;
    hosts: string[];
    protocol: string;
    keyword: string;

    switchHost(): void;
    next(): string;

    go(page: number): string;

    first(): string;

    last(): string;

    hasNext(): boolean;

    getUrl(): string;

    reset(): void;
}

export enum PaginationType {
    DEFAULT,
    SEARCH
}
