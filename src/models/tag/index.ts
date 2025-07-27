export type ITag = {
  id: string;
  userId: string;
  name: string;
};

export interface IGetAllTagsResponseDto extends ITag {
  bookmarkIds: string[];
}

export interface IBookmarkRelatedTag {
  tagId: string;
  bookmarkId: string;
}

export interface ICreateTagDTO {
  name: string;
  bookmarkId: string;
}

export interface IFindTagsForBookmarkResultDTO {
  id: string;
  name: string;
}
