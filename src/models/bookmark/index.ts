export type IBookmark = {
    createdAt: Date
    userId: string,
    id: string,
    url: string,
    title: string,
    description: string,
}

export interface IBookmarkDto {
    id: string;
    title: string;
    description: string;
}

export interface IBookmarkCreate {
    title: string;
    description: string;
    url: string;
    userId: string;
}

export interface IBookmarkUpdate extends IBookmarkDto {
    url: string;
}