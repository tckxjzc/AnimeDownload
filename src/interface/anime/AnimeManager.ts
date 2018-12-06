import Anime from "../bean/Anime";
import Pagination from "./Pagination";

export type ListResult = Array<Anime>;

interface AnimeManager<T extends Pagination> {
    pagination: T;

    first(): Promise<ListResult>;

    next(): Promise<ListResult>;

    refresh(): Promise<ListResult>;

    go(page: number): Promise<ListResult>;

    search(keyword:string): AnimeManager<T>;

    getDetails(id: string): Promise<Anime>;
}

export default AnimeManager;