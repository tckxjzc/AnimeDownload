import {
    NativeModules
} from 'react-native';
import {ListResult} from "../interface/anime/AnimeManager";
import Anime from "../interface/bean/Anime";


interface ComicatParseInterface {
    parseToList(html: string, callback: (result: ListResult) => void);

    parseDetails(html: string, callback: (details: Anime) => void);

    parseMaxPage(html: string, callback: (page: number) => void);
}


let ComicatParse: ComicatParseInterface = NativeModules.Comicat;



export default ComicatParse;