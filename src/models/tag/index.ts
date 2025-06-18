export type ITag = {
  id: string;
  userId: string;
  name: string;
};

export type IBookmarkRelatedTag = {
  tagId: string;
  bookmarkId: string;
};

export type ICreateTagDTO = {
  name: string;
  bookmarkId: string;
};

export type IFindTagsForBookmarkResultDTO = {
  id: string;
  name: string;
};
