import { registerUser } from "./auth/register";
import { signInUser } from "./auth/signin";

export const authApi = { registerUser, signInUser };

import {getAllBookmarksByUserId, createBookmark, deleteBookmark} from './bookmarks'
export const bookmarksApi = {getAllBookmarksByUserId, createBookmark, deleteBookmark};
