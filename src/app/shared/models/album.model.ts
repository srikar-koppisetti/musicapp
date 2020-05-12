import { WrapperType } from './enum.model';

export interface IAlbum {
    wrapperType: WrapperType;
    collectionName: string;
    collectionId: string;
    artworkUrl100: string;
}
