import { WrapperType } from './enum.model';

export interface IArtist {
    wrapperType: WrapperType;
    artistName: string;
    artistId: string;
    artworkUrl100: string;
}
