import { WrapperType } from './enum.model';

export interface IFavourite {
    wrapperType: WrapperType;
    favTitle: string;
    favId: string;
    favImage: string;
    isFavourite: boolean;
}
