import { IArtist } from './artist.model';
import { IAlbum } from './album.model';


export interface IHttpSearchItemResponse {
    artists: IArtist[];
    albums: IAlbum[];
}
