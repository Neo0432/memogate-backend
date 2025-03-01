import { registerUser } from "./auth/register";
import { signInUser } from "./auth/signin";

export const authApi = { registerUser, signInUser };

import {getAllBookmarksByUserId} from './bookmarks'
export const bookmarksApi = {getAllBookmarksByUserId};
