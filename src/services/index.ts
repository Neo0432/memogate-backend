import { registerUser } from "./auth/register";
import { signInUser } from "./auth/signin";

export const authApi = { registerUser, signInUser };

import {
  getAllBookmarksByUserId,
  createBookmark,
  deleteBookmark,
  getBookmarksByBookmarkId,
  updateBookmark,
} from "./bookmarks";
export const bookmarksApi = {
  getAllBookmarksByUserId,
  getBookmarksByBookmarkId,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};

import { getAllTags, createTag } from "./tags";
export const tagsApi = { getAllTags, createTag };
