import {
    NativeModules
} from 'react-native';
import {ListResult} from "../interface/anime/AnimeManager";
import Anime from "../interface/bean/Anime";


interface ComicatParseInterface {
    switchHost(host: string, callback: () => void);
    parseToList(html: string, callback: (result: ListResult) => void);

    parseDetails(html: string, callback: (details: Anime) => void);

    parseMaxPage(html: string, callback: (page: number) => void);

    request(options:any, callback: (result:any) => void);
}


let ComicatParse: ComicatParseInterface = NativeModules.Comicat;



export default ComicatParse;
